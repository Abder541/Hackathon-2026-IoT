#!/bin/bash
# =============================================================
# HACKATHON IoT 2026 - Setup Notifications Automatique
# Configure Telegram + Email en une seule commande
# =============================================================

set -e

# Couleurs
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

ENV_FILE="$(dirname "$0")/../.env"
CRED_FILE="$(dirname "$0")/../nodered/data/flows_cred.json"

echo ""
echo -e "${CYAN}${BOLD}=====================================================${NC}"
echo -e "${CYAN}${BOLD}   HACKATHON IoT 2026 - Configuration Notifications  ${NC}"
echo -e "${CYAN}${BOLD}=====================================================${NC}"
echo ""

# ─── TELEGRAM ───────────────────────────────────────────────
echo -e "${BOLD}[1/2] TELEGRAM${NC}"
echo -e "${YELLOW}Pour créer un bot Telegram (2 min) :${NC}"
echo "  1. Ouvrir Telegram → rechercher @BotFather"
echo "  2. Envoyer /newbot"
echo "  3. Donner un nom : Hackathon IoT 2026 Bot"
echo "  4. Donner un username : hackathon_iot_2026_bot"
echo "  5. Copier le TOKEN affiché"
echo ""
read -rp "$(echo -e ${CYAN})Token Telegram (ou ENTREE pour ignorer) : $(echo -e ${NC})" TG_TOKEN

