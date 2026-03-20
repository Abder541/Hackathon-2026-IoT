# Rapport de Mission - Plateforme IoT Supervision Industrielle

## Hackathon IoT 2026 - Equipe 01
## Satom IT & Learning Solutions

---

## 1. Contexte de la mission

### Client
Entreprise industrielle de taille moyenne souhaitant moderniser la supervision de son infrastructure technique. L'absence de monitoring temps reel engendre des couts eleves lies aux incidents detectes tardivement et aux rondes manuelles inefficaces.

### Problematique
- Aucune supervision temps reel des equipements critiques
- Detection tardive des incidents (pannes, surchauffes, anomalies)
- Rondes manuelles chronophages et peu fiables
- Absence de tracabilite des conditions environnementales
- Cout estime des arrets non planifies : significatif

### Objectif
Concevoir, deployer et documenter une plateforme IoT de supervision couvrant 3 zones critiques de l'infrastructure, avec collecte de donnees, visualisation temps reel, alertes automatiques et actions correctives.

---

## 2. Analyse des besoins

### Zones a superviser

| Zone              | Enjeu                    | Capteurs requis         |
|-------------------|--------------------------|-------------------------|
| Salle Serveur     | Equipements IT critiques | Temperature, Humidite   |
| Atelier Technique | Machines de production   | Vibration, Temperature  |
| Local Electrique  | Armoires, onduleurs      | Luminosite, Temperature |

### Exigences fonctionnelles

1. **Collecte continue** : Acquisition des donnees capteurs a frequence adaptee (2s a 10s)
2. **Centralisation** : Plateforme unique consolidant tous les flux
3. **Visualisation** : Dashboards temps reel professionnels
4. **Alertes** : Notifications automatiques en cas de depassement de seuils
5. **Automatisation** : Actions correctives declenchees automatiquement
6. **Securite** : Chiffrement des communications, authentification
7. **Documentation** : Guides techniques exploitables

### Exigences non fonctionnelles

- Deploiement reproductible (conteneurisation)
- Persistance des donnees (volumes Docker)
- Scalabilite (ajout de zones/capteurs sans refonte)
- Maintenabilite (documentation complete)

---

## 3. Choix techniques et justifications

### Architecture Edge-Fog-Cloud

**Justification** : Ce modele permet une separation claire des responsabilites :
- **Edge** : Collecte des donnees au plus pres des equipements
- **Fog** : Traitement, routage et stockage intermediaire
- **Cloud** : Visualisation, analyse et prise de decision

### Mosquitto (Broker MQTT)

**Justification** : Protocole MQTT choisi pour sa legerte, son modele publish/subscribe adapte a l'IoT, et sa fiabilite via les niveaux de QoS. Mosquitto est la reference open-source, supporte TLS nativement et offre un controle d'acces granulaire (ACL).

### Node-RED (Orchestration)

**Justification** : Plateforme low-code permettant un developpement rapide des flux de donnees. Interface visuelle facilitant la maintenance et l'evolution. Ecosystem riche en noeuds (MQTT, InfluxDB, etc.). Ideal pour le prototypage rapide dans le cadre d'un hackathon.

### InfluxDB 2.7 (Base de donnees)

**Justification** : Base de donnees temporelle optimisee pour les series de capteurs IoT. Compression native des donnees, politiques de retention configurables, langage de requete Flux puissant. Version 2.x offre une API unifiee avec gestion des tokens.

### Grafana 10.2 (Visualisation)

**Justification** : Outil de reference pour les dashboards temps reel. Support natif d'InfluxDB (Flux), large choix de visualisations (time series, gauges, stat panels), systeme d'alertes integre, personnalisation avancee.

### Docker Compose (Deploiement)

**Justification** : Deploiement reproductible en une seule commande. Isolation des services, gestion des dependances, persistance via volumes. Facilite la collaboration et le deploiement sur differents environnements.

---

## 4. Realisation technique

