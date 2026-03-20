#!/bin/bash
# ==============================================
# Script d'initialisation complet
# Hackathon IoT 2026 - Plateforme de supervision
# ==============================================

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
echo "=========================================="
echo " HACKATHON IoT 2026 - Initialisation"
echo "=========================================="
echo "Dossier projet : $PROJECT_DIR"
echo ""

# --- Charger les variables d'environnement ---
if [ -f "$PROJECT_DIR/.env" ]; then
    source "$PROJECT_DIR/.env"
    echo "[OK] Variables d'environnement chargées"
else
    echo "[ERREUR] Fichier .env introuvable !"
    exit 1
fi

# --- Étape 1 : Générer les certificats TLS ---
echo ""
echo "--- Étape 1/4 : Certificats TLS ---"
if [ ! -f "$PROJECT_DIR/certs/server.crt" ]; then
    chmod +x "$PROJECT_DIR/certs/generate-certs.sh"
    bash "$PROJECT_DIR/certs/generate-certs.sh"
else
    echo "[SKIP] Les certificats existent déjà"
fi

# --- Étape 2 : Créer le fichier de mots de passe Mosquitto ---
echo ""
echo "--- Étape 2/4 : Mot de passe Mosquitto ---"
PASSWD_FILE="$PROJECT_DIR/mosquitto/config/passwd"
if [ ! -f "$PASSWD_FILE" ]; then
    # Créer un conteneur temporaire pour générer le fichier passwd
    docker run --rm -v "$PROJECT_DIR/mosquitto/config:/mosquitto/config" \
        eclipse-mosquitto:2.0 \
        mosquitto_passwd -b -c /mosquitto/config/passwd "$MOSQUITTO_USER" "$MOSQUITTO_PASSWORD"
    echo "[OK] Fichier passwd créé pour l'utilisateur '$MOSQUITTO_USER'"
else
    echo "[SKIP] Le fichier passwd existe déjà"
fi

# --- Étape 3 : Installer les dépendances Node-RED ---
echo ""
echo "--- Étape 3/4 : Dépendances Node-RED ---"
if [ -f "$PROJECT_DIR/nodered/data/package.json" ]; then
    echo "[OK] package.json Node-RED présent"
else
    echo "[WARN] package.json Node-RED manquant"
fi

# --- Étape 4 : Lancer Docker Compose ---
echo ""
echo "--- Étape 4/4 : Démarrage des services ---"
cd "$PROJECT_DIR"
docker compose up -d

echo ""
echo "=========================================="
echo " DÉMARRAGE TERMINÉ"
echo "=========================================="
echo ""
echo " Services disponibles :"
echo "   - Node-RED    : http://localhost:1880"
echo "   - Grafana     : http://localhost:3000"
echo "     (user: $GRAFANA_ADMIN_USER / pass: $GRAFANA_ADMIN_PASSWORD)"
echo "   - InfluxDB    : http://localhost:8086"
echo "     (user: $INFLUXDB_USERNAME / pass: $INFLUXDB_PASSWORD)"
echo "   - MQTT        : localhost:1883 (standard)"
echo "   - MQTT TLS    : localhost:8883 (sécurisé)"
echo ""
echo " Pour voir les logs : docker compose logs -f"
echo " Pour arrêter      : docker compose down"
echo "=========================================="
