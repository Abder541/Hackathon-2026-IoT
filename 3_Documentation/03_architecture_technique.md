# Architecture Technique
## Plateforme IoT de Supervision Industrielle — Hackathon 2026 · Équipe 01

---

## Vue d'ensemble

Plateforme complète de supervision d'infrastructure industrielle basée sur une architecture **Edge-Fog-Cloud**, déployée via Docker Compose en une seule commande.

### Composants

| Composant | Technologie | Rôle |
|---|---|---|
| Broker MQTT | Eclipse Mosquitto 2.0 | Transport des messages IoT |
| Orchestration | Node-RED 3.1 | Simulation, ingestion, automatisation, notifications |
| Base temporelle | InfluxDB 2.7 | Stockage des séries de capteurs (30 jours) |
| Visualisation | Grafana 10.2 | Dashboards temps réel + alerting natif |
| Déploiement | Docker Compose | Conteneurisation reproductible |

---

## Schéma Edge-Fog-Cloud

```
+==========================================================================+
|                         CLOUD (Supervision)                              |
|  +-----------------------------+  +----------------------------------+   |
|  |       GRAFANA :3000         |  |   Notifications                  |   |
|  |  - Dashboards temps réel    |  |  - Telegram (@Abder_rms2_bot)   |   |
|  |  - Gauges & seuils          |  |  - Email (Gmail SMTP)            |   |
|  |  - Alerting natif           |  |  - Latence < 2 secondes          |   |
|  +-----------------------------+  +----------------------------------+   |
+==========================================================================+
                  | Flux queries
+==========================================================================+
|                        FOG (Plateforme Centrale)                         |
|  +------------------+  +-------------------+  +----------------------+  |
|  | MOSQUITTO :1883  |  |  NODE-RED :1880   |  |  INFLUXDB :8086      |  |
|  | Broker MQTT      |  |  Orchestration    |  |  Base temporelle     |  |
|  | + TLS :8883      |<>|  Onglet 1: Sim.   |->|  Bucket: sensors     |  |
|  | + Auth           |  |  Onglet 2: Ingest.|  |  Rétention: 30j      |  |
|  | + ACL            |  |  Onglet 3: Auto.  |  |  Org: hackathon-iot  |  |
|  |                  |  |  Onglet 4: Notif. |  |                      |  |
|  +------------------+  +-------------------+  +----------------------+  |
+==========================================================================+
              | MQTT QoS 1
+==========================================================================+
|                        EDGE (Zones Supervisées)                          |
|  +--------------------+  +--------------------+  +-------------------+  |
|  | SALLE SERVEUR      |  | ATELIER TECHNIQUE  |  | LOCAL ÉLECTRIQUE  |  |
|  | - Température      |  | - Vibration        |  | - Luminosité      |  |
|  | - Humidité         |  | - Température      |  | - Température     |  |
|  | Fréquence : 5s     |  | Fréquence : 2s     |  | Fréquence : 10s   |  |
|  | Seuils: T>28C H>70%|  | Seuils: V>5mm T>40C|  | Seuils: L<50 T>35C|  |
|  +--------------------+  +--------------------+  +-------------------+  |
+==========================================================================+
```

---

## Flux de données

```
Capteurs simulés (Node-RED Onglet 1)
        |
        | JSON: {zone, timestamp, capteurs: {type: valeur}}
        v
   MQTT Broker Mosquitto
   Topics: iot/{zone}/data
        |
        +---------> Node-RED Onglet 2 (Ingestion)
        |                   |
        |                   | Format [fields, tags]
        |                   v
        |              InfluxDB (bucket: sensors)
        |                   |
        |                   | Requêtes Flux
        |                   v
        |              Grafana (dashboards temps réel)
        |
        +---------> Node-RED Onglet 3 (Automatisation)
        |                   |
        |                   | Switch: vérification seuils
        |                   v
        |              Alertes MQTT → topics: alertes/{zone}/{type}
        |              Actions MQTT → topics: actions/{actionneur}
        |
        +---------> Node-RED Onglet 4 (Notifications)
                        |
                        | Anti-spam (cooldown 5min Telegram / 10min Email)
                        v
                   Telegram + Email automatiques
```

