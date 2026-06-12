const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const fs = require('fs');

let ownerNumber = process.env.OWNER_NUMBER || '923060725589'; // یہاں اپنا نمبر لکھو بغیر + کے

async function connectBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRCode: false
    });

    if (!sock.authState.creds.registered) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const code = await sock.requestPairingCode(ownerNumber);
        console.log(`PAIRING CODE FOR ${ownerNumber} = ${code}`);
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') console.log('Bot Connected ✅');
    });
}

connectBot();
