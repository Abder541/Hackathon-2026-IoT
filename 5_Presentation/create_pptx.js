const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_16x9";
pres.author = "Equipe 01 - Hackathon IoT 2026";
pres.title = "Supervision IoT Industrielle - Hackathon 2026";

// ============================================================
// COLOR PALETTE - Dark IoT Theme
// ============================================================
const C = {
  navy:     "0B1929",   // Dark background
  darkBlue: "122A45",   // Card backgrounds
  teal:     "0891B2",   // Primary accent
  cyan:     "06B6D4",   // Lighter accent
  mint:     "2DD4BF",   // Success/positive
  red:      "F43F5E",   // Alert/danger
  orange:   "F59E0B",   // Warning
  white:    "FFFFFF",
  light:    "E2E8F0",   // Light text
  muted:    "94A3B8",   // Muted text
  card:     "1E3A5F",   // Card bg
  darkCard: "162D4A",   // Darker card
};

// Helper: factory for shadows (must create fresh each time)
const makeShadow = () => ({ type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.3 });
const makeCardShadow = () => ({ type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.2 });

// ============================================================
// SLIDE 1 - TITLE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  // Main title area
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.2, w: 10, h: 2.8, fill: { color: C.darkBlue, transparency: 40 } });
  s.addText("SUPERVISION IoT", { x: 0.8, y: 1.3, w: 8.4, h: 1.0, fontSize: 48, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
  s.addText("INDUSTRIELLE", { x: 0.8, y: 2.1, w: 8.4, h: 0.8, fontSize: 42, fontFace: "Calibri", bold: true, color: C.teal, align: "center", margin: 0 });
  s.addText("Plateforme de monitoring temps reel", { x: 0.8, y: 2.9, w: 8.4, h: 0.5, fontSize: 18, fontFace: "Calibri", color: C.muted, align: "center", italic: true, margin: 0 });
  // Bottom section
  s.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 3.6, w: 4.0, h: 0.03, fill: { color: C.teal } });
  s.addText("Hackathon IoT 2026", { x: 0.8, y: 3.9, w: 8.4, h: 0.4, fontSize: 20, fontFace: "Calibri", color: C.cyan, align: "center", bold: true, margin: 0 });
  s.addText("Equipe 01", { x: 0.8, y: 4.3, w: 8.4, h: 0.35, fontSize: 16, fontFace: "Calibri", color: C.light, align: "center", margin: 0 });
  s.addText("Satom IT & Learning Solutions", { x: 0.8, y: 4.7, w: 8.4, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });
  // Bottom accent
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.teal } });
}

// ============================================================
// SLIDE 2 - SOMMAIRE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("SOMMAIRE", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 32, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 1.5, h: 0.04, fill: { color: C.teal } });

  const items = [
    ["01", "Contexte & Problematique"],
    ["02", "Roles de l'Equipe"],
    ["03", "Architecture Edge-Fog-Cloud"],
    ["04", "Stack Technologique"],
    ["05", "Topics MQTT & Flux de Donnees"],
    ["06", "Simulation des Capteurs"],
    ["07", "Regles d'Automatisation"],
    ["08", "Securite (TLS + Auth + ACL)"],
    ["09", "Demo: Dashboard Grafana"],
    ["10", "Demo: Node-RED Flows"],
    ["11", "Demo: InfluxDB Data Explorer"],
    ["12", "Resultats & Alertes declenchees"],
    ["13", "Difficultes & Solutions"],
    ["14", "Evolutions Possibles"],
    ["15", "Conclusion"],
  ];

  items.forEach((item, i) => {
    const yPos = 1.15 + i * 0.33;
    s.addText(item[0], { x: 0.8, y: yPos, w: 0.6, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.teal, margin: 0 });
    s.addText(item[1], { x: 1.5, y: yPos, w: 7.0, h: 0.3, fontSize: 13, fontFace: "Calibri", color: C.light, margin: 0 });
  });
}

// ============================================================
// SLIDE 3 - CONTEXTE & PROBLEMATIQUE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("CONTEXTE & PROBLEMATIQUE", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  // Left column - Client context
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.15, w: 4.3, h: 2.0, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.15, w: 0.07, h: 2.0, fill: { color: C.teal } });
  s.addText("LE CLIENT", { x: 0.8, y: 1.25, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });
  s.addText([
    { text: "Entreprise industrielle de taille moyenne", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Aucune supervision temps reel", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Incidents detectes tardivement", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Couts eleves d'arrets non planifies", options: { bullet: true, fontSize: 12 } },
  ], { x: 0.8, y: 1.65, w: 3.8, h: 1.4, fontFace: "Calibri", color: C.light, paraSpaceAfter: 4 });

  // Right column - Mission
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.15, w: 4.3, h: 2.0, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.15, w: 0.07, h: 2.0, fill: { color: C.mint } });
  s.addText("LA MISSION", { x: 5.5, y: 1.25, w: 3.8, h: 0.35, fontSize: 16, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText([
    { text: "Concevoir une plateforme IoT complete", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Superviser 3 zones critiques", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Alertes et actions automatiques", options: { bullet: true, breakLine: true, fontSize: 12 } },
    { text: "Deploiement conteneurise reproductible", options: { bullet: true, fontSize: 12 } },
  ], { x: 5.5, y: 1.65, w: 3.8, h: 1.4, fontFace: "Calibri", color: C.light, paraSpaceAfter: 4 });

  // Bottom - 3 zone cards
  const zones = [
    { name: "Salle Serveur", sensors: "Temperature + Humidite", icon: "T + H", color: C.teal },
    { name: "Atelier Technique", sensors: "Vibration + Temperature", icon: "V + T", color: C.orange },
    { name: "Local Electrique", sensors: "Luminosite + Temperature", icon: "L + T", color: C.mint },
  ];
  zones.forEach((z, i) => {
    const xPos = 0.5 + i * 3.17;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 3.5, w: 2.97, h: 1.7, fill: { color: C.card }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 3.5, w: 2.97, h: 0.06, fill: { color: z.color } });
    s.addText(z.icon, { x: xPos + 0.3, y: 3.7, w: 0.7, h: 0.5, fontSize: 14, fontFace: "Calibri", bold: true, color: z.color, margin: 0 });
    s.addText(z.name, { x: xPos + 1.0, y: 3.7, w: 1.8, h: 0.35, fontSize: 13, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
    s.addText(z.sensors, { x: xPos + 0.3, y: 4.3, w: 2.4, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.muted, margin: 0 });
    s.addText("Freq: " + (i === 0 ? "5s" : i === 1 ? "2s" : "10s"), { x: xPos + 0.3, y: 4.65, w: 2.4, h: 0.3, fontSize: 11, fontFace: "Calibri", color: z.color, bold: true, margin: 0 });
  });
}

// ============================================================
// SLIDE - ROLES DE L'EQUIPE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("ROLES DE L'EQUIPE", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });
  s.addText("5 expertises complementaires pour une solution complete", { x: 0.8, y: 0.95, w: 8.4, h: 0.3, fontSize: 12, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });

  const roles = [
    {
      role: "Chef de Projet / Architecte",
      resp: "Coordination generale, conception de l'architecture Edge-Fog-Cloud, respect du cahier des charges, arbitrage des choix techniques.",
      livrables: "Architecture, Docker Compose, Documentation",
      color: C.teal,
      icon: "ARCH",
    },
    {
      role: "Ingenieur IoT / Capteurs",
      resp: "Simulation des capteurs (3 zones, 6 mesures), implementation de la derive progressive, spikes et coupures aleatoires.",
      livrables: "Flows Node-RED Simulation, Logique metier",
      color: C.mint,
      icon: "IOT",
    },
    {
      role: "Ingenieur Reseau / Communication",
      resp: "Configuration Mosquitto MQTT, TLS 1.2, certificats X.509, ACL par topic, authentification par mot de passe.",
      livrables: "Certificats TLS, mosquitto.conf, acl.conf",
      color: C.orange,
      icon: "NET",
    },
    {
      role: "Ingenieur Donnees / Stockage",
      resp: "Configuration InfluxDB 2.7, formatage des donnees en Line Protocol, bucket, tags, fields, retention 30 jours.",
      livrables: "Flows Ingestion, Requetes Flux, Data Explorer",
      color: C.cyan,
      icon: "DATA",
    },
    {
      role: "Ingenieur Visualisation / Automatisation",
      resp: "Dashboards Grafana (16+ panels), 6 regles d'alerte Node-RED avec 2 niveaux, provisioning as code.",
      livrables: "iot-supervision.json, Flows Automatisation",
      color: C.red,
      icon: "VIZ",
    },
  ];

  roles.forEach((r, i) => {
    const yPos = 1.35 + i * 0.83;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9.0, h: 0.73, fill: { color: i % 2 === 0 ? C.darkCard : C.card }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 0.07, h: 0.73, fill: { color: r.color } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: yPos + 0.08, w: 0.7, h: 0.55, fill: { color: r.color, transparency: 75 } });
    s.addText(r.icon, { x: 0.7, y: yPos + 0.08, w: 0.7, h: 0.55, fontSize: 9, fontFace: "Calibri", bold: true, color: r.color, align: "center", valign: "middle", margin: 0 });
    s.addText(r.role, { x: 1.55, y: yPos + 0.06, w: 3.5, h: 0.25, fontSize: 12, fontFace: "Calibri", bold: true, color: r.color, margin: 0 });
    s.addText(r.resp, { x: 1.55, y: yPos + 0.32, w: 4.2, h: 0.35, fontSize: 8.5, fontFace: "Calibri", color: C.light, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.0, y: yPos + 0.08, w: 3.3, h: 0.55, fill: { color: C.navy, transparency: 30 } });
    s.addText("Livrables :", { x: 6.1, y: yPos + 0.1, w: 3.1, h: 0.2, fontSize: 8, fontFace: "Calibri", bold: true, color: r.color, margin: 0 });
    s.addText(r.livrables, { x: 6.1, y: yPos + 0.3, w: 3.1, h: 0.3, fontSize: 8, fontFace: "Calibri", color: C.muted, margin: 0 });
  });
}