if [ -n "$TG_TOKEN" ] && [ "$TG_TOKEN" != "YOUR_BOT_TOKEN" ]; then
    echo ""
    echo -e "${YELLOW}Récupération automatique du chat_id...${NC}"
    echo "  → Envoie d'abord UN message à ton bot sur Telegram"
    read -rp "$(echo -e ${CYAN})Appuie sur ENTREE une fois que tu as envoyé un message au bot...$(echo -e ${NC})" _

    # Auto-detect chat_id
    UPDATES=$(curl -s "https://api.telegram.org/bot${TG_TOKEN}/getUpdates")
    TG_CHAT_ID=$(echo "$UPDATES" | python3 -c "
import json,sys
data = json.load(sys.stdin)
results = data.get('result', [])
if results:
    print(results[-1]['message']['chat']['id'])
else:
    print('')
" 2>/dev/null)

    if [ -n "$TG_CHAT_ID" ]; then
        echo -e "${GREEN}✓ Chat ID détecté automatiquement : $TG_CHAT_ID${NC}"
    else
        read -rp "$(echo -e ${CYAN})Chat ID non trouvé. Entre-le manuellement : $(echo -e ${NC})" TG_CHAT_ID
    fi
else
    TG_TOKEN="YOUR_BOT_TOKEN"
    TG_CHAT_ID="YOUR_CHAT_ID"
    echo -e "${YELLOW}→ Telegram ignoré${NC}"
fi

echo ""

# ─── EMAIL ──────────────────────────────────────────────────
echo -e "${BOLD}[2/2] EMAIL GMAIL${NC}"
echo -e "${YELLOW}Pour créer un mot de passe d'application Gmail :${NC}"
echo "  1. myaccount.google.com → Sécurité → Validation en 2 étapes (activer)"
echo "  2. myaccount.google.com/apppasswords"
echo "  3. Sélectionner : Autre → 'Node-RED IoT' → Générer"
echo "  4. Copier le mot de passe à 16 caractères"
echo ""
read -rp "$(echo -e ${CYAN})Adresse Gmail (ou ENTREE pour ignorer) : $(echo -e ${NC})" EMAIL_ADDR
if [ -n "$EMAIL_ADDR" ] && [ "$EMAIL_ADDR" != "votre.email@gmail.com" ]; then
    read -rp "$(echo -e ${CYAN})Mot de passe d'application (16 caractères) : $(echo -e ${NC})" EMAIL_PASS_INPUT
    EMAIL_FROM="$EMAIL_ADDR"
    EMAIL_TO="$EMAIL_ADDR"
    EMAIL_PASS_VAL="$EMAIL_PASS_INPUT"
else
    EMAIL_FROM="votre.email@gmail.com"
    EMAIL_TO="votre.email@gmail.com"
    EMAIL_PASS_VAL="votre-app-password-16-caracteres"
    echo -e "${YELLOW}→ Email ignoré${NC}"
fi

echo ""
echo -e "${BOLD}Configuration des fichiers...${NC}"

# ─── Mise à jour .env ────────────────────────────────────────
if [ -f "$ENV_FILE" ]; then
    # Remplacer les valeurs Telegram
    python3 - <<PYEOF
import re

with open('${ENV_FILE}', 'r') as f:
    content = f.read()

content = re.sub(r'TELEGRAM_BOT_TOKEN=.*', 'TELEGRAM_BOT_TOKEN=${TG_TOKEN}', content)
content = re.sub(r'TELEGRAM_CHAT_ID=.*', 'TELEGRAM_CHAT_ID=${TG_CHAT_ID}', content)
content = re.sub(r'EMAIL_FROM=.*', 'EMAIL_FROM=${EMAIL_FROM}', content)
content = re.sub(r'EMAIL_TO=.*', 'EMAIL_TO=${EMAIL_TO}', content)
content = re.sub(r'EMAIL_PASS=.*', 'EMAIL_PASS=${EMAIL_PASS_VAL}', content)

with open('${ENV_FILE}', 'w') as f:
    f.write(content)
print("OK .env mis a jour")
PYEOF
    echo -e "${GREEN}✓ .env mis à jour${NC}"
fi

# ─── Mise à jour flows_cred.json ─────────────────────────────
if [ -f "$CRED_FILE" ]; then
    python3 - <<PYEOF
import json

with open('${CRED_FILE}', 'r') as f:
    creds = json.load(f)

creds['notif-em-out'] = {
    'userid': '${EMAIL_FROM}',
    'password': '${EMAIL_PASS_VAL}'
}

with open('${CRED_FILE}', 'w') as f:
    json.dump(creds, f, indent=4)
print("OK flows_cred.json mis a jour")
PYEOF
    echo -e "${GREEN}✓ flows_cred.json mis à jour${NC}"
fi

# ─── Restart Node-RED ────────────────────────────────────────
echo ""
echo -e "${BOLD}Redémarrage de Node-RED...${NC}"
cd "$(dirname "$0")/.." && docker compose restart nodered 2>/dev/null
sleep 8
echo -e "${GREEN}✓ Node-RED redémarré${NC}"

# ─── Test Telegram ───────────────────────────────────────────
if [ "$TG_TOKEN" != "YOUR_BOT_TOKEN" ] && [ -n "$TG_CHAT_ID" ]; then
    echo ""
    echo -e "${BOLD}Test Telegram...${NC}"
    RESULT=$(curl -s -X POST "https://api.telegram.org/bot${TG_TOKEN}/sendMessage" \
        -H 'Content-Type: application/json' \
        -d "{\"chat_id\":\"${TG_CHAT_ID}\",\"text\":\"✅ *Hackathon IoT 2026*\n\nNotifications configurées et opérationnelles\\!\n\n_Equipe 01 - Satom IT \\& Learning Solutions_\",\"parse_mode\":\"MarkdownV2\"}")
    OK=$(echo "$RESULT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('ok',''))" 2>/dev/null)
    if [ "$OK" = "True" ]; then
        echo -e "${GREEN}✓ Message Telegram de test envoyé avec succès !${NC}"
    else
        echo -e "${RED}✗ Erreur Telegram : vérifier le token et le chat_id${NC}"
        echo "  Réponse : $RESULT"
    fi
fi

echo ""
echo -e "${CYAN}${BOLD}=====================================================${NC}"
echo -e "${GREEN}${BOLD} Configuration terminée !${NC}"
echo ""
echo -e "  Telegram : ${CYAN}${TG_TOKEN:0:20}...${NC}"
echo -e "  Email    : ${CYAN}${EMAIL_FROM}${NC}"
echo ""
echo -e "  Node-RED : ${CYAN}http://localhost:1880${NC} → Onglet '4. Notifications'"
echo -e "${CYAN}${BOLD}=====================================================${NC}"
echo ""
