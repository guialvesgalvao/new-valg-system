const https = require('https');
const http = require('http');
const { hostname } = require('os');

// Constante para o hostname
const HOSTNAME = 'new-valg-system-production.up.railway.app';

/**
 * Seleciona o cliente HTTP adequado com base no protocolo da URL.
 * @param {string} protocol - O protocolo da URL (http ou https).
 * @returns {http | https} O cliente HTTP correspondente.
 */
const getClient = (protocol) => (protocol === 'https' ? https : http);

/**
 * Faz uma requisição HTTP genérica.
 * @param {Object} options - As opções da requisição.
 * @param {Object} [data] - O corpo da requisição (caso aplicável).
 * @returns {Promise<string>} A resposta do servidor.
 */
const makeRequest = async (options, data = null) => {
  const client = getClient(options.protocol || 'https');

  return new Promise((resolve, reject) => {
    const request = client.request(options, (response) => {
      let responseBody = '';

      response.on('data', (chunk) => {
        responseBody += chunk;
      });

      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error(`Request failed with status code ${response.statusCode}: ${responseBody}`));
        } else {
          resolve(responseBody);
        }
      });
    });

    request.on('error', (err) => reject(new Error(`Network error: ${err.message}`)));

    if (data) {
      request.write(data);
    }
    request.end();
  });
};

/**
 * Realiza uma requisição GET ao servidor remoto.
 * @returns {Promise<string>} A resposta do servidor.
 */
const getRemoteData = async (token) => {
  const options = {
    hostname: HOSTNAME,
    path: '/bills?isOverdue=true&returnMode=text',
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` },
  };

  return makeRequest(options);
};

/**
 * Realiza uma requisição POST ao servidor remoto.
 * @param {string} slotValue - O valor que será inserido no corpo da requisição.
 * @returns {Promise<string>} A resposta do servidor.
 */
const postRemoteData = async (slotValue, token) => {
  const data = JSON.stringify({
    dataType: 'text',
    data: `conta ${slotValue}`,
  });

  const options = {
    hostname: HOSTNAME,
    path: '/bills',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    },
  };

  return makeRequest(options, data);
};

/**
 * Realiza uma requisição PUT ao servidor remoto.
 * @param {Object} slotValue - Os dados para atualizar.
 * @returns {Promise<string>} A resposta do servidor.
 */
const putRemoteData = async (slotValue, token) => {
  const data = JSON.stringify({ data: slotValue });

  const options = {
    hostname: HOSTNAME,
    path: '/bills',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    },
  };

  return makeRequest(options, data);
};

/**
 * Realiza uma busca no servidor remoto com base no valor fornecido.
 * @param {string} slotValue - O valor de busca.
 * @returns {Promise<string>} A resposta do servidor.
 */
const findRemoteData = async (slotValue, token) => {
  const data = JSON.stringify({ data: slotValue });

  const options = {
    hostname: HOSTNAME,
    path: '/bills/finder',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    },
  };

  return makeRequest(options, data);
};

const authenticateData = async (amazonId) => {
  const options = {
    hostname: "hopeful-imagination-production.up.railway.app",
    path: `/auth/get-amazon-userid-by-amazonuserid?&amazonUserId=${amazonId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  return makeRequest(options);
};

const setAmazonIdAccount = async (amazonId, otp) => {
  const data = JSON.stringify({
    amazonUserId: amazonId,
    OTPCode: otp,
  });

  const options = {
    hostname: 'hopeful-imagination-production.up.railway.app',
    path: '/auth/register-amazonuserid',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return makeRequest(options, data);
}

// Exporta as funções para uso em outros módulos
module.exports = {
  getRemoteData,
  postRemoteData,
  putRemoteData,
  findRemoteData,
  authenticateData,
  setAmazonIdAccount,
};