// ============================================================
// SLIDE - ARCHITECTURE EDGE-FOG-CLOUD
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("ARCHITECTURE EDGE-FOG-CLOUD", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.5, h: 0.04, fill: { color: C.teal } });

  // CLOUD layer
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 1.0, fill: { color: "1A3550" }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 9.0, h: 0.05, fill: { color: C.cyan } });
  s.addText("CLOUD - Supervision", { x: 0.8, y: 1.2, w: 3.0, h: 0.35, fontSize: 14, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });
  s.addText("Grafana :3000  |  Dashboards temps reel  |  Gauges & seuils  |  Alertes visuelles", { x: 0.8, y: 1.55, w: 8.5, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.light, margin: 0 });

  // Arrow down
  s.addText("\u2193  Flux queries", { x: 3.5, y: 2.1, w: 3.0, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });

  // FOG layer
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.4, w: 9.0, h: 1.5, fill: { color: "1A3550" }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.4, w: 9.0, h: 0.05, fill: { color: C.teal } });
  s.addText("FOG - Plateforme Centrale", { x: 0.8, y: 2.5, w: 3.5, h: 0.35, fontSize: 14, fontFace: "Calibri", bold: true, color: C.teal, margin: 0 });

  // 3 FOG services
  const fogServices = [
    { name: "Mosquitto", desc: "Broker MQTT\nTLS :8883\nAuth + ACL", port: ":1883", col: C.orange },
    { name: "Node-RED", desc: "Orchestration\n6 regles alerte\nFormatage data", port: ":1880", col: C.mint },
    { name: "InfluxDB", desc: "Base temporelle\nBucket: sensors\nRetention: 30j", port: ":8086", col: C.cyan },
  ];
  fogServices.forEach((svc, i) => {
    const xPos = 0.8 + i * 3.0;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 2.95, w: 2.6, h: 0.85, fill: { color: C.darkCard } });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 2.95, w: 0.06, h: 0.85, fill: { color: svc.col } });
    s.addText(svc.name + "  " + svc.port, { x: xPos + 0.15, y: 2.97, w: 2.3, h: 0.25, fontSize: 11, fontFace: "Calibri", bold: true, color: svc.col, margin: 0 });
    s.addText(svc.desc, { x: xPos + 0.15, y: 3.2, w: 2.3, h: 0.55, fontSize: 9, fontFace: "Calibri", color: C.muted, margin: 0 });
  });

  // Arrow down
  s.addText("\u2193  MQTT QoS 1", { x: 3.5, y: 3.95, w: 3.0, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });

  // EDGE layer
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.25, w: 9.0, h: 1.2, fill: { color: "1A3550" }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.25, w: 9.0, h: 0.05, fill: { color: C.mint } });
  s.addText("EDGE - Zones Supervisees", { x: 0.8, y: 4.35, w: 3.5, h: 0.35, fontSize: 14, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });

  const edgeZones = [
    { name: "Salle Serveur", sensors: "Temp + Hum | 5s", seuils: "T>28C, H>70%" },
    { name: "Atelier Tech.", sensors: "Vib + Temp | 2s", seuils: "V>5mm/s, T>40C" },
    { name: "Local Elec.", sensors: "Lum + Temp | 10s", seuils: "L<50lux, T>35C" },
  ];
  edgeZones.forEach((z, i) => {
    const xPos = 0.8 + i * 3.0;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 4.75, w: 2.6, h: 0.6, fill: { color: C.darkCard } });
    s.addText(z.name, { x: xPos + 0.1, y: 4.77, w: 2.4, h: 0.2, fontSize: 10, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
    s.addText(z.sensors + "  |  " + z.seuils, { x: xPos + 0.1, y: 4.97, w: 2.4, h: 0.3, fontSize: 8, fontFace: "Calibri", color: C.muted, margin: 0 });
  });
}

