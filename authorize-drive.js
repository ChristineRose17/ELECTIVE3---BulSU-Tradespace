const fs = require('fs');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

/**
 * Authorizes Google account using @google-cloud/local-auth
 * and saves the resulting token to token.json.
 */
async function authorize() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error('Error: OAuth client credentials file not found.');
    console.error(`Expected file location: ${CREDENTIALS_PATH}`);
    console.error('Please download your OAuth client credentials JSON from Google Cloud Console, rename it to "credentials.json", and place it in the project root directory.');
    process.exit(1);
  }

  try {
    console.log('Starting Google OAuth authorization flow...');
    console.log(`Scope: ${SCOPES.join(' ')}`);
    console.log('A browser window will open automatically. Please sign in and grant the requested permissions.');

    const client = await authenticate({
      keyfilePath: CREDENTIALS_PATH,
      scopes: SCOPES,
    });

    if (!client || !client.credentials) {
      throw new Error('Authentication succeeded but failed to receive credentials.');
    }

    // Read client keys to ensure token.json contains authorized_user schema
    const credentialsContent = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    const parsedCredentials = JSON.parse(credentialsContent);
    const keys = parsedCredentials.installed || parsedCredentials.web;

    const tokenData = {
      type: 'authorized_user',
      client_id: keys ? keys.client_id : undefined,
      client_secret: keys ? keys.client_secret : undefined,
      refresh_token: client.credentials.refresh_token,
      access_token: client.credentials.access_token,
      scope: client.credentials.scope,
      token_type: client.credentials.token_type,
      expiry_date: client.credentials.expiry_date,
    };

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenData, null, 2), {
      encoding: 'utf8',
      mode: 0o600,
    });

    console.log('Authorization completed successfully!');
    console.log('Token successfully generated and saved to token.json.');
  } catch (error) {
    console.error('Authorization failed:', error.message || error);
    process.exit(1);
  }
}

authorize();
