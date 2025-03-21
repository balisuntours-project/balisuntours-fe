"use client"
import { useState } from 'react';

export default function SignaturePage() {
  const [response, setResponse] = useState<string | null>(null);

  // Secret key (private key) yang diberikan oleh server
  const privateKey = 'TEST-PRIV-ZU9JYV';

  // Public key (identifier) yang diberikan oleh server
  const publicKey = 'TEST-PUB-AYEDA2';

  // Fungsi untuk generate signature
  const generateSignature = (data: object, privateKey: string, timestamp: number): any => {
    const CryptoJS = require('crypto-js');
    const serializedData = JSON.stringify(data);
    const signature = CryptoJS.HmacSHA256(serializedData, privateKey).toString(CryptoJS.enc.Hex);
    window.alert(signature + " " + timestamp)
  };

  // Fungsi untuk mengirim request ke server
  const sendRequest = async () => {
    try {
      // Data yang akan dikirim
      const requestData = {
        title: "atv"
      }

      // Tambahkan timestamp ke data
      const timestamp = Math.floor(Date.now() / 1000);
      const dataWithTimestamp = { ...requestData, timestamp };

      // Generate signature
      const signature = generateSignature(dataWithTimestamp, privateKey, timestamp);
      return signature
      // Kirim request ke server
    //   const response = await fetch('/api/your-endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'BST-Signature': signature,
    //       'BST-Timestamp': timestamp,
    //       'BST-Public-Key': publicKey,
    //     },
    //     body: JSON.stringify(requestData),
    //   });

    //   // Handle response dari server
    //   const result = await response.json();
    //   setResponse(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while sending request.');
    }
  };

  return (
    <div>
      <h1>Signature Page</h1>
      <button onClick={sendRequest}>Send Request</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}