// ============================================================
// SLIDE 5 - STACK TECHNOLOGIQUE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("STACK TECHNOLOGIQUE", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  const techs = [
    { name: "Eclipse Mosquitto 2.0", role: "Broker MQTT", desc: "Transport leger des messages IoT via le protocole MQTT. Supporte TLS 1.2, authentification par mot de passe et ACL par topic.", port: ":1883 / :8883", color: C.orange },
    { name: "Node-RED 3.1", role: "Orchestration", desc: "Plateforme low-code pour la simulation des capteurs, le formatage des donnees et l'execution des 6 regles d'automatisation.", port: ":1880", color: C.red },
    { name: "InfluxDB 2.7", role: "Base de donnees", desc: "Base de donnees temporelle optimisee pour les series IoT. Langage Flux, compression native, retention configurable a 30 jours.", port: ":8086", color: C.cyan },
    { name: "Grafana 10.2", role: "Visualisation", desc: "Dashboards professionnels temps reel avec 16+ panels : stat, time series, gauges. Rafraichissement automatique toutes les 5s.", port: ":3000", color: C.mint },
  ];

  techs.forEach((t, i) => {
    const yPos = 1.15 + i * 1.07;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9.0, h: 0.95, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 0.07, h: 0.95, fill: { color: t.color } });
    s.addText(t.name, { x: 0.8, y: yPos + 0.05, w: 3.0, h: 0.3, fontSize: 15, fontFace: "Calibri", bold: true, color: t.color, margin: 0 });
    s.addText(t.role + "  |  Port " + t.port, { x: 0.8, y: yPos + 0.35, w: 3.0, h: 0.25, fontSize: 10, fontFace: "Calibri", color: C.muted, margin: 0 });
    s.addText(t.desc, { x: 4.0, y: yPos + 0.1, w: 5.3, h: 0.75, fontSize: 11, fontFace: "Calibri", color: C.light, valign: "middle", margin: 0 });
  });

  s.addText("Docker Compose  |  Deploiement reproductible en une seule commande : docker compose up -d", { x: 0.5, y: 5.1, w: 9.0, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.teal, bold: true, align: "center", margin: 0 });
}

