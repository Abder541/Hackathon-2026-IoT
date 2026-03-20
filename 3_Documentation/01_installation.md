# Guide d'Installation
## Plateforme IoT de Supervision Industrielle — Hackathon 2026 · Équipe 01

---

## Prérequis

### Logiciels requis

| Logiciel | Version minimum | Vérification |
|---|---|---|
| Docker Desktop | 24.0+ | `docker --version` |
| Docker Compose | 2.20+ | `docker compose version` |
| Git Bash | — | Inclus avec Git for Windows |

### Ressources matérielles recommandées

- RAM : 4 Go minimum (8 Go recommandé)
- Disque : 2 Go d'espace libre
- CPU : 2 cœurs minimum
- Réseau : accès internet pour le téléchargement des images Docker

### Ports utilisés

| Port | Service | Protocole |
|---|---|---|
| 1880 | Node-RED | HTTP |
| 1883 | Mosquitto | MQTT |
| 8883 | Mosquitto | MQTT + TLS |
| 9001 | Mosquitto | WebSocket |
| 8086 | InfluxDB | HTTP |
| 3000 | Grafana | HTTP |

> Vérifier qu'aucun autre service n'utilise ces ports avant l'installation.

---

## Installation

### Étape 1 — Ouvrir Docker Desktop

Lancer **Docker Desktop** et attendre que l'icône en bas à gauche soit **verte** (Running).

### Étape 2 — Ouvrir Git Bash

Clic droit sur le bureau → **Git Bash Here**
ou chercher "Git Bash" dans le menu Démarrer.

### Étape 3 — Se placer dans le dossier du projet

```bash
cd "/c/Users/Maintenant pret/Hackathon IOT 2026/EQUIPE_01_HACKATHON_2026/2_Code"
```

### Étape 4 — Lancer tous les services

```bash
docker compose up -d
```

> Attendre environ 30 secondes la première fois (téléchargement des images).

### Étape 5 — Vérifier que tout est démarré

```bash
docker ps
```

Résultat attendu — 4 conteneurs avec le statut `Up` :

| Nom | Statut attendu |
|---|---|
| `iot-mosquitto` | `Up` |
| `iot-influxdb` | `Up` |
| `iot-nodered` | `Up` |
| `iot-grafana` | `Up` |

---

## Vérification post-installation

### Node-RED — http://localhost:1880

1. Ouvrir le navigateur sur **http://localhost:1880**
2. Vérifier la présence de **4 onglets** :
   - `1. Simulation Capteurs`
   - `2. Ingestion InfluxDB`
   - `3. Automatisation & Alertes`
   - `4. Notifications`
3. Sous chaque nœud, un statut vert doit afficher les valeurs en direct

### Grafana — http://localhost:3000

1. Se connecter : `admin` / `Grafana2026Secure`
2. Menu gauche → **Dashboards** → **IoT Supervision Industrielle**
3. Les données doivent apparaître après quelques secondes
4. Le dashboard se rafraîchit automatiquement toutes les **5 secondes**

### InfluxDB — http://localhost:8086

1. Se connecter : `admin` / `Hackathon2026Secure`
2. Menu gauche → **Data Explorer**
3. Coller la requête ci-dessous et cliquer sur **Run** :

```flux
from(bucket: "sensors")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> last()
```

Des lignes de données doivent s'afficher.

---

## Dépannage

### Un conteneur ne démarre pas

```bash
cd "/c/Users/Maintenant pret/Hackathon IOT 2026/EQUIPE_01_HACKATHON_2026/2_Code"
docker compose down
docker compose up -d
```

### Grafana affiche "No data"

```bash
docker compose restart grafana
```

Attendre 10 secondes puis rafraîchir la page.

### Node-RED ne montre pas de valeurs

```bash
docker compose restart nodered
```

Attendre 15 secondes et recharger **http://localhost:1880**.

### Node-RED ne se connecte pas au MQTT

1. Vérifier que le fichier `mosquitto/config/passwd` existe
2. Vérifier les logs : `docker logs iot-mosquitto`
3. Vérifier les credentials dans `nodered/data/flows_cred.json`

### Port déjà utilisé

```bash
docker compose down
docker compose up -d
```

### Erreur de certificats TLS

```bash
rm -f certs/*.crt certs/*.key certs/*.srl
bash certs/generate-certs.sh
docker compose restart mosquitto
```

### Réinitialisation complète (dernier recours)

```bash
cd "/c/Users/Maintenant pret/Hackathon IOT 2026/EQUIPE_01_HACKATHON_2026/2_Code"
docker compose down -v    # supprime les conteneurs ET les volumes
docker compose up -d      # repart de zéro
```

> **Attention :** cette commande supprime toutes les données InfluxDB et Grafana.

---

## Commandes de gestion courantes

```bash
# Démarrer tous les services
docker compose up -d

# Arrêter (données conservées)
docker compose down

# Redémarrer un service spécifique
docker compose restart nodered
docker compose restart grafana

# Voir les logs en temps réel
docker logs iot-nodered -f
docker logs iot-grafana -f

# Voir l'état de tous les conteneurs
docker ps

# Voir la consommation de ressources
docker stats
```

---

*Hackathon IoT 2026 — Équipe 01 — Satom IT Learning Solutions*
