const { FB_TYPE } = process.env;
const { FB_PROJECT_ID } = process.env;
const { FB_PRIVATE_KEY_ID } = process.env;
const { FB_PRIVATE_KEY } = process.env;
const { FB_CLIENT_EMAIL } = process.env;
const { FB_CLIENT_ID } = process.env;
const { FB_AUTH_URI } = process.env;
const { FB_TOKEN_URI } = process.env;
const { FB_AUTH_PROVIDER_CERT_URL } = process.env;
const { FB_CLIENT_CERT_URL } = process.env;

const firebaseAdmin = require('firebase-admin');

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: FB_TYPE,
    project_id: FB_PROJECT_ID,
    private_key_id: FB_PRIVATE_KEY_ID,
    private_key: FB_PRIVATE_KEY ? FB_PRIVATE_KEY.replace(/\\n/gm, '\n') : undefined,
    client_email: FB_CLIENT_EMAIL,
    client_id: FB_CLIENT_ID,
    auth_uri: FB_AUTH_URI,
    token_uri: FB_TOKEN_URI,
    auth_provider_x509_cert_url: FB_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: FB_CLIENT_CERT_URL,

  }),
});

module.exports = admin;