// ============================================================
// SLIDE 6 - TOPICS MQTT & FLUX
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("TOPICS MQTT & FLUX DE DONNEES", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 28, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.5, h: 0.04, fill: { color: C.teal } });

  // Topics table
  const topicHeader = [
    { text: "Topic", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
    { text: "QoS", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri", align: "center" } },
    { text: "Description", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
  ];
  const topicRows = [
    ["iot/salle-serveur/data", "1", "Donnees temp + humidite"],
    ["iot/atelier/data", "1", "Donnees vibration + temp"],
    ["iot/local-electrique/data", "1", "Donnees luminosite + temp"],
    ["alertes/{zone}/{type}", "2", "Alertes WARNING / CRITIQUE"],
    ["actions/{actionneur}", "1", "Commandes automatiques"],
  ].map(r => r.map(c => ({ text: c, options: { fill: { color: C.darkCard }, color: C.light, fontSize: 9, fontFace: "Calibri", align: c.length <= 2 ? "center" : "left" } })));

  s.addTable([topicHeader, ...topicRows], { x: 0.5, y: 1.1, w: 4.3, colW: [2.0, 0.5, 1.8], border: { pt: 0.5, color: "2A4A6B" }, rowH: 0.3 });

  // Right side - Flux diagram
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 3.6, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addText("Flux de donnees", { x: 5.5, y: 1.2, w: 3.8, h: 0.35, fontSize: 14, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });

  const flowSteps = [
    { text: "Capteurs simules (Node-RED)", color: C.mint },
    { text: "\u2193  JSON via MQTT", color: C.muted },
    { text: "Broker Mosquitto", color: C.orange },
    { text: "\u2193  iot/{zone}/data", color: C.muted },
    { text: "Node-RED (Ingestion + Regles)", color: C.red },
    { text: "\u2193  Format [fields, tags]", color: C.muted },
    { text: "InfluxDB (bucket: sensors)", color: C.cyan },
    { text: "\u2193  Flux queries", color: C.muted },
    { text: "Grafana (Dashboard 16+ panels)", color: C.teal },
  ];
  flowSteps.forEach((step, i) => {
    s.addText(step.text, { x: 5.5, y: 1.65 + i * 0.32, w: 3.8, h: 0.28, fontSize: step.color === C.muted ? 9 : 11, fontFace: "Calibri", color: step.color, bold: step.color !== C.muted, align: "center", margin: 0 });
  });

  // Bottom left - Key points instead of raw JSON
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.1, w: 4.3, h: 2.1, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.1, w: 0.07, h: 2.1, fill: { color: C.mint } });
  s.addText("Pourquoi MQTT ?", { x: 0.8, y: 3.15, w: 3.8, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText([
    { text: "Protocole leger : ideal pour capteurs IoT", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Publish / Subscribe : decouplage producteur / consommateur", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "QoS 1 (donnees) + QoS 2 (alertes critiques)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "TLS natif sur port 8883 pour le chiffrement", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Wildcard iot/+/data capture toutes les zones en une seule subscription", options: { bullet: true, fontSize: 10 } },
  ], { x: 0.8, y: 3.5, w: 3.8, h: 1.6, fontFace: "Calibri", color: C.light, paraSpaceAfter: 3 });
}

// ============================================================
// SLIDE 7 - SIMULATION DES CAPTEURS
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("SIMULATION DES CAPTEURS", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  // Table of zones
  const simHeader = [
    { text: "Zone", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri" } },
    { text: "Capteurs", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri" } },
    { text: "Freq", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri", align: "center" } },
    { text: "Base", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri" } },
    { text: "Derive", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 11, fontFace: "Calibri" } },
  ];
  const simRows = [
    ["Salle Serveur", "Temp, Humidite", "5s", "T:24C, H:45%", "+0.005/cycle"],
    ["Atelier Tech.", "Vibration, Temp", "2s", "V:2.5mm/s, T:35C", "+0.003/cycle"],
    ["Local Elec.", "Luminosite, Temp", "10s", "L:200lux, T:30C", "+0.004/cycle"],
  ].map(r => r.map(c => ({ text: c, options: { fill: { color: C.darkCard }, color: C.light, fontSize: 10, fontFace: "Calibri" } })));

  s.addTable([simHeader, ...simRows], { x: 0.5, y: 1.1, w: 9.0, colW: [1.8, 2.0, 0.8, 2.2, 2.2], border: { pt: 0.5, color: "2A4A6B" }, rowH: 0.35 });

  // Behaviors cards
  s.addText("Comportements realistes", { x: 0.8, y: 2.7, w: 8.4, h: 0.4, fontSize: 16, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });

  const behaviors = [
    { title: "Bruit aleatoire", desc: "Variation naturelle des mesures a chaque lecture", col: C.teal },
    { title: "Derive progressive", desc: "Simulation de degradation (climatisation, roulements...)", col: C.orange },
    { title: "Spikes aleatoires", desc: "5% de chance de vibration extreme en atelier", col: C.red },
    { title: "Coupures", desc: "3% de chance de luminosite quasi-nulle (ampoule HS)", col: C.mint },
  ];
  behaviors.forEach((b, i) => {
    const xPos = 0.5 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 3.2, w: 2.1, h: 1.5, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 3.2, w: 2.1, h: 0.05, fill: { color: b.col } });
    s.addText(b.title, { x: xPos + 0.15, y: 3.35, w: 1.8, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: b.col, margin: 0 });
    s.addText(b.desc, { x: xPos + 0.15, y: 3.7, w: 1.8, h: 0.9, fontSize: 10, fontFace: "Calibri", color: C.light, margin: 0 });
  });

  // Code snippet
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.85, w: 9.0, h: 0.65, fill: { color: "0D1B2A" } });
  s.addText("let drift = Math.min(count * 0.005, 8);  let temp = 24 + (Math.random() * 5 - 2.5) + drift;", { x: 0.7, y: 4.9, w: 8.5, h: 0.55, fontSize: 10, fontFace: "Consolas", color: C.mint, margin: 0 });
}

// ============================================================
// SLIDE 8 - REGLES D'AUTOMATISATION
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("REGLES D'AUTOMATISATION", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  s.addText("6 regles | 2 niveaux WARNING & CRITIQUE | Notifications Telegram + Email implementees", { x: 0.8, y: 0.95, w: 8.4, h: 0.3, fontSize: 12, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });

  const ruleHeader = [
    { text: "#", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri", align: "center" } },
    { text: "Zone", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
    { text: "Condition", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
    { text: "Action", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
    { text: "Niveaux", options: { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, fontFace: "Calibri" } },
  ];
  const rules = [
    ["1", "Salle Serveur", "Temp > 28C", "Ventilation", "W:28 / C:32"],
    ["2", "Salle Serveur", "Humidite > 70%", "Deshumidificateur", "W:70 / C:85"],
    ["3", "Atelier", "Vibration > 5.0mm/s", "Arret machine", "W:5.0 / C:7.0"],
    ["4", "Atelier", "Temp > 40C", "Alerte surchauffe", "W:40 / C:45"],
    ["5", "Local Elec.", "Luminosite < 50 lux", "Eclairage auto", "W:50 / C:20"],
    ["6", "Local Elec.", "Temp > 35C", "Alerte armoire", "W:35 / C:40"],
  ].map(r => r.map((c, ci) => ({
    text: c,
    options: {
      fill: { color: ci === 0 ? C.card : C.darkCard },
      color: ci === 2 ? C.orange : ci === 3 ? C.mint : C.light,
      fontSize: 10, fontFace: "Calibri",
      bold: ci === 2 || ci === 3,
      align: ci === 0 ? "center" : "left"
    }
  })));

  s.addTable([ruleHeader, ...rules], { x: 0.5, y: 1.4, w: 9.0, colW: [0.5, 1.5, 2.0, 2.2, 1.5], border: { pt: 0.5, color: "2A4A6B" }, rowH: 0.38 });

  // Flow diagram
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.1, w: 9.0, h: 1.2, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addText("Schema de declenchement", { x: 0.8, y: 4.15, w: 3.0, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });
  s.addText("MQTT In (subscription)  \u2192  Switch (condition seuil)  \u2192  Function (alerte + action)  \u2192  MQTT Out (alertes/ + actions/)", { x: 0.8, y: 4.5, w: 8.5, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.light, margin: 0 });
  s.addText("QoS 2 pour les alertes (exactement une fois)  |  QoS 1 pour les actions (au moins une fois)", { x: 0.8, y: 4.85, w: 8.5, h: 0.3, fontSize: 10, fontFace: "Calibri", color: C.muted, italic: true, margin: 0 });
}

// ============================================================
// SLIDE 9 - SECURITE
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("SECURITE", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 1.2, h: 0.04, fill: { color: C.teal } });
  s.addText("Approche multicouche pour la protection des communications IoT", { x: 0.8, y: 0.95, w: 8.4, h: 0.3, fontSize: 12, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });

  const secItems = [
    { title: "Chiffrement TLS 1.2", desc: "Communications MQTT chiffrees sur le port 8883.\nCertificats X.509 auto-signes (CA + serveur + client)\navec Subject Alternative Names (SAN).", color: C.teal },
    { title: "Authentification", desc: "Acces anonyme desactive (allow_anonymous false).\nFichier de mots de passe hashes.\nUtilisateur dedie : iotuser.", color: C.orange },
    { title: "ACL (Controle d'acces)", desc: "Permissions par topic et par utilisateur.\niotuser : readwrite sur iot/#, alertes/#, actions/#\nAcces en lecture seule sur $SYS/#.", color: C.mint },
    { title: "Isolation & Secrets", desc: "Reseau Docker bridge dedie (iot-supervision-network).\nSecrets externalises dans .env (non commite).\nTokens API pour InfluxDB.", color: C.red },
  ];
  secItems.forEach((item, i) => {
    const xPos = (i % 2) * 4.6 + 0.5;
    const yPos = Math.floor(i / 2) * 1.85 + 1.4;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos, w: 4.3, h: 1.65, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos, w: 0.07, h: 1.65, fill: { color: item.color } });
    s.addText(item.title, { x: xPos + 0.25, y: yPos + 0.1, w: 3.8, h: 0.3, fontSize: 14, fontFace: "Calibri", bold: true, color: item.color, margin: 0 });
    s.addText(item.desc, { x: xPos + 0.25, y: yPos + 0.45, w: 3.8, h: 1.1, fontSize: 10, fontFace: "Calibri", color: C.light, margin: 0 });
  });
}

// ============================================================
// SLIDE 10 - DEMO GRAFANA avec graphique reel
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("DEMO LIVE : DASHBOARD GRAFANA", { x: 0.8, y: 0.15, w: 6.5, h: 0.6, fontSize: 28, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fill: { color: C.teal } });
  s.addText("http://localhost:3000", { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fontSize: 11, fontFace: "Consolas", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  // Real temperature chart using actual data
  s.addChart(pres.charts.LINE, [
    { name: "Atelier", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [40.9,41.3,41.1,40.7,41.2,41.2] },
    { name: "Local Elec.", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [33.6,33.3,33.2,32.8,33.1,33.5] },
    { name: "Salle Serveur", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [32.1,31.8,31.8,32.0,32.1,32.0] },
  ], {
    x: 0.5, y: 0.85, w: 5.5, h: 2.8,
    showTitle: true, title: "Temperatures par zone (donnees reelles)",
    titleColor: C.light, titleFontSize: 11,
    lineSize: 2, lineSmooth: true,
    chartColors: ["F43F5E", "F59E0B", "06B6D4"],
    chartArea: { fill: { color: C.darkCard }, roundedCorners: false },
    catAxisLabelColor: C.muted, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    valGridLine: { color: "2A4A6B", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true, legendPos: "b", legendColor: C.light, legendFontSize: 8,
    valAxisTitle: "Temperature (C)", valAxisTitleColor: C.muted, valAxisTitleFontSize: 8,
  });

  // Right panel - live stat values
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 0.85, w: 3.2, h: 2.8, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 0.85, w: 3.2, h: 0.05, fill: { color: C.cyan } });
  s.addText("Valeurs actuelles", { x: 6.5, y: 0.95, w: 2.8, h: 0.25, fontSize: 12, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });

  const liveVals = [
    { label: "Temp. Salle Serveur", val: "32.0 C", seuil: "seuil: 28C", danger: true },
    { label: "Humidite Salle Serveur", val: "50.1 %H", seuil: "seuil: 70%", danger: false },
    { label: "Vibration Atelier", val: "7.7 mm/s", seuil: "seuil: 5.0", danger: true },
    { label: "Temp. Atelier", val: "41.2 C", seuil: "seuil: 40C", danger: true },
    { label: "Luminosite Local Elec.", val: "112.8 lux", seuil: "seuil: <50", danger: false },
    { label: "Temp. Local Elec.", val: "33.5 C", seuil: "seuil: 35C", danger: false },
  ];
  liveVals.forEach((v, i) => {
    const yPos = 1.28 + i * 0.37;
    const bgCol = v.danger ? "7F1D1D" : "064E3B";
    s.addShape(pres.shapes.RECTANGLE, { x: 6.5, y: yPos, w: 2.8, h: 0.32, fill: { color: bgCol } });
    s.addText(v.label, { x: 6.55, y: yPos + 0.01, w: 1.5, h: 0.15, fontSize: 7, fontFace: "Calibri", color: C.light, margin: 0 });
    s.addText(v.val, { x: 8.0, y: yPos + 0.01, w: 0.8, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(v.seuil, { x: 6.55, y: yPos + 0.16, w: 1.4, h: 0.14, fontSize: 6, fontFace: "Calibri", color: C.muted, margin: 0 });
  });

  // Bottom - Demo steps
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.85, w: 9.0, h: 1.55, fill: { color: C.card }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.85, w: 9.0, h: 0.05, fill: { color: C.mint } });
  s.addText("SCENARIO DE DEMONSTRATION", { x: 0.8, y: 3.95, w: 4.0, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText("admin / Grafana2026Secure", { x: 7.0, y: 3.95, w: 2.5, h: 0.3, fontSize: 10, fontFace: "Consolas", color: C.cyan, align: "right", margin: 0 });
  s.addText([
    { text: "1. Ouvrir http://localhost:3000 et naviguer vers le dashboard IoT Supervision", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "2. Montrer la Vue Globale : 6 stat panels avec codes couleur (vert = OK, rouge = alerte)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "3. Scroller vers les Time Series : observer la derive progressive des temperatures", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "4. Montrer les Gauges en bas : visuellement les niveaux critiques (aiguille dans le rouge)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "5. Zoomer sur un graphe (cliquer-glisser) pour montrer les details, puis revenir", options: { bullet: true, fontSize: 10 } },
  ], { x: 0.8, y: 4.3, w: 8.5, h: 1.05, fontFace: "Calibri", color: C.light, paraSpaceAfter: 1 });
}

// ============================================================
// SLIDE 11 - DEMO GRAFANA DETAILS
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("GRAFANA : PANELS & ALERTES VISUELLES", { x: 0.8, y: 0.2, w: 8.4, h: 0.6, fontSize: 26, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.75, w: 2.5, h: 0.04, fill: { color: C.teal } });

  // Simulated stat panels row
  const statPanels = [
    { label: "Temp. SS", val: "28.6 C", color: C.red },
    { label: "Hum. SS", val: "45.5 %H", color: C.mint },
    { label: "Vib. AT", val: "6.32 mm/s", color: C.red },
    { label: "Temp. AT", val: "43.2 C", color: C.red },
    { label: "Lum. LE", val: "122 lux", color: C.mint },
    { label: "Temp. LE", val: "31.7 C", color: C.mint },
  ];
  statPanels.forEach((p, i) => {
    const xPos = 0.5 + i * 1.5;
    const bgColor = p.color === C.red ? "7F1D1D" : "064E3B";
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.0, w: 1.35, h: 0.9, fill: { color: bgColor } });
    s.addText(p.label, { x: xPos, y: 1.02, w: 1.35, h: 0.25, fontSize: 8, fontFace: "Calibri", color: C.light, align: "center", margin: 0 });
    s.addText(p.val, { x: xPos, y: 1.25, w: 1.35, h: 0.55, fontSize: 16, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
  });

  // Explanation
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 4.3, h: 1.3, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.1, w: 0.07, h: 1.3, fill: { color: C.mint } });
  s.addText("Code couleur", { x: 0.8, y: 2.15, w: 3.5, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText([
    { text: "Vert : Valeur dans la norme", options: { bullet: true, breakLine: true, fontSize: 11, color: C.mint } },
    { text: "Rouge : Seuil depasse - alerte", options: { bullet: true, breakLine: true, fontSize: 11, color: C.red } },
    { text: "Jaune : Approche du seuil", options: { bullet: true, fontSize: 11, color: C.orange } },
  ], { x: 0.8, y: 2.5, w: 3.8, h: 0.8, fontFace: "Calibri" });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.1, w: 4.3, h: 1.3, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 2.1, w: 0.07, h: 1.3, fill: { color: C.cyan } });
  s.addText("Types de panels", { x: 5.5, y: 2.15, w: 3.5, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });
  s.addText([
    { text: "Stat : Derniere valeur en grand", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Time Series : Courbe historique", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Gauge : Jauge avec zones colorees", options: { bullet: true, fontSize: 11 } },
  ], { x: 5.5, y: 2.5, w: 3.8, h: 0.8, fontFace: "Calibri", color: C.light });

  // Humidite chart - real data
  s.addChart(pres.charts.LINE, [
    { name: "Humidite Salle Serveur (%)", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [51.4,50.8,51.2,51.2,51.5,50.1] },
  ], {
    x: 0.5, y: 3.6, w: 4.3, h: 1.8,
    showTitle: true, title: "Humidite Salle Serveur (donnees reelles)", titleColor: C.light, titleFontSize: 9,
    lineSize: 2, lineSmooth: true, chartColors: ["06B6D4"],
    chartArea: { fill: { color: C.darkCard } },
    catAxisLabelColor: C.muted, catAxisLabelFontSize: 7,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 7,
    valGridLine: { color: "2A4A6B", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false,
  });

  // Provisioning
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.6, w: 4.3, h: 1.8, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.6, w: 0.07, h: 1.8, fill: { color: C.teal } });
  s.addText("Provisioning as Code", { x: 5.45, y: 3.65, w: 3.8, h: 0.25, fontSize: 12, fontFace: "Calibri", bold: true, color: C.teal, margin: 0 });
  s.addText([
    { text: "Datasource InfluxDB auto-configuree via YAML", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "Dashboard JSON 16+ panels pre-charges", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "Requetes Flux vers bucket 'sensors'", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "Rafraichissement auto toutes les 5 secondes", options: { bullet: true, breakLine: true, fontSize: 9 } },
    { text: "Zero configuration manuelle requise", options: { bullet: true, fontSize: 9 } },
  ], { x: 5.45, y: 3.95, w: 3.8, h: 1.35, fontFace: "Calibri", color: C.light });
}

