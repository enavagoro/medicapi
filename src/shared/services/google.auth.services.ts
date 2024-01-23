import * as dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client'

dotenv.config()

const clientId = process.env.GOOGLE_CLIENT_ID || '';
const redirectUri = process.env.GOOGLE_REDIRECT_URI || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

const client: any = new OAuth2Client({
    clientId,
    redirectUri,
    clientSecret
});

export const logGoogle = async () => {
    const authUrl = await client.generateAuthUrl({
        scope: ['profile', 'email'],
        redirect_uri: client.redirect_uri, 
    });
    return authUrl;
}

export const logGoogleCallback = async (code: string | undefined) => {
    const getTokenResponse: GetTokenResponse = await client.getToken(code);
    const tokens = getTokenResponse.tokens;

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    return payload;
}