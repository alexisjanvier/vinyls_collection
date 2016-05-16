var apiPort = process.env.NODE_PORT || 3000; // eslint-disable-line no-var
var apiUrl = 'http://localhost:' + apiPort; // eslint-disable-line no-var
var frontendUrl = 'https://d1f32d9f.ngrok.io'; //'http://localhost:8080'; // eslint-disable-line no-var

module.exports = {
    appName: 'Vinyl collections',
    amazon: {
        AWS_TAG: 'levinylecolle-20', // alexisjanvier-21
        AWS_ID: 'AKIAI3GXCLDBKAVY3ROQ',
        AWS_SECRET: '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',
    },
    apps: {
        api: {
            allowOrigin: [frontendUrl, 'http://d1f32d9f.ngrok.io'],
            cookies: {
                secure: false,
                secureProxy: false,
                httpOnly: false,
                signed: false,
                overwrite: true,
            },
            db: {
                driver: 'pg',
                host: 'b2d',
                port: 5432,
                user: 'postgres',
                password: undefined,
                database: 'vinylecollection',
            },
            logs: {
                app: { Console: { timestamp: true, colorize: true, level: 'error' } },
                http: {},
            },
            port: apiPort,
            security: {
                bcrypt: {
                    salt_work_factor: 10, // higher is safer, but slower
                },
                expirationTokenDelay: 1800, // in seconds
                jwt: {
                    privateKey: 'MY-VERY-PRIVATE-KEY',
                },
                rateLimitOptions: {
                    auth: {
                        adapter: 'null',
                        duration: 60000,
                        max: 5,
                    },
                    api: {
                        adapter: 'null',
                        duration: 3600000,
                        max: 2500,
                    },
                },
                secret: 'MY-VERY-SECRET-CRYPTO-KEY-DIFFERENT-FROM-JWT',
                xdomain: {
                    master: {
                        base_url: frontendUrl,
                    },
                    slave: {
                        base_url: apiUrl,
                        debug: true,
                        path: '/xdomain',
                    },
                },
            },
        },
        frontend: {
            api_url: 'https://92097846.ngrok.io/api',
            enableDevTools: true,
        },
        admin: {
            api_url: 'https://92097846.ngrok.io/api',
        },
    },
    babel_ignore: /node_modules\/(?!admin-config|fakerest)/,
};
