/**
 * Node-RED Settings - Hackathon IoT 2026
 * Supervision Industrielle
 */
module.exports = {
    flowFile: 'flows.json',

    // Désactivation du chiffrement des credentials pour le hackathon
    // En production : utiliser une clé secrète via variable d'environnement
    credentialSecret: false,

    uiPort: process.env.PORT || 1880,

    diagnostics: {
        enabled: true,
        ui: true
    },

    runtimeState: {
        enabled: false,
        ui: false
    },

    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },

    exportGlobalContextKeys: false,

    editorTheme: {
        projects: {
            enabled: false
        },
        page: {
            title: "IoT Supervision - Hackathon 2026"
        },
        header: {
            title: "IoT Supervision Industrielle"
        }
    },

    functionGlobalContext: {
        env: process.env
    },

    contextStorage: {
        default: {
            module: "memory"
        },
        persistent: {
            module: "localfilesystem"
        }
    }
};
