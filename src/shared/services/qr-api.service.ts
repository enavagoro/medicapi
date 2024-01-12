import fetch from 'node-fetch'
import * as dotenv from 'dotenv';

dotenv.config();
const qrServer = process.env.QR_SERVER || 'http://localhost:8080';

export const generateQR = async (data: string) => {
    const url: string = `/post-generate-qr?data=${data}`;
    const finalUrl = `${qrServer}${url}`;

    const response = await fetch(finalUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching QR code: ${response.statusText}`);
    }

    return await response.blob();
};
