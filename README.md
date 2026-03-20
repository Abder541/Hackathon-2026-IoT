# 🏭 Hackathon IoT 2026 — Équipe 01
### Supervision IoT Industrielle — Satom IT & Learning Solutions

---

## 📋 Présentation du projet

Plateforme IoT complète de supervision d'infrastructure industrielle déployée dans le cadre du **Hackathon IoT 2026**. Solution de monitoring en temps réel couvrant 3 zones industrielles avec collecte de données, visualisation, alertes automatiques et sécurisation.

---

## 🏗️ Architecture

```
[Capteurs Simulés] → [Broker MQTT] → [Node-RED] → [InfluxDB] → [Grafana]
     (Edge)            (Mosquitto)     (Traitement)   (Stockage)  (Visualisation)
```

**3 zones supervisées :**
| Zone | Capteurs | Fréquence |
|------|----------|-----------|
| Salle Serveur | Température + Humidité | 5s |
| Atelier Technique | Vibration + Température | 2s |
| Local Électrique | Luminosité + Température | 10s |

---

## 🚀 Démarrage rapide

### Prérequis
- Docker Desktop 24.0+
- Docker Compose 2.20+
- Bash / Git Bash (Windows)

### Lancement en 3 étapes

```bash
# 1. Cloner le repo
git clone https://github.com/Abder541/Hackathon-2026-IoT.git
cd Hackathon-2026-IoT

# 2. Lancer l'initialisation (génère les certs TLS + démarre tout)
cd 2_Code
bash ../2_Code/scripts/init.sh

# 3. Ou démarrage manuel
cd 2_Code
docker compose up -d
```

### Accès aux interfaces

| Interface | URL | Identifiants |
|-----------|-----|--------------|
| **Node-RED** | http://localhost:1880 | — |
| **Grafana** | http://localhost:3000 | admin / Grafana2026Secure |
| **InfluxDB** | http://localhost:8086 | admin / InfluxSecure2026 |

---

## 📁 Structure du projet

```
EQUIPE_01_HACKATHON_2026/
├── 1_Architecture/           # Schéma d'architecture technique
├── 2_Code/                   # Code source complet
│   ├── docker-compose.yml    # Orchestration des 4 services
│   ├── .env                  # Variables d'environnement
│   ├── mosquitto/            # Broker MQTT (config + TLS + ACL)
│   ├── nodered/              # Flows Node-RED (simulation + ingestion + alertes)
│   ├── grafana/              # Dashboards + provisioning
│   ├── certs/                # Certificats TLS auto-signés
│   └── scripts/              # Scripts d'initialisation et de test
├── 3_Documentation/          # Documentation technique complète
│   ├── README.md             # Guide de démarrage rapide
│   ├── guide_installation.md # Installation détaillée
│   ├── guide_utilisation.md  # Guide utilisateur
│   └── hackmd_documentation.md # Documentation HackMD complète
├── 4_Rapport/                # Rapport de mission
├── 5_Presentation/           # Support de présentation PowerPoint
└── 6_Video/                  # Lien vidéo de démonstration
```

---

## ⚙️ Stack Technique

| Composant | Technologie | Version | Rôle |
|-----------|-------------|---------|------|
| Broker MQTT | **Mosquitto** | 2.0 | Transport des messages IoT |
| Orchestration | **Node-RED** | 3.1 | Simulation, traitement, alertes |
| Base de données | **InfluxDB** | 2.7 | Stockage séries temporelles |
| Visualisation | **Grafana** | 10.2 | Dashboards temps réel |
| Déploiement | **Docker Compose** | 3.8 | Conteneurisation reproductible |

---

## 🔒 Sécurité

- **TLS 1.2** sur le broker MQTT (port 8883)
- **Authentification** sur tous les services
- **ACL** Mosquitto pour contrôle d'accès aux topics
- **Réseau Docker isolé** (`iot-supervision-network`)
- **Secrets via `.env`** — aucun mot de passe en dur dans le code

---

## 📊 Automatisation — 6 règles actives

| Règle | Condition WARNING | Condition CRITIQUE |
|-------|-------------------|-------------------|
| Temp. Salle Serveur | > 28°C | > 32°C |
| Humidité Salle Serveur | > 70% | > 80% |
| Vibration Atelier | > 5.0 mm/s | > 7.0 mm/s |
| Temp. Atelier | > 40°C | > 45°C |
| Luminosité Local Élec. | < 50 lux | — |
| Temp. Local Élec. | > 35°C | > 40°C |

---

## 👥 Équipe 01

Projet réalisé dans le cadre du **Hackathon IoT 2026** organisé par **Satom IT & Learning Solutions**.

---

*Documentation complète disponible dans le dossier [3_Documentation/](3_Documentation/)*
