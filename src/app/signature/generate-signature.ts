// Secret key (private key) yang diberikan oleh BST
const privateKey = 'TEST-PRIV-ZU9JYV';

// Public key (identifier) yang diberikan oleh BST
const publicKey = 'TEST-PUB-AYEDA2';

const generateSignature = (): any => {
    const CryptoJS = require('crypto-js');
    const timestamp = Math.floor(Date.now() / 1000);
    const serializedData = JSON.stringify({title: "ATV"}); // body/query paramater
    const signature = CryptoJS.HmacSHA256(serializedData, privateKey).toString(CryptoJS.enc.Hex);
    return `${signature} ~ ${timestamp}`
  };