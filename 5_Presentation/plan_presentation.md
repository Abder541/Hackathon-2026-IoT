# Support de Presentation - Soutenance Hackathon IoT 2026

## Equipe 01 - Plateforme IoT Supervision Industrielle

**Format : 15 minutes** (8 min presentation + 5 min demo + 2 min questions)

---

## SLIDE 1 - Page de titre

**Supervision IoT Industrielle**
Plateforme de monitoring temps reel
Hackathon IoT 2026 - Equipe 01
Satom IT & Learning Solutions

---

## SLIDE 2 - Contexte et problematique

- Client : Entreprise industrielle de taille moyenne
- Probleme : Aucune supervision temps reel
- Consequence : Incidents detectes tardivement, couts eleves
- Mission : Concevoir une plateforme IoT de supervision complete

---

## SLIDE 3 - Perimetre de la solution

3 zones critiques supervisees :
- Salle Serveur (temperature, humidite)
- Atelier Technique (vibration, temperature)
- Local Electrique (luminosite, temperature)

6 capteurs | 6 regles d'alerte | Dashboard temps reel

---

## SLIDE 4 - Architecture technique

Schema Edge-Fog-Cloud :
- EDGE : Capteurs simules (Node-RED)
- FOG : Mosquitto (MQTT) + Node-RED (regles) + InfluxDB (stockage)
- CLOUD : Grafana (dashboards)

Tout conteneurise avec Docker Compose

---

## SLIDE 5 - Choix techniques justifies

| Besoin           | Solution choisie | Raison                              |
|------------------|------------------|-------------------------------------|
| Transport        | MQTT/Mosquitto   | Leger, pub/sub, QoS, TLS natif     |
| Orchestration    | Node-RED         | Low-code, rapide, ecosystem riche   |
| Stockage         | InfluxDB 2.7     | Optimise series temporelles, Flux   |
| Visualisation    | Grafana 10.2     | Reference dashboards, temps reel    |
| Deploiement      | Docker Compose   | Reproductible, un seul fichier      |

---

## SLIDE 6 - Flux de donnees

Capteurs -> MQTT (iot/{zone}/data) -> Node-RED -> InfluxDB -> Grafana
                                         |
                                    Regles d'alerte
                                         |
                                    Actions automatiques

---

## SLIDE 7 - Automatisation (6 regles)

1. Temp SS > 28°C -> Ventilation
2. Humidite SS > 70% -> Deshumidificateur
3. Vibration AT > 5mm/s -> Arret machine
4. Temp AT > 40°C -> Alerte surchauffe
5. Luminosite LE < 50 lux -> Eclairage
6. Temp LE > 35°C -> Alerte armoire

Chaque regle a 2 niveaux : WARNING / CRITIQUE

---

## SLIDE 8 - Securite

- TLS 1.2 sur le broker MQTT (port 8883)
- Authentification obligatoire (pas d'anonymous)
- ACL par topic et par utilisateur
- Secrets externalises (.env, non commite)
- Reseau Docker isole
- Certificats X.509 (CA + serveur + client)

---

## SLIDE 9 - [DEBUT DEMO LIVE]

Demonstration du systeme fonctionnel :
1. Docker Compose up -> tous les services demarrent
2. Node-RED : flows actifs, capteurs simulant
3. Grafana : dashboard temps reel avec donnees
4. Observer la derive progressive des capteurs
5. Observer le declenchement des alertes
6. Verifier les actions automatiques dans le debug Node-RED

---

## SLIDE 10 - Difficultes et solutions

| Defi                           | Solution                          |
|--------------------------------|-----------------------------------|
| Credentials cross-services     | flows_cred.json + .env            |
| Donnees realistes              | Derive progressive + spikes       |
| Provisioning auto Grafana      | YAML + variables d'environnement  |
| Synchronisation services       | depends_on Docker Compose         |

---

## SLIDE 11 - Evolutions possibles

- Capteurs reels (ESP32 + DHT22)
- Detection d'anomalies par IA / ML
- Notifications email / Telegram
- Haute disponibilite
- Migration cloud (AWS IoT / Azure IoT)

---

## SLIDE 12 - Conclusion

- Tous les objectifs du cahier des charges atteints
- 3 zones, 6 capteurs, 6 regles d'alerte
- Dashboard professionnel temps reel
- Securite implementee (TLS + Auth + ACL)
- Deploiement en une commande
- Documentation complete exploitable

**Merci - Questions ?**

---

## Notes pour l'oral

- Parler clairement et professionnellement
- Chaque membre presente sa partie
- Avoir le systeme demarre avant la demo
- Preparer un scenario de demo (montrer une alerte se declencher)
- Anticiper les questions : "Pourquoi pas Kafka ?", "Comment scaler ?", "Capteurs reels ?"