// ============================================================
// SLIDE 12 - DEMO NODE-RED
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("DEMO LIVE : NODE-RED FLOWS", { x: 0.8, y: 0.15, w: 6.5, h: 0.6, fontSize: 28, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fill: { color: C.red } });
  s.addText("http://localhost:1880", { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fontSize: 11, fontFace: "Consolas", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  // 3 tabs - detailed
  const tabs = [
    { name: "1. Simulation Capteurs", desc: "3 zones industrielles simulees en temps reel", details: "Inject (5s/2s/10s) \u2192 Function JS \u2192 MQTT Out\n\nChaque zone genere des donnees JSON avec bruit aleatoire, derive progressive et evenements aleatoires (spikes, coupures).\n\nLes status sous les noeuds montrent les valeurs en direct.", col: C.mint, nodes: "9 noeuds" },
    { name: "2. Ingestion InfluxDB", desc: "Pipeline MQTT vers base de donnees", details: "MQTT In (iot/+/data) \u2192 Function (formatage) \u2192 InfluxDB Out\n\nLe wildcard '+' capture toutes les zones. La function transforme le JSON en format [fields, tags] compatible InfluxDB 2.x.\n\nMeasurement: capteurs_industriels", col: C.cyan, nodes: "4 noeuds" },
    { name: "3. Automatisation", desc: "6 regles d'alerte avec actions", details: "MQTT In \u2192 Switch (seuil) \u2192 Function (alerte) \u2192 MQTT Out x2\n\nChaque regle publie sur alertes/{zone}/{type} (QoS 2) et actions/{actionneur} (QoS 1).\n\nOuvrir le panneau Debug pour voir les alertes en direct.", col: C.orange, nodes: "24 noeuds" },
    { name: "4. Notifications", desc: "Telegram & Email en temps reel", details: "MQTT In (alertes/#) \u2192 Format Telegram \u2192 HTTP POST Bot API\n                       \u2192 Format Email HTML \u2192 Gmail SMTP\n\nAnti-spam : cooldown 5 min Telegram / 10 min Email.\nVariables dans .env : TELEGRAM_BOT_TOKEN, EMAIL_FROM/TO/PASS.\n\nNotification recue en moins de 2 secondes apres alerte.", col: C.red, nodes: "8 noeuds" },
  ];
  tabs.forEach((t, i) => {
    const xPos = 0.5 + i * 3.17;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 0.85, w: 2.97, h: 3.3, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 0.85, w: 2.97, h: 0.05, fill: { color: t.col } });
    s.addText(t.name, { x: xPos + 0.15, y: 0.98, w: 2.67, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: t.col, margin: 0 });
    s.addText(t.desc, { x: xPos + 0.15, y: 1.3, w: 2.67, h: 0.25, fontSize: 10, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.15, y: 1.6, w: 1.0, h: 0.02, fill: { color: t.col } });
    s.addText(t.details, { x: xPos + 0.15, y: 1.7, w: 2.67, h: 2.0, fontSize: 9, fontFace: "Calibri", color: C.light, margin: 0 });
    s.addText(t.nodes, { x: xPos + 0.15, y: 3.85, w: 2.67, h: 0.2, fontSize: 9, fontFace: "Calibri", bold: true, color: t.col, margin: 0 });
  });

  // Bottom - Demo scenario
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.35, w: 9.0, h: 1.1, fill: { color: C.card }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.35, w: 9.0, h: 0.05, fill: { color: C.mint } });
  s.addText("SCENARIO DE DEMONSTRATION", { x: 0.8, y: 4.45, w: 4.0, h: 0.25, fontSize: 12, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText([
    { text: "1. Onglet Simulation : montrer les valeurs en direct sous les noeuds (pastilles vertes = connecte)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "2. Onglet Automatisation : panneau Debug \u2192 alertes CRITIQUE/WARNING en temps reel", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "3. Onglet Notifications : montrer le message Telegram recu sur le telephone (< 2 secondes)", options: { bullet: true, fontSize: 10 } },
  ], { x: 0.8, y: 4.73, w: 8.5, h: 0.65, fontFace: "Calibri", color: C.light, paraSpaceAfter: 1 });
}

// ============================================================
// SLIDE 13 - DEMO INFLUXDB avec graphiques reels
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("DEMO LIVE : INFLUXDB DATA EXPLORER", { x: 0.8, y: 0.15, w: 6.5, h: 0.6, fontSize: 26, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fill: { color: C.cyan } });
  s.addText("http://localhost:8086", { x: 7.5, y: 0.2, w: 2.2, h: 0.45, fontSize: 11, fontFace: "Consolas", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  // Real vibration + luminosity charts
  s.addChart(pres.charts.BAR, [
    { name: "Vibration (mm/s)", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [7.7,7.6,7.6,7.7,7.6,7.7] },
  ], {
    x: 0.5, y: 0.85, w: 4.3, h: 2.0,
    showTitle: true, title: "Vibration Atelier (donnees reelles)", titleColor: C.light, titleFontSize: 10,
    barDir: "col", chartColors: ["F43F5E"],
    chartArea: { fill: { color: C.darkCard } },
    catAxisLabelColor: C.muted, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    valGridLine: { color: "2A4A6B", size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelColor: C.white, dataLabelFontSize: 8,
    showLegend: false,
  });

  s.addChart(pres.charts.LINE, [
    { name: "Luminosite (lux)", labels: ["-30m","-25m","-20m","-15m","-10m","-5m"], values: [134.9,126.5,118.7,118.4,106.8,112.8] },
  ], {
    x: 5.2, y: 0.85, w: 4.3, h: 2.0,
    showTitle: true, title: "Luminosite Local Elec. (donnees reelles)", titleColor: C.light, titleFontSize: 10,
    lineSize: 2, lineSmooth: true, chartColors: ["F59E0B"],
    chartArea: { fill: { color: C.darkCard } },
    catAxisLabelColor: C.muted, catAxisLabelFontSize: 8,
    valAxisLabelColor: C.muted, valAxisLabelFontSize: 8,
    valGridLine: { color: "2A4A6B", size: 0.5 }, catGridLine: { style: "none" },
    showLegend: false,
  });

  // Config + Query side by side
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.05, w: 4.3, h: 2.35, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.05, w: 0.07, h: 2.35, fill: { color: C.cyan } });
  s.addText("Configuration InfluxDB", { x: 0.8, y: 3.1, w: 3.8, h: 0.3, fontSize: 13, fontFace: "Calibri", bold: true, color: C.cyan, margin: 0 });
  s.addText("admin / Hackathon2026Secure", { x: 0.8, y: 3.4, w: 3.8, h: 0.2, fontSize: 9, fontFace: "Consolas", color: C.mint, margin: 0 });
  s.addText([
    { text: "Organisation : hackathon-iot", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Bucket : sensors", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Retention : 30 jours", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Measurement : capteurs_industriels", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Tags : zone (atelier, local-electrique, salle-serveur)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Fields : temperature, humidite, vibration, luminosite", options: { bullet: true, fontSize: 10 } },
  ], { x: 0.8, y: 3.65, w: 3.8, h: 1.6, fontFace: "Calibri", color: C.light });

  // Flux query
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 3.05, w: 4.3, h: 2.35, fill: { color: "0D1B2A" }, shadow: makeCardShadow() });
  s.addText("Requete Flux - Data Explorer", { x: 5.4, y: 3.1, w: 3.8, h: 0.3, fontSize: 12, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText('from(bucket: "sensors")\n  |> range(start: -1h)\n  |> filter(fn: (r) =>\n     r._measurement ==\n     "capteurs_industriels")\n  |> filter(fn: (r) =>\n     r._field == "temperature")\n  |> aggregateWindow(\n     every: 5m, fn: mean)', { x: 5.4, y: 3.45, w: 3.8, h: 1.8, fontSize: 9, fontFace: "Consolas", color: C.mint, margin: 0 });
}

// ============================================================
// SLIDE - RESULTATS & ALERTES DECLENCHEES
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("RESULTATS EN CONDITIONS REELLES", { x: 0.8, y: 0.2, w: 8.4, h: 0.6, fontSize: 28, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.78, w: 2.5, h: 0.04, fill: { color: C.teal } });
  s.addText("Apres 4h+ de fonctionnement continu — derive progressive observee", { x: 0.8, y: 0.88, w: 8.4, h: 0.28, fontSize: 11, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });

  // Chrono banner
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.22, w: 9.0, h: 0.45, fill: { color: C.card } });
  const timeline = [
    { t: "T+0h", label: "Demarrage\nValeurs normales", col: C.mint },
    { t: "T+1h", label: "Legere derive\nTemps montante", col: C.teal },
    { t: "T+2h", label: "1er WARNING\nSalle Serveur 28C", col: C.orange },
    { t: "T+3h", label: "CRITIQUE Atelier\nVibration > 5mm/s", col: C.red },
    { t: "T+4h+", label: "3 alertes CRITIQUE\nActives simultanement", col: C.red },
  ];
  timeline.forEach((tl, i) => {
    const xPos = 0.7 + i * 1.76;
    s.addText(tl.t, { x: xPos, y: 1.25, w: 1.5, h: 0.2, fontSize: 9, fontFace: "Calibri", bold: true, color: tl.col, align: "center", margin: 0 });
    s.addText(tl.label, { x: xPos, y: 1.45, w: 1.5, h: 0.18, fontSize: 7, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });
  });

  // Alert cards - 3 CRITIQUE + 1 WARNING
  const alerts = [
    { zone: "ATELIER", metric: "Temperature", val: "41.2 C", seuil: "seuil : 40 C", level: "CRITIQUE", action: "Arret machine declenche", topicMQTT: "alertes/atelier/temperature", col: C.red },
    { zone: "ATELIER", metric: "Vibration", val: "7.7 mm/s", seuil: "seuil : 5.0 mm/s", level: "CRITIQUE", action: "Arret machine declenche", topicMQTT: "alertes/atelier/vibration", col: C.red },
    { zone: "SALLE SERVEUR", metric: "Temperature", val: "32.0 C", seuil: "seuil : 28 C", level: "CRITIQUE", action: "Ventilation activee", topicMQTT: "alertes/salle-serveur/temperature", col: C.red },
    { zone: "LOCAL ELEC.", metric: "Temperature", val: "33.5 C", seuil: "seuil : 35 C", level: "OK", action: "Aucune action", topicMQTT: "—", col: C.mint },
  ];

  alerts.forEach((a, i) => {
    const xPos = 0.5 + i * 2.28;
    const bgCol = a.level === "CRITIQUE" ? "5C0A1A" : "064E3B";
    const borderCol = a.level === "CRITIQUE" ? C.red : C.mint;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.85, w: 2.12, h: 2.3, fill: { color: bgCol }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.85, w: 2.12, h: 0.06, fill: { color: borderCol } });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.1, y: 1.97, w: 1.92, h: 0.32, fill: { color: borderCol, transparency: 75 } });
    s.addText(a.level, { x: xPos + 0.1, y: 1.97, w: 1.92, h: 0.32, fontSize: 13, fontFace: "Calibri", bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
    s.addText(a.zone, { x: xPos + 0.1, y: 2.35, w: 1.92, h: 0.22, fontSize: 9, fontFace: "Calibri", bold: true, color: C.light, margin: 0 });
    s.addText(a.metric, { x: xPos + 0.1, y: 2.55, w: 1.92, h: 0.2, fontSize: 9, fontFace: "Calibri", color: C.muted, margin: 0 });
    s.addText(a.val, { x: xPos + 0.1, y: 2.75, w: 1.92, h: 0.35, fontSize: 20, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
    s.addText(a.seuil, { x: xPos + 0.1, y: 3.1, w: 1.92, h: 0.18, fontSize: 8, fontFace: "Calibri", color: C.muted, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.1, y: 3.3, w: 1.92, h: 0.02, fill: { color: borderCol, transparency: 50 } });
    s.addText(a.action, { x: xPos + 0.1, y: 3.35, w: 1.92, h: 0.22, fontSize: 8, fontFace: "Calibri", bold: true, color: borderCol, margin: 0 });
    s.addText(a.topicMQTT, { x: xPos + 0.1, y: 3.57, w: 1.92, h: 0.5, fontSize: 7.5, fontFace: "Consolas", color: C.muted, margin: 0 });
  });

  // Bottom summary
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9.0, h: 1.1, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9.0, h: 0.05, fill: { color: C.mint } });
  s.addText("Ce que ca demontre", { x: 0.8, y: 4.38, w: 3.0, h: 0.28, fontSize: 12, fontFace: "Calibri", bold: true, color: C.mint, margin: 0 });
  s.addText([
    { text: "Le pipeline IoT complet fonctionne de bout en bout en conditions reelles", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "La derive progressive simule fidelement une montee en charge industrielle (+7C sur l'atelier en 4h)", options: { bullet: true, breakLine: true, fontSize: 10 } },
    { text: "Les automatisations reagissent en temps reel (< 2s apres depassement de seuil)", options: { bullet: true, fontSize: 10 } },
  ], { x: 0.8, y: 4.65, w: 8.5, h: 0.7, fontFace: "Calibri", color: C.light, paraSpaceAfter: 1 });
}

