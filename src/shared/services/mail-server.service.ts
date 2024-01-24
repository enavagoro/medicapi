import fetch from 'node-fetch'
import * as dotenv from 'dotenv';
import { User } from '../types/types';

dotenv.config();
const mailServer = process.env.MAIL_SERVER || 'http://localhost:3000';
const nimaFront = process.env.NIMA_FRONT_URL || 'http://localhost:8100';

export const sendEmail = async (user: User) => {
    const url: string = `/recovery-password`;
    const finalUrl = `${mailServer}${url}`;

    const bodyObj = {
        username: user.name || '',
        email: user.email || '',
        url: `${nimaFront}/password-recovery/new?token=${user.recoverPasswordToken}`
    }

    const response = await fetch(finalUrl, {
        method: 'post',
        body: JSON.stringify(bodyObj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error sending email code: ${response.statusText}`);
    }

    return await response.text();
};