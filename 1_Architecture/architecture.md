# Architecture Technique - Plateforme IoT Supervision Industrielle

## Hackathon IoT 2026 - Equipe 01

---

## 1. Vue d'ensemble - Modele Edge-Fog-Cloud

```
+=========================================================================+
|                        CLOUD (Supervision)                               |
|  +---------------------------+  +-----------------------------+          |
|  |      GRAFANA :3000        |  |   Systeme d'Alertes         |          |
|  |  - Dashboards temps reel  |  |  - Alertes MQTT             |          |
|  |  - Gauges & seuils        |  |  - Niveaux WARNING/CRITIQUE |          |
|  |  - Historique tendances   |  |  - Actions automatiques     |          |
|  +-------------|-------------+  +-----------------------------+          |
|                |                                                         |
+=========================================================================+
                 |  Flux queries
+=========================================================================+
|                        FOG (Plateforme Centrale)                         |
|  +------------------+  +------------------+  +-------------------+       |
|  | MOSQUITTO :1883  |  |  NODE-RED :1880  |  |  INFLUXDB :8086   |      |
|  | Broker MQTT      |  |  Orchestration   |  |  Base temporelle  |      |
|  | + TLS :8883      |<>|  Regles auto     |->|  Bucket: sensors  |      |
|  | + Auth           |  |  Formatage data  |  |  Retention: 30j   |      |
|  | + ACL            |  |  6 regles alerte |  |  Org: hackathon   |      |
|  +--------|---------+  +------------------+  +-------------------+       |
|            |                                                             |
+=========================================================================+
             | MQTT QoS 1
+=========================================================================+
|                        EDGE (Zones Supervisees)                          |
|  +------------------+  +------------------+  +-------------------+       |
|  | SALLE SERVEUR    |  | ATELIER TECHNI.  |  | LOCAL ELECTRIQUE  |      |
|  | - Temperature    |  | - Vibration      |  | - Luminosite      |      |
|  | - Humidite       |  | - Temperature    |  | - Temperature     |      |
|  | Freq: 5s         |  | Freq: 2s         |  | Freq: 10s         |      |
|  | Seuils:          |  | Seuils:          |  | Seuils:           |      |
|  |  T>28°C, H>70%   |  |  V>5mm/s, T>40°C |  |  L<50lux, T>35°C  |     |
|  +------------------+  +------------------+  +-------------------+       |
+=========================================================================+
```

## 2. Flux de donnees

```
Capteurs simulés (Node-RED)
        |
        | JSON: {zone, timestamp, capteurs: {type: valeur}}
        v
   MQTT Broker (Mosquitto)
   Topics: iot/{zone}/data
        |
        +--------> Node-RED (Ingestion)
        |               |
        |               | Formatage InfluxDB Line Protocol
        |               v
        |          InfluxDB (bucket: sensors)
        |               |
        |               | Flux queries
        |               v
        |          Grafana (dashboards temps reel)
        |
        +--------> Node-RED (Automatisation)
                        |
                        | Switch: verification seuils
                        v
                   Alertes MQTT (topics: alertes/{zone}/{type})
                   Actions MQTT (topics: actions/{actionneur})
```

## 3. Topics MQTT

| Topic                            | Direction | QoS | Description                      |
|----------------------------------|-----------|-----|----------------------------------|
| `iot/salle-serveur/data`         | Pub       | 1   | Donnees capteurs salle serveur   |
| `iot/atelier/data`               | Pub       | 1   | Donnees capteurs atelier         |
| `iot/local-electrique/data`      | Pub       | 1   | Donnees capteurs local elec.     |
| `iot/+/data`                     | Sub       | 1   | Wildcard toutes zones            |
| `alertes/salle-serveur/temperature` | Pub    | 2   | Alerte temperature SS            |
| `alertes/salle-serveur/humidite` | Pub       | 2   | Alerte humidite SS               |
| `alertes/atelier/vibration`      | Pub       | 2   | Alerte vibration atelier         |
| `alertes/atelier/temperature`    | Pub       | 2   | Alerte surchauffe atelier        |
| `alertes/local-electrique/luminosite` | Pub  | 2   | Alerte luminosite insuffisante   |
| `alertes/local-electrique/temperature` | Pub | 2   | Alerte temperature local elec.   |
| `actions/ventilation`            | Pub       | 1   | Commande ventilation             |
| `actions/deshumidificateur`      | Pub       | 1   | Commande deshumidificateur       |
| `actions/arret-machine`          | Pub       | 1   | Commande arret machine urgence   |
| `actions/eclairage`              | Pub       | 1   | Commande eclairage automatique   |

## 4. Regles d'automatisation

| # | Zone             | Condition             | Action                          | Niveaux           |
|---|------------------|-----------------------|---------------------------------|-------------------|
| 1 | Salle Serveur    | Temperature > 28°C    | Activation ventilation          | WARNING / CRITIQUE (>32°C) |
| 2 | Salle Serveur    | Humidite > 70%        | Activation deshumidificateur    | WARNING / CRITIQUE (>85%) |
| 3 | Atelier          | Vibration > 5.0 mm/s  | Arret machine (progressif/immediat) | WARNING / CRITIQUE (>7mm/s) |
| 4 | Atelier          | Temperature > 40°C    | Alerte surchauffe               | WARNING / CRITIQUE (>45°C) |
| 5 | Local Electrique | Luminosite < 50 lux   | Activation eclairage            | WARNING / CRITIQUE (<20 lux) |
| 6 | Local Electrique | Temperature > 35°C    | Alerte surchauffe armoire       | WARNING / CRITIQUE (>40°C) |

## 5. Stack Technologique

| Composant      | Technologie       | Version | Port  | Role                          |
|----------------|-------------------|---------|-------|-------------------------------|
| Broker MQTT    | Eclipse Mosquitto  | 2.0     | 1883/8883 | Transport messages IoT    |
| Orchestration  | Node-RED          | 3.1     | 1880  | Simulation, regles, ingestion |
| Base donnees   | InfluxDB          | 2.7     | 8086  | Stockage series temporelles   |
| Visualisation  | Grafana           | 10.2    | 3000  | Dashboards supervision        |
| Conteneurs     | Docker Compose    | 3.8     | -     | Deploiement reproductible     |

## 6. Securite

- **TLS 1.2** : Chiffrement des communications MQTT (port 8883)
- **Authentification** : Login/password obligatoire sur tous les listeners Mosquitto
- **ACL** : Controle d'acces par topic MQTT
- **Secrets** : Variables d'environnement via fichier .env (non commite)
- **Reseau isole** : Bridge Docker dedie (iot-supervision-network)
- **Certificats** : CA auto-signe + certificat serveur avec SAN
