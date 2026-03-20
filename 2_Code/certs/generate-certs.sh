#!/bin/bash
# ==============================================
# Génération des certificats TLS pour Mosquitto
# Hackathon IoT 2026
# ==============================================

set -e

CERTS_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "=== Génération des certificats TLS ==="
echo "Dossier : $CERTS_DIR"

# --- 1. Autorité de Certification (CA) ---
echo "[1/3] Création de l'autorité de certification (CA)..."
openssl genrsa -out "$CERTS_DIR/ca.key" 2048
openssl req -new -x509 -days 365 -key "$CERTS_DIR/ca.key" \
  -out "$CERTS_DIR/ca.crt" \
  -subj "//C=FR\ST=IDF\L=Paris\O=HackathonIoT2026\OU=CA\CN=IoT-CA"

# --- 2. Certificat Serveur (Mosquitto) ---
echo "[2/3] Création du certificat serveur..."
openssl genrsa -out "$CERTS_DIR/server.key" 2048
openssl req -new -key "$CERTS_DIR/server.key" \
  -out "$CERTS_DIR/server.csr" \
  -subj "//C=FR\ST=IDF\L=Paris\O=HackathonIoT2026\OU=Broker\CN=mosquitto"

# Extension SAN pour accepter localhost et le nom Docker
cat > "$CERTS_DIR/server-ext.cnf" << 'EXTEOF'
[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = mosquitto
DNS.2 = localhost
DNS.3 = iot-mosquitto
IP.1 = 127.0.0.1
EXTEOF

openssl x509 -req -in "$CERTS_DIR/server.csr" \
  -CA "$CERTS_DIR/ca.crt" -CAkey "$CERTS_DIR/ca.key" -CAcreateserial \
  -out "$CERTS_DIR/server.crt" -days 365 \
  -extfile "$CERTS_DIR/server-ext.cnf" -extensions v3_req

# --- 3. Certificat Client (optionnel) ---
echo "[3/3] Création du certificat client..."
openssl genrsa -out "$CERTS_DIR/client.key" 2048
openssl req -new -key "$CERTS_DIR/client.key" \
  -out "$CERTS_DIR/client.csr" \
  -subj "//C=FR\ST=IDF\L=Paris\O=HackathonIoT2026\OU=Client\CN=iot-client"
openssl x509 -req -in "$CERTS_DIR/client.csr" \
  -CA "$CERTS_DIR/ca.crt" -CAkey "$CERTS_DIR/ca.key" -CAcreateserial \
  -out "$CERTS_DIR/client.crt" -days 365

# --- Nettoyage ---
rm -f "$CERTS_DIR"/*.csr "$CERTS_DIR"/*.srl "$CERTS_DIR"/server-ext.cnf

# --- Permissions ---
chmod 644 "$CERTS_DIR"/*.crt
chmod 600 "$CERTS_DIR"/*.key

echo ""
echo "=== Certificats générés avec succès ==="
echo "  CA      : $CERTS_DIR/ca.crt / ca.key"
echo "  Serveur : $CERTS_DIR/server.crt / server.key"
echo "  Client  : $CERTS_DIR/client.crt / client.key"
echo ""
echo "Validité : 365 jours"