// ============================================================
// SLIDE - DIFFICULTES & SOLUTIONS
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("DIFFICULTES & SOLUTIONS", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  const challenges = [
    { prob: "Git Bash path conversion", sol: "MSYS_NO_PATHCONV=1 pour les commandes Docker", col: C.orange },
    { prob: "Mosquitto 'Duplicate password_file'", sol: "password_file en scope global (pas par listener)", col: C.red },
    { prob: "Volume :ro bloque Mosquitto", sol: "Retrait du flag :ro sur config/certs", col: C.orange },
    { prob: "node-red-contrib-influxdb absent", sol: "npm install dans le conteneur Node-RED", col: C.teal },
    { prob: "Mauvais format donnees InfluxDB", sol: "Format [fields, tags] au lieu de [{measurement}]", col: C.red },
    { prob: "Grafana datasource non trouvee", sol: "Remplacement template var par UID fixe", col: C.orange },
    { prob: "Certificats TLS -subj Git Bash", sol: "Format //C=FR\\ST=IDF avec double-slash", col: C.teal },
  ];

  challenges.forEach((c, i) => {
    const yPos = 1.1 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9.0, h: 0.5, fill: { color: i % 2 === 0 ? C.darkCard : C.card } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 0.06, h: 0.5, fill: { color: c.col } });
    s.addText(c.prob, { x: 0.8, y: yPos + 0.05, w: 4.0, h: 0.4, fontSize: 10, fontFace: "Calibri", bold: true, color: C.red, margin: 0 });
    s.addText("\u2192  " + c.sol, { x: 4.8, y: yPos + 0.05, w: 4.5, h: 0.4, fontSize: 10, fontFace: "Calibri", color: C.mint, margin: 0 });
  });

  s.addText("Chaque difficulte a ete documentee et resolue methodiquement", { x: 0.5, y: 5.15, w: 9.0, h: 0.3, fontSize: 11, fontFace: "Calibri", italic: true, color: C.muted, align: "center", margin: 0 });
}

