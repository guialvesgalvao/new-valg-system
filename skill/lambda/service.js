const https = require('https');
const http = require('http');

// Função para obter o cliente HTTP correto baseado no protocolo (https/http)
const getClient = () => {
  // Assumindo que estamos lidando com um protocolo HTTPS (como exemplo)
  return "https".startsWith('https') ? https : http;
};

/**
 * Realiza uma requisição GET para o servidor remoto.
 * @returns {Promise<string>} A resposta do servidor.
 */
const getRemoteData = async () => {
  const client = getClient(); // Escolher entre https ou http com base na URL
  const options = {
    hostname: 'new-valg-system-production.up.railway.app',
    path: '/bills?isOverdue=true&returnMode=text',  // URL de consulta
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',  // Cabeçalho para conteúdo JSON
    },
  };

  // Retorna uma Promise, mas com async/await para facilitar a leitura
  try {
    const response = await new Promise((resolve, reject) => {
      const request = client.get(options, (response) => {
        let data = '';

        // Acompanhar os dados da resposta
        response.on('data', (chunk) => {
          data += chunk;
        });

        // Ao finalizar a resposta, resolver a Promise
        response.on('end', () => {
          // Verificar o código de status e tratar erros
          if (response.statusCode < 200 || response.statusCode > 299) {
            reject(new Error(`Request failed with status code ${response.statusCode}`));
          }
          resolve(data);
        });
      });

      // Tratar erro de rede ou outros erros relacionados à requisição
      request.on('error', (err) => reject(err));
    });

    return response;
  } catch (error) {
    // Tratar erros gerais, como problemas de rede ou resposta inválida
    throw new Error(`Failed to fetch remote data: ${error.message}`);
  }
};

/**
 * Realiza uma requisição POST para o servidor remoto.
 * @param {string} slotValue O valor que será inserido no corpo da requisição.
 * @returns {Promise<string>} A resposta do servidor.
 */
const postRemoteData = async (slotValue) => {
  const client = getClient();  // Escolher entre https ou http
  const data = JSON.stringify({
    dataType: "text",
    data: `conta ${slotValue}`,  // Concatenar a string com o slotValue
  });

  const options = {
    hostname: 'new-valg-system-production.up.railway.app',
    path: '/bills',  // URL do endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Definir o tipo de conteúdo como JSON
      'Content-Length': Buffer.byteLength(data),  // Definir o comprimento do corpo
    },
  };

  // Retorna uma Promise, mas com async/await para simplificar a leitura
  try {
    const response = await new Promise((resolve, reject) => {
      const request = client.request(options, (response) => {
        let responseBody = '';

        // Acompanhar os dados da resposta
        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        // Ao finalizar a resposta, resolver a Promise
        response.on('end', () => {
          // Verificar o código de status e tratar erros
          if (response.statusCode < 200 || response.statusCode > 299) {
            reject(new Error(`Request failed with status code ${response.statusCode}`));
          }
          resolve(responseBody);
        });
      });

      // Tratar erro de rede ou outros erros relacionados à requisição
      request.on('error', (err) => reject(err));

      // Escrever o corpo da requisição
      request.write(data);

      // Finalizar a requisição
      request.end();
    });

    return response;
  } catch (error) {
    // Tratar erros gerais
    throw new Error(`Failed to post data: ${error.message}`);
  }
};

const putRemoteData = async (slotValue) => {
  const client = getClient();  // Escolher entre https ou http
  
  const data = JSON.stringify({
    data: slotValue,  // espera objeto de update
  });

  const options = {
    hostname: 'new-valg-system-production.up.railway.app',
    path: '/bills',  // URL do endpoint
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',  // Definir o tipo de conteúdo como JSON
      'Content-Length': Buffer.byteLength(data),  // Definir o comprimento do corpo
    },
  };

  // Retorna uma Promise, mas com async/await para simplificar a leitura
  try {
    const response = await new Promise((resolve, reject) => {
      const request = client.request(options, (response) => {
        let responseBody = '';

        // Acompanhar os dados da resposta
        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        // Ao finalizar a resposta, resolver a Promise
        response.on('end', () => {
          // Verificar o código de status e tratar erros
          if (response.statusCode < 200 || response.statusCode > 299) {
            reject(new Error(`Request failed with status code ${response.statusCode}`));
          }
          resolve(responseBody);
        });
      });

      // Tratar erro de rede ou outros erros relacionados à requisição
      request.on('error', (err) => reject(err));

      // Escrever o corpo da requisição
      request.write(data);

      // Finalizar a requisição
      request.end();
    });

    return response;
  } catch (error) {
    // Tratar erros gerais
    throw new Error(`Failed to post data: ${error.message}`);
  }
};

const findRemoteData = async (slotValue) => {
  const client = getClient();  // Escolher entre https ou http
  const data = JSON.stringify({
    data: slotValue,  // Concatenar a string com o slotValue
  });

  const options = {
    hostname: 'new-valg-system-production.up.railway.app',
    path: '/bills/finder',  // URL do endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Definir o tipo de conteúdo como JSON
      'Content-Length': Buffer.byteLength(data),  // Definir o comprimento do corpo
    },
  };

  // Retorna uma Promise, mas com async/await para simplificar a leitura
  try {
    const response = await new Promise((resolve, reject) => {
      const request = client.request(options, (response) => {
        let responseBody = '';

        // Acompanhar os dados da resposta
        response.on('data', (chunk) => {
          responseBody += chunk;
        });

        // Ao finalizar a resposta, resolver a Promise
        response.on('end', () => {
          // Verificar o código de status e tratar erros
          if (response.statusCode < 200 || response.statusCode > 299) {
            reject(new Error(`Request failed with status code ${response.statusCode}`));
          }
          resolve(responseBody);
        });
      });

      // Tratar erro de rede ou outros erros relacionados à requisição
      request.on('error', (err) => reject(err));

      // Escrever o corpo da requisição
      request.write(data);

      // Finalizar a requisição
      request.end();
    });

    return response;
  } catch (error) {
    // Tratar erros gerais
    throw new Error(`Failed to post data: ${error.message}`);
  }
};



// Exportação das funções para que possam ser usadas em outros módulos
module.exports = {
  getRemoteData,
  postRemoteData,
  findRemoteData,
  putRemoteData,
};
