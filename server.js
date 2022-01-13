const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const HASH_ALGO = 'sha256';
const PORT = process.env.PORT || 3000;
const PUBLIC_KEY = importPublicKey();

const app = express();
app.use(express.json());

app.post('/myhook', (req, res) => {
  const signature = req.get('X-Signature');
  const body = req.body;
  const isVerified = crypto.verify(
    HASH_ALGO,
    Buffer.from(JSON.stringify(body)),
    {
      key: PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    Buffer.from(signature, 'base64')
  );

  if (isVerified) {
    res.send(`Received verified message: ${body.message}`);
  } else {
    res.send('Unable to verify signature');
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

function importPublicKey() {
  const publicKeyFile = fs.readFileSync('public.key', 'utf8');
  return crypto.createPublicKey({
    key: publicKeyFile,
    format: 'pem',
    type: 'pkcs1'
  });
}