// ============================================================
// SLIDE 15 - EVOLUTIONS POSSIBLES
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addText("EVOLUTIONS POSSIBLES", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 30, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.teal } });

  const evols = [
    { phase: "COURT TERME", items: ["Interface de controle actionneurs", "Tableau de bord historique alertes", "Export CSV depuis Grafana"], col: C.teal },
    { phase: "MOYEN TERME", items: ["Capteurs reels (ESP32 + DHT22)", "Detection anomalies par ML", "Haute disponibilite InfluxDB"], col: C.orange },
    { phase: "LONG TERME", items: ["Migration cloud (AWS / Azure IoT)", "Integration ERP maintenance", "Jumeaux numeriques equipements"], col: C.mint },
  ];

  evols.forEach((e, i) => {
    const xPos = 0.5 + i * 3.17;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.2, w: 2.97, h: 3.8, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.2, w: 2.97, h: 0.06, fill: { color: e.col } });
    s.addText(e.phase, { x: xPos + 0.2, y: 1.4, w: 2.57, h: 0.4, fontSize: 15, fontFace: "Calibri", bold: true, color: e.col, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.2, y: 1.85, w: 1.0, h: 0.03, fill: { color: e.col } });

    e.items.forEach((item, j) => {
      s.addText(item, { x: xPos + 0.2, y: 2.1 + j * 0.9, w: 2.57, h: 0.7, fontSize: 12, fontFace: "Calibri", color: C.light, bullet: true, margin: 0 });
    });
  });
}

