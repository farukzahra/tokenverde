const https = require('https');

const options = {
  hostname: 'tokenverde-backend.onrender.com',
  port: 443,
  path: '/',
  method: 'GET',
  timeout: 30000
};

console.log('🔄 Testando backend no Render...');
console.log('URL: https://tokenverde-backend.onrender.com');

const req = https.request(options, (res) => {
  console.log(`✅ Status: ${res.statusCode}`);
  console.log(`📋 Headers:`, res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Resposta:');
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error('❌ Erro:', error.message);
});

req.on('timeout', () => {
  console.error('⏰ Timeout após 30 segundos');
  req.destroy();
});

req.setTimeout(30000);
req.end(); 