# Guide d'Utilisation
## Plateforme IoT de Supervision Industrielle — Hackathon 2026 · Équipe 01

---

## Accès aux interfaces

| Interface | URL | Login | Mot de passe |
|---|---|---|---|
| **Grafana** (dashboards) | http://localhost:3000 | `admin` | `Grafana2026Secure` |
| **Node-RED** (flows) | http://localhost:1880 | _(aucun)_ | _(aucun)_ |
| **InfluxDB** (données) | http://localhost:8086 | `admin` | `Hackathon2026Secure` |
| MQTT Broker | localhost:1883 | `iotuser` | `MqttSecure2026` |
| MQTT TLS | localhost:8883 | `iotuser` | `MqttSecure2026` |

> **Grafana** est l'interface principale à montrer pendant la démo.

---

## Grafana — Tableau de bord temps réel

### Connexion

1. Ouvrir **http://localhost:3000**
2. Login : `admin` / `Grafana2026Secure`
3. Menu gauche → **Dashboards** → **IoT Supervision Industrielle**

### Comprendre le dashboard

| Élément | Description |
|---|---|
| **6 panneaux stat** (haut) | Dernière valeur de chaque capteur — observer les couleurs |
| **Graphes Time Series** | Historique sur 30 minutes — cliquer-glisser pour zoomer |
| **Jauges** (bas) | Niveau visuel avec zones danger |
| **Rafraîchissement** | Automatique toutes les 5s |

### Signification des couleurs

| Couleur | Signification |
|---|---|
| **Vert** | Valeur normale, dans les seuils |
| **Jaune** | Approche du seuil — attention |
| **Rouge** | Seuil dépassé — alerte active |

### Seuils d'alerte par zone

| Zone | Capteur | Seuil WARNING | Seuil CRITIQUE |
|---|---|---|---|
| Salle Serveur | Température | > 28°C | > 32°C |
| Salle Serveur | Humidité | > 70% | > 85% |
| Atelier Technique | Vibration | > 5.0 mm/s | > 7.0 mm/s |
| Atelier Technique | Température | > 40°C | > 45°C |
| Local Électrique | Luminosité | < 50 lux | < 20 lux |
| Local Électrique | Température | > 35°C | > 40°C |

### Interactions utiles

- **Zoom sur un graphe** : cliquer-glisser sur la zone → revenir avec **Reset zoom**
- **Changer la plage de temps** : sélecteur en haut à droite (ex: Last 30 minutes)
- **Tooltip** : survoler un point pour voir la valeur exacte

---

## Node-RED — Flows et automatisation

Accès : **http://localhost:1880** *(pas de connexion requise)*

### Les 4 onglets

#### Onglet 1 — Simulation Capteurs
- Génère des données en continu pour les 3 zones (toutes les 2s/5s/10s)
- Le texte sous chaque nœud = dernière valeur envoyée
- La dérive progressive simule l'usure des équipements → les seuils seront dépassés au bout d'un moment

#### Onglet 2 — Ingestion InfluxDB
- Reçoit les données MQTT et les stocke dans InfluxDB
- Le nœud "→ InfluxDB" doit afficher **"Connecté"** en vert

#### Onglet 3 — Automatisation & Alertes

6 règles de surveillance des seuils :

| Règle | Zone | Condition | Action déclenchée |
|---|---|---|---|
| 1 | Salle Serveur | Temp > 28°C | Activation ventilation |
| 2 | Salle Serveur | Humidité > 70% | Activation déshumidificateur |
| 3 | Atelier | Vibration > 5mm/s | Arrêt machine |
| 4 | Atelier | Temp > 40°C | Alerte surchauffe |
| 5 | Local Électrique | Luminosité < 50 lux | Activation éclairage |
| 6 | Local Électrique | Temp > 35°C | Alerte armoire |

**Voir les alertes en direct :** cliquer sur l'icône **Debug** (insecte) en haut à droite → les messages apparaissent en temps réel (rouge = CRITIQUE, orange = WARNING).

#### Onglet 4 — Notifications

Pipeline : MQTT → Telegram + Email

| Statut du nœud | Signification |
|---|---|
| Gris | Non configuré |
| Jaune | Cooldown actif (anti-spam 5 min) |
| Bleu | Message envoyé |

---

## InfluxDB — Exploration des données

Accès : **http://localhost:8086** · Login : `admin` / `Hackathon2026Secure`

### Explorer les données

1. Menu gauche → **Data Explorer**
2. Coller une requête Flux dans l'éditeur
3. Cliquer sur **▶ Run**

### Requêtes utiles

**Dernières valeurs de tous les capteurs :**
```flux
from(bucket: "sensors")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> last()
```

**Historique des températures sur 1 heure :**
```flux
from(bucket: "sensors")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> filter(fn: (r) => r._field == "temperature")
  |> aggregateWindow(every: 5m, fn: mean)
```

**Vibrations de l'atelier :**
```flux
from(bucket: "sensors")
  |> range(start: -30m)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> filter(fn: (r) => r._field == "vibration")
  |> filter(fn: (r) => r.zone == "atelier")
```