---

## Topics MQTT

### Topics de données

| Topic | Direction | QoS | Description |
|---|---|---|---|
| `iot/salle-serveur/data` | Pub | 1 | Données capteurs salle serveur |
| `iot/atelier/data` | Pub | 1 | Données capteurs atelier |
| `iot/local-electrique/data` | Pub | 1 | Données capteurs local élec. |
| `iot/+/data` | Sub | 1 | Wildcard toutes zones |

### Topics d'alertes (QoS 2)

| Topic | Condition déclenchante |
|---|---|
| `alertes/salle-serveur/temperature` | T > 28°C |
| `alertes/salle-serveur/humidite` | H > 70% |
| `alertes/atelier/vibration` | V > 5.0 mm/s |
| `alertes/atelier/temperature` | T > 40°C |
| `alertes/local-electrique/luminosite` | L < 50 lux |
| `alertes/local-electrique/temperature` | T > 35°C |

### Topics d'actions (QoS 1)

| Topic | Action déclenchée |
|---|---|
| `actions/ventilation` | Activation ventilation salle serveur |
| `actions/deshumidificateur` | Activation déshumidificateur |
| `actions/arret-machine` | Arrêt machine atelier |
| `actions/eclairage` | Activation éclairage local élec. |

### Format JSON des messages

**Message capteur :**
```json
{
    "zone": "salle-serveur",
    "timestamp": "2026-03-20T10:30:00.000Z",
    "capteurs": {
        "temperature": 26.45,
        "humidite": 48.32
    }
}
```

**Message alerte :**
```json
{
    "type": "ALERTE_TEMPERATURE",
    "zone": "salle-serveur",
    "niveau": "WARNING",
    "message": "Température salle serveur élevée : 29.5°C (seuil: 28°C)",
    "valeur": 29.5,
    "seuil": 28,
    "timestamp": "2026-03-20T10:30:05.000Z"
}
```

---

## Simulation des capteurs

### Paramètres par zone

| Zone | Capteurs | Fréquence | Valeur de base | Dérive max |
|---|---|---|---|---|
| Salle Serveur | Température, Humidité | 5s | T:24°C H:45% | +8 unités |
| Atelier Technique | Vibration, Température | 2s | V:2.5mm/s T:35°C | +5 unités |
| Local Électrique | Luminosité, Température | 10s | L:200lux T:30°C | +6 unités |

### Comportements simulés

- **Bruit aléatoire** : variation naturelle sur chaque mesure
- **Dérive progressive** : simulation de dégradation d'équipements (température qui monte progressivement)
- **Spikes aléatoires** : 5% de chance de vibration extrême en atelier (défaut mécanique)
- **Coupures intermittentes** : 3% de chance de luminosité quasi-nulle (ampoule défaillante)
- **Corrélation** : la température de l'atelier augmente quand les vibrations sont excessives

---

## Règles d'automatisation

| # | Zone | Condition | Action | Niveaux |
|---|---|---|---|---|
| 1 | Salle Serveur | T > 28°C | Activation ventilation | WARNING >28 / CRITIQUE >32 |
| 2 | Salle Serveur | H > 70% | Activation déshumidificateur | WARNING >70 / CRITIQUE >85 |
| 3 | Atelier | V > 5.0 mm/s | Arrêt machine | WARNING >5 / CRITIQUE >7 |
| 4 | Atelier | T > 40°C | Alerte surchauffe | WARNING >40 / CRITIQUE >45 |
| 5 | Local Élec. | L < 50 lux | Activation éclairage | WARNING <50 / CRITIQUE <20 |
| 6 | Local Élec. | T > 35°C | Alerte surchauffe armoire | WARNING >35 / CRITIQUE >40 |

Logique de chaque règle :
```
MQTT In → Switch (seuil) → Function (format alerte) → MQTT Out (alertes/)
                                                    → MQTT Out (actions/)
```

---

## Schéma de la base de données InfluxDB

```
Measurement : capteurs_industriels
Tags        : zone (salle-serveur | atelier | local-electrique)
Fields      : temperature, humidite, vibration, luminosite (Float64)
Timestamp   : précision nanoseconde
Rétention   : 30 jours
```

