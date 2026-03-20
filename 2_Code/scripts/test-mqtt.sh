#!/bin/bash
# ==============================================
# Script de test MQTT
# Vérifie la connectivité et le fonctionnement du broker
# ==============================================

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
source "$PROJECT_DIR/.env"

echo "=== Test de connectivité MQTT ==="
echo ""

# Test 1 : Publication de test
echo "[Test 1] Publication sur le topic de test..."
docker exec iot-mosquitto mosquitto_pub \
    -u "$MOSQUITTO_USER" -P "$MOSQUITTO_PASSWORD" \
    -t "test/connectivity" \
    -m '{"status": "ok", "timestamp": "'$(date -Iseconds)'"}' \
    -q 1

echo "  [OK] Message publié avec succès"

# Test 2 : Vérification des topics IoT
echo ""
echo "[Test 2] Écoute des topics IoT pendant 5 secondes..."
timeout 5 docker exec iot-mosquitto mosquitto_sub \
    -u "$MOSQUITTO_USER" -P "$MOSQUITTO_PASSWORD" \
    -t "iot/#" -v -C 3 2>/dev/null || true

echo ""
echo "[Test 3] Vérification des alertes pendant 5 secondes..."
timeout 5 docker exec iot-mosquitto mosquitto_sub \
    -u "$MOSQUITTO_USER" -P "$MOSQUITTO_PASSWORD" \
    -t "alertes/#" -v -C 2 2>/dev/null || true

# Test 4 : Status des services Docker
echo ""
echo "[Test 4] État des services Docker..."
docker compose -f "$PROJECT_DIR/docker-compose.yml" ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "=== Tests terminés ==="