// ============================================================
// SLIDE 16 - CONCLUSION
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });

  s.addText("CONCLUSION", { x: 0.8, y: 0.2, w: 8.4, h: 0.7, fontSize: 32, fontFace: "Calibri", bold: true, color: C.white, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 0.85, w: 1.5, h: 0.04, fill: { color: C.teal } });

  s.addText("Tous les objectifs du cahier des charges atteints", { x: 0.8, y: 1.0, w: 8.4, h: 0.4, fontSize: 14, fontFace: "Calibri", italic: true, color: C.muted, margin: 0 });

  // Stats grid
  const stats = [
    { n: "3", label: "Zones\nsupervisees", col: C.teal },
    { n: "6", label: "Capteurs\ntemps reel", col: C.cyan },
    { n: "6", label: "Regles\nd'automatisation", col: C.orange },
    { n: "16+", label: "Panels\nGrafana", col: C.mint },
    { n: "4", label: "Services\nDocker", col: C.red },
    { n: "1", label: "Commande\npour deployer", col: C.teal },
  ];
  stats.forEach((st, i) => {
    const xPos = 0.5 + (i % 3) * 3.17;
    const yPos = 1.55 + Math.floor(i / 3) * 1.3;
    s.addShape(pres.shapes.RECTANGLE, { x: xPos, y: yPos, w: 2.97, h: 1.1, fill: { color: C.darkCard }, shadow: makeCardShadow() });
    s.addText(st.n, { x: xPos, y: yPos + 0.05, w: 1.0, h: 0.9, fontSize: 36, fontFace: "Calibri", bold: true, color: st.col, align: "center", valign: "middle", margin: 0 });
    s.addText(st.label, { x: xPos + 1.0, y: yPos + 0.15, w: 1.8, h: 0.8, fontSize: 12, fontFace: "Calibri", color: C.light, valign: "middle", margin: 0 });
  });

  // Key takeaways
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.25, w: 6.5, h: 1.1, fill: { color: C.card }, shadow: makeCardShadow() });
  s.addText([
    { text: "Architecture Edge-Fog-Cloud complete et fonctionnelle", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Securite multicouche : TLS 1.2 + Auth + ACL + Secrets .env", options: { bullet: true, breakLine: true, fontSize: 11 } },
    { text: "Solution modulaire, documentee et prete a evoluer vers des capteurs reels", options: { bullet: true, fontSize: 11 } },
  ], { x: 0.8, y: 4.3, w: 6.0, h: 1.0, fontFace: "Calibri", color: C.light, paraSpaceAfter: 2 });

  // GitHub badge
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 4.25, w: 2.3, h: 1.1, fill: { color: C.darkCard }, shadow: makeCardShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: 4.25, w: 2.3, h: 0.05, fill: { color: C.teal } });
  s.addText("Code source", { x: 7.3, y: 4.35, w: 2.1, h: 0.25, fontSize: 10, fontFace: "Calibri", bold: true, color: C.teal, align: "center", margin: 0 });
  s.addText("github.com/\nAbder541/\nHackathon-2026-IoT", { x: 7.3, y: 4.62, w: 2.1, h: 0.65, fontSize: 9, fontFace: "Consolas", color: C.cyan, align: "center", margin: 0 });
}

// ============================================================
// SLIDE 17 - MERCI & QUESTIONS
// ============================================================
{
  let s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.teal } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.teal } });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.5, w: 10, h: 2.8, fill: { color: C.darkBlue, transparency: 40 } });
  s.addText("MERCI", { x: 0.8, y: 1.6, w: 8.4, h: 1.0, fontSize: 54, fontFace: "Calibri", bold: true, color: C.white, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 2.55, w: 3.0, h: 0.04, fill: { color: C.teal } });
  s.addText("Questions ?", { x: 0.8, y: 2.7, w: 8.4, h: 0.7, fontSize: 28, fontFace: "Calibri", color: C.cyan, align: "center", margin: 0 });
  s.addText("Equipe 01 - Hackathon IoT 2026", { x: 0.8, y: 3.4, w: 8.4, h: 0.4, fontSize: 16, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });
  s.addText("Satom IT & Learning Solutions", { x: 0.8, y: 3.8, w: 8.4, h: 0.35, fontSize: 14, fontFace: "Calibri", color: C.muted, align: "center", italic: true, margin: 0 });

  // Access info
  s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 4.5, w: 7.0, h: 0.8, fill: { color: C.darkCard } });
  s.addText("Node-RED :1880  |  Grafana :3000  |  InfluxDB :8086  |  MQTT :1883 / :8883", { x: 1.5, y: 4.55, w: 7.0, h: 0.35, fontSize: 11, fontFace: "Consolas", color: C.teal, align: "center", margin: 0 });
  s.addText("docker compose up -d", { x: 1.5, y: 4.9, w: 7.0, h: 0.3, fontSize: 13, fontFace: "Consolas", color: C.mint, align: "center", bold: true, margin: 0 });
}

// ============================================================
// GENERATE
// ============================================================
const outputPath = process.argv[2] || "Hackathon_IoT_2026_Presentation.pptx";
pres.writeFile({ fileName: outputPath })
  .then(() => console.log("Presentation generee avec succes : " + outputPath))
  .catch(err => console.error("Erreur:", err));