### Infrastructure deployee

| Service    | Image Docker         | Configuration cle                          |
|------------|---------------------|--------------------------------------------|
| Mosquitto  | eclipse-mosquitto:2.0| TLS, Auth, ACL, 3 listeners               |
| Node-RED   | nodered/node-red:3.1 | 3 onglets, 6 regles, influxdb contrib     |
| InfluxDB   | influxdb:2.7         | Bucket: sensors, Retention: 30j, API Token |
| Grafana    | grafana/grafana:10.2 | Auto-provisioning datasource + dashboard  |

### Simulation des capteurs

Chaque zone dispose d'une simulation realiste avec :
- **Bruit aleatoire** : Variation naturelle des mesures
- **Derive progressive** : Simulation de degradation des equipements
- **Spikes aleatoires** : Simulation d'anomalies ponctuelles (vibration)
- **Coupures intermittentes** : Simulation de defaillances (luminosite)

### Regles d'automatisation implementees

6 regles fonctionnelles couvrant tous les seuils definis dans le cahier des charges :
- 2 niveaux d'alerte par regle (WARNING / CRITIQUE)
- Actions automatiques differenciees selon la gravite
- Publication des alertes et actions sur des topics MQTT dedies

### Dashboard

Dashboard professionnel avec :
- Vue synthetique globale (6 stat panels)
- Monitoring detaille par zone (6 time series)
- Jauges visuelles avec seuils (4 gauge panels)
- Rafraichissement automatique (5s)
- Annotations de seuils directement sur les graphes

### Securite

- Certificats TLS auto-signes (CA + serveur avec SAN)
- Authentification MQTT obligatoire sur tous les listeners
- ACL restreignant l'acces aux topics par utilisateur
- Secrets externalises dans un fichier .env
- Reseau Docker isole (bridge dedie)

---

## 5. Difficultes rencontrees et solutions

| Difficulte                              | Solution                                      |
|-----------------------------------------|-----------------------------------------------|
| Gestion des credentials Node-RED avec InfluxDB 2.x | Utilisation de flows_cred.json avec credentialSecret desactive pour le demo |
| Synchronisation du demarrage des services | Utilisation de depends_on dans Docker Compose |
| Donnees realistes avec derive           | Implementation de compteurs contextuels dans Node-RED |
| Provisioning automatique Grafana        | YAML de provisioning avec variables d'environnement |
| Format des donnees pour InfluxDB        | Formatage standardise via function node avec validation |

---

## 6. Ameliorations possibles

### Court terme
- Ajout de notifications email/Telegram via Node-RED
- Tableau de bord des alertes avec historique
- Export CSV des donnees depuis Grafana

### Moyen terme
- Integration de capteurs reels (ESP32 + DHT22)
- Detection d'anomalies par Machine Learning (bonus)
- Haute disponibilite (replication InfluxDB)
- Interface de controle des actionneurs depuis Grafana

### Long terme
- Migration vers un cloud provider (AWS IoT / Azure IoT Hub)
- Integration ERP pour la gestion de maintenance
- Jumeaux numeriques des equipements
- Analyse predictive avec modeles de Machine Learning

---

## 7. Conclusion

La plateforme IoT de supervision industrielle a ete concue et deployee avec succes, repondant a l'ensemble des exigences du cahier des charges :

- **3 zones supervisees** avec 6 capteurs au total
- **6 regles d'automatisation** fonctionnelles avec alertes bi-niveaux
- **Dashboard professionnel** avec rafraichissement temps reel
- **Securite implementee** : TLS, authentification, ACL
- **Deploiement reproductible** via Docker Compose en une commande
- **Documentation complete** : installation, utilisation, architecture

La solution est modulaire, documentee et prete pour une evolution vers des capteurs reels et des fonctionnalites avancees.

---

*Rapport redige le 16/03/2026*
*Equipe 01 - Hackathon IoT 2026*
*Satom IT & Learning Solutions*
