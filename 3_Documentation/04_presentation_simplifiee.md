# Présentation simplifiée du projet
## Hackathon IoT 2026 — Équipe 01

---

## En une phrase

> **Nous avons créé un système qui surveille automatiquement des machines ou des bâtiments, envoie une alerte sur votre téléphone si quelque chose ne va pas, et affiche tout en temps réel sur un écran.**

---

## C'est quoi l'IoT ?

**IoT** signifie *Internet des Objets* (en anglais : *Internet of Things*).

L'idée est simple : des petits capteurs électroniques sont placés sur des machines, dans des salles ou sur des équipements. Ces capteurs mesurent des choses en permanence :
- La **température** d'une pièce ou d'une machine
- L'**humidité** de l'air
- La **consommation électrique**
- La **pression** dans une canalisation
- Etc.

Ces capteurs envoient leurs mesures automatiquement à un ordinateur central, qui analyse les données et alerte si quelque chose dépasse un seuil.

**Exemple concret :** Si la température d'un serveur informatique monte trop haut, le système envoie immédiatement un message sur votre téléphone.

---

## À quoi sert ce projet ?

Ce projet simule une **plateforme de surveillance industrielle** — le type de système utilisé dans :
- Les usines pour surveiller les machines
- Les datacenters pour surveiller les serveurs
- Les bâtiments intelligents pour optimiser l'énergie
- Les entrepôts réfrigérés pour garantir la chaîne du froid

Notre système surveille **3 zones** :
| Zone | Ce qui est surveillé |
|------|----------------------|
| **Zone A — Production** | Température, humidité, vibrations des machines |
| **Zone B — Serveurs** | Température, consommation électrique, état des équipements |
| **Zone C — Stockage** | Température, humidité (pour protéger les produits) |

---

## Les 4 briques du système

### 1. Le facteur — MQTT (Mosquitto)

Imaginez un **facteur numérique** qui distribue les messages entre les capteurs et le reste du système.

Les capteurs envoient leurs mesures toutes les 5 secondes. Mosquitto reçoit ces messages et les distribue immédiatement à tous ceux qui en ont besoin.

- **Sans lui :** chaque capteur devrait appeler directement chaque application — c'est le chaos
- **Avec lui :** tout le monde envoie à un seul endroit, et tout le monde reçoit ce dont il a besoin

---

### 2. Le cerveau — Node-RED

Node-RED est le **cerveau du système**. Il reçoit toutes les mesures des capteurs et décide quoi en faire.

Concrètement, il fait 4 choses :
1. **Simule les capteurs** (pour la démonstration, il génère des données réalistes)
2. **Enregistre les données** dans la base de données
3. **Vérifie les seuils** : si une valeur est trop haute ou trop basse, il déclenche une alerte
4. **Envoie les notifications** : SMS Telegram sur votre téléphone + email automatique

---

### 3. Le carnet de notes — InfluxDB

InfluxDB est une **base de données spécialisée pour les données qui changent dans le temps**.

Pensez à un carnet où vous notez toutes les 5 secondes : "il est 14h32:05, la température est 22.3°C". Puis "14h32:10, 22.4°C". Etc.

- Il garde **30 jours** d'historique
- Il permet de voir les tendances sur la durée
- Il répond très vite aux questions du type "quelle était la température moyenne hier entre 14h et 16h ?"

---

### 4. L'écran de contrôle — Grafana

Grafana est le **tableau de bord visuel**. C'est ce que vous voyez sur l'écran.

Il affiche en temps réel :
- Des **jauges** colorées (vert = normal, orange = attention, rouge = alerte)
- Des **graphiques** qui montrent l'évolution dans le temps
- Des **statistiques** : valeur actuelle, moyenne, minimum, maximum
- Des **alertes visuelles** quand un seuil est dépassé

C'est l'interface que le responsable consulte pour savoir en un coup d'oeil si tout va bien.

---

## Ce qui se passe quand une alerte est déclenchée

```
Capteur mesure 85°C  →  Seuil dépassé (limite : 80°C)
        ↓
   Node-RED détecte l'anomalie
        ↓
   ┌────────────────────────────────────┐
   │  Message Telegram sur téléphone    │  ← en moins de 2 secondes
   │  "ALERTE : Température critique"   │
   └────────────────────────────────────┘
        ↓
   ┌────────────────────────────────────┐
   │  Email envoyé automatiquement      │  ← avec détails complets
   │  Zone, valeur, heure, description  │
   └────────────────────────────────────┘
        ↓
   ┌────────────────────────────────────┐
   │  Tableau de bord Grafana passe     │  ← visible sur l'écran
   │  en rouge avec l'alerte affichée   │
   └────────────────────────────────────┘
```

**Le responsable est informé en moins de 2 secondes, même s'il n'est pas devant son écran.**

---

## Seuils d'alerte configurés

| Ce qui est mesuré | Seuil d'alerte | Exemple de risque |
|-------------------|----------------|-------------------|
| Température > 80°C | Critique | Machine en surchauffe |
| Température > 30°C | Attention | Salle trop chaude |
| Humidité > 80% | Attention | Risque de condensation |
| Vibrations > 7 | Critique | Machine déréglée |
| Courant > 18A | Attention | Surcharge électrique |

---

## Comment lancer le système ?

Le démarrage se fait en **une seule commande** :

```
docker-compose up -d
```

C'est tout. En quelques secondes, les 4 briques démarrent automatiquement et le système est opérationnel.

Pour arrêter :
```
docker-compose down
```

---

## Où accéder au système ?

Une fois lancé, depuis n'importe quel navigateur web sur le même réseau :

| Ce que vous voulez voir | Adresse à taper |
|-------------------------|-----------------|
| **Tableau de bord** (Grafana) | `http://localhost:3000` |
| **Flux de traitement** (Node-RED) | `http://localhost:1880` |
| **Base de données** (InfluxDB) | `http://localhost:8086` |

---

## Ce que ce projet démontre

1. **Surveillance en temps réel** — les données arrivent toutes les 5 secondes
2. **Alertes automatiques** — vous êtes notifié sans rien faire
3. **Historique complet** — 30 jours de données consultables
4. **Déploiement simple** — une commande suffit
5. **Évolutivité** — on peut ajouter de vrais capteurs physiques sans changer l'architecture

---

## En résumé, en 3 mots

| Surveiller | Analyser | Alerter |
|-----------|----------|---------|
| Capteurs mesurent en continu | Le système compare aux seuils | Notification immédiate si problème |

---

*Hackathon IoT 2026 — Équipe 01 — Satom IT Learning Solutions*