**Dépassements de seuil (température > 28°C) :**
```flux
from(bucket: "sensors")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> filter(fn: (r) => r.zone == "salle-serveur")
  |> filter(fn: (r) => r._field == "temperature")
  |> filter(fn: (r) => r._value > 28.0)
  |> count()
```

### Structure de la base de données

| Paramètre | Valeur |
|---|---|
| Organisation | `hackathon-iot` |
| Bucket | `sensors` |
| Measurement | `capteurs_industriels` |
| Tags | `zone` (atelier, salle-serveur, local-electrique) |
| Fields | temperature, humidite, vibration, luminosite |
| Rétention | 30 jours |

---

## Notifications — Telegram & Email

Le système envoie des alertes automatiques dès qu'un seuil est dépassé.

### État actuel

Le bot Telegram **@Abder_rms2_bot** est configuré et opérationnel.

### Modifier la configuration

Éditer le fichier `2_Code/.env` :

```env
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_ICI
TELEGRAM_CHAT_ID=YOUR_CHAT_ID_ICI
EMAIL_FROM=votre.email@gmail.com
EMAIL_TO=votre.email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
SMTP_ENABLED=false
```

Puis redémarrer Node-RED :

```bash
cd "/c/Users/Maintenant pret/Hackathon IOT 2026/EQUIPE_01_HACKATHON_2026/2_Code"
docker compose restart nodered
```

### Ajouter les notifications Email (Gmail)

1. Activer la **validation en 2 étapes** sur le compte Gmail
2. Aller sur **myaccount.google.com/apppasswords**
3. Créer un mot de passe d'application "Node-RED IoT"
4. Copier le mot de passe à 16 caractères
5. Le renseigner dans `.env` : `EMAIL_PASS=xxxx-xxxx-xxxx-xxxx`
6. Mettre `SMTP_ENABLED=true`
7. Redémarrer : `docker compose restart nodered`

---

## Surveillance MQTT en ligne de commande

```bash
# Écouter tous les messages IoT
docker exec iot-mosquitto mosquitto_sub \
    -u iotuser -P MqttSecure2026 \
    -t "iot/#" -v

# Écouter uniquement les alertes
docker exec iot-mosquitto mosquitto_sub \
    -u iotuser -P MqttSecure2026 \
    -t "alertes/#" -v

# Écouter les actions automatiques
docker exec iot-mosquitto mosquitto_sub \
    -u iotuser -P MqttSecure2026 \
    -t "actions/#" -v

# Publier un message de test
docker exec iot-mosquitto mosquitto_pub \
    -u iotuser -P MqttSecure2026 \
    -t "test/message" \
    -m '{"test": "ok"}'
```

---

## Scénario de démonstration — Soutenance

> Durée totale : **5 minutes**

### Préparation (5 min avant)

```bash
cd "/c/Users/Maintenant pret/Hackathon IOT 2026/EQUIPE_01_HACKATHON_2026/2_Code"
docker ps
```
→ Les 4 conteneurs doivent être `Up`

Ouvrir 3 onglets dans Chrome :
- **http://localhost:3000** → Grafana → Dashboard
- **http://localhost:1880** → Node-RED
- **http://localhost:8086** → InfluxDB → Data Explorer

---

### Étape 1 — Contexte (30 sec)

*"Nous avons déployé une plateforme IoT complète pour superviser 3 zones industrielles. Tout tourne en Docker sur ce poste."*

```bash
docker ps   # montrer les 4 conteneurs en live
```

### Étape 2 — Grafana (2 min)

1. Montrer les **6 panneaux stat** → *"Valeurs en temps réel des 6 capteurs"*
2. Montrer les **couleurs rouges** → *"Rouge = seuil dépassé, alerte active"*
3. Scroller vers les **graphes Time Series** → *"Dérive progressive des températures sur 30 minutes"*
4. Montrer les **jauges** → *"Niveaux critiques visualisés"*
5. Attendre 5 secondes → *"Le dashboard se rafraîchit automatiquement"*

### Étape 3 — Node-RED (1 min 30)

1. Onglet **"1. Simulation Capteurs"** → *"Simulation avec dérive progressive"*
2. Montrer les valeurs sous les nœuds → *"Changent en temps réel"*
3. Onglet **"3. Automatisation & Alertes"** → *"6 règles vérifient les seuils"*
4. Ouvrir le panneau Debug → *"Alertes CRITIQUE et WARNING en direct"*
5. Onglet **"4. Notifications"** → *"Envoie automatiquement sur Telegram et par email"*

### Étape 4 — InfluxDB (45 sec)

1. **Data Explorer** → coller et exécuter :

```flux
from(bucket: "sensors")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "capteurs_industriels")
  |> last()
```

*"Données stockées et requêtables. Grafana utilise ces mêmes requêtes."*

### Étape 5 — Conclusion (15 sec)

*"L'ensemble fonctionne en une seule commande : `docker compose up -d`. La solution est prête à recevoir de vrais capteurs ESP32."*

---

*Hackathon IoT 2026 — Équipe 01 — Satom IT Learning Solutions*
