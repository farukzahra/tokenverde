const https = require('https');

const BACKEND_URL = 'https://tokenverde-backend.onrender.com';

function testBackend() {
  console.log('🔄 Testando backend no Render...');
  
  const options = {
    hostname: 'tokenverde-backend.onrender.com',
    port: 443,
    path: '/',
    method: 'GET',
    timeout: 30000
  };

  const req = https.request(options, (res) => {
    console.log(`📊 Status: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Resposta do backend:');
      console.log(data);
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erro ao conectar:', error.message);
  });

  req.on('timeout', () => {
    console.error('⏰ Timeout - Backend não respondeu em 30s');
    req.destroy();
  });

  req.setTimeout(30000);
  req.end();
}

function testLogin() {
  console.log('\n🔄 Testando login...');
  
  const postData = JSON.stringify({
    email: 'admin@tokenverde.com',
    password: 'admin123'
  });

  const options = {
    hostname: 'tokenverde-backend.onrender.com',
    port: 443,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 30000
  };

  const req = https.request(options, (res) => {
    console.log(`📊 Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Resposta do login:');
      console.log(data);
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erro no login:', error.message);
  });

  req.on('timeout', () => {
    console.error('⏰ Timeout no login');
    req.destroy();
  });

  req.setTimeout(30000);
  req.write(postData);
  req.end();
}

// Executar testes
testBackend();
setTimeout(testLogin, 2000); 