---

## Dashboard Grafana — Structure

Le dashboard **"IoT Supervision Industrielle"** comprend :

| Section | Contenu |
|---|---|
| Ligne 1 — Vue globale | 6 panneaux stat (une valeur = une couleur) |
| Ligne 2 — Time Series | 6 graphes historiques (2 par zone) |
| Ligne 3 — Jauges | 4 jauges visuelles pour les métriques critiques |

Provisioning automatique au démarrage :
- `grafana/provisioning/datasources/influxdb.yml` — datasource InfluxDB
- `grafana/provisioning/dashboards/dashboard.yml` — chargement dashboards
- `grafana/provisioning/alerting/contact-points.yml` — Telegram + Email
- `grafana/provisioning/alerting/notification-policies.yml` — politiques d'alerte
- `grafana/dashboards/iot-supervision.json` — définition complète du dashboard

---

## Sécurité

### TLS sur MQTT (port 8883)

- Protocole : TLS 1.2
- Certificats auto-signés (CA + serveur + client)
- SAN : mosquitto, localhost, iot-mosquitto, 127.0.0.1
- Génération : `bash certs/generate-certs.sh`

### Authentification MQTT

- Anonymous : désactivé (`allow_anonymous false`)
- Méthode : fichier de mots de passe hashés (`password_file`)

### Contrôle d'accès ACL

```
user iotuser
topic readwrite iot/#
topic readwrite alertes/#
topic readwrite actions/#
topic read $SYS/#
```

### Isolation réseau

- Réseau Docker bridge dédié : `iot-supervision-network`
- Communication inter-services uniquement en interne
- Seuls les ports nécessaires sont exposés

### Secrets

Tous les secrets dans `.env` (jamais commité) :
`INFLUXDB_TOKEN`, `MOSQUITTO_PASSWORD`, `GRAFANA_ADMIN_PASSWORD`, `TELEGRAM_BOT_TOKEN`, `NODE_RED_CREDENTIAL_SECRET`

---

## Arborescence du projet

```
EQUIPE_01_HACKATHON_2026/
├── 1_Architecture/
│   └── architecture.md
├── 2_Code/
│   ├── docker-compose.yml        # Orchestration des 4 services
│   ├── .env                      # Variables d'environnement (secrets)
│   ├── mosquitto/
│   │   └── config/
│   │       ├── mosquitto.conf    # Configuration broker MQTT
│   │       └── acl.conf          # Règles de contrôle d'accès
│   ├── nodered/
│   │   └── data/
│   │       ├── flows.json        # Flows Node-RED (4 onglets)
│   │       ├── flows_cred.json   # Credentials Node-RED
│   │       └── package.json      # Dépendances npm
│   ├── grafana/
│   │   ├── provisioning/         # Auto-provisioning Grafana
│   │   └── dashboards/           # Dashboard JSON pré-configuré
│   ├── certs/
│   │   └── generate-certs.sh     # Génération certificats TLS
│   └── scripts/
│       ├── init.sh               # Script d'initialisation complet
│       └── setup-notifications.sh# Configuration Telegram + Email
├── 3_Documentation/
│   ├── 01_installation.md
│   ├── 02_utilisation.md
│   ├── 03_architecture_technique.md
│   └── 04_presentation_simplifiee.md
├── 4_Rapport/
│   └── rapport_mission.md
└── 5_Presentation/
    ├── Hackathon_IoT_2026_Presentation.pptx
    └── architecture_3d.html
```

---

## Équipe — Rôles et responsabilités

| Rôle | Responsabilités |
|---|---|
| Chef de projet / Architecte | Coordination, conception, documentation |
| Ingénieur IoT / Capteurs | Simulation capteurs, Node-RED Edge |
| Ingénieur Réseau / Communication | Broker MQTT, TLS, authentification |
| Ingénieur Données / Stockage | InfluxDB, requêtes Flux, rétention |
| Ingénieur Visualisation / Auto. | Dashboards Grafana, règles, alertes |

---

*Hackathon IoT 2026 — Équipe 01 — Satom IT Learning Solutions*
