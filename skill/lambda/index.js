/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const service =  require('./service.js')
const commonMessage = "O que você gostaria de fazer agora?"

const checkBills = {  
    canHandle(handlerInput) {  
        // Retorna o resultado da verificação
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'  
            && handlerInput.requestEnvelope.request.intent.name === 'bills';  
      },  
  async handle(handlerInput) {  
   
   let outputSpeech = '';
  
    await service.getRemoteData()  
      .then((response) => {  
        const data = JSON.parse(response);  
        outputSpeech = data;  
        
      })  
      .catch((err) => {  
        console.log(`ERROR: ${err.message}`);  
        outputSpeech = `Desculpe, não consegui obter os dados da conta. ${err.message} `;
      }); 
  
     return handlerInput.responseBuilder
      .speak(outputSpeech + commonMessage)
      .reprompt(commonMessage)
      .getResponse();
    },  
};  

const createBill = {
    canHandle(handlerInput) {  
      // Retorna o resultado da verificação
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'  
          && handlerInput.requestEnvelope.request.intent.name === 'createBill';  
    },  
    async handle(handlerInput) {  
        const slotValue = handlerInput.requestEnvelope.request.intent.slots.bill.value;
        
        let outputSpeech = '';
        
        await service.postRemoteData(slotValue).then((response) => {  
            const data = JSON.parse(response);  
            outputSpeech = data.message;  
        }).catch((err) => {  
            console.log(`ERROR: ${err.message}`);  
            outputSpeech = `Desculpe, não foi possível criar a conta. ${err.message} `;
        }); 
       
        return handlerInput.responseBuilder
        .speak(outputSpeech + commonMessage)
        .reprompt(commonMessage)
        .getResponse();
    
    },  
};

const updateBill = {
    canHandle(handlerInput) {  
      // Retorna o resultado da verificação
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'  
          && handlerInput.requestEnvelope.request.intent.name === 'updateBill';  
    },  
    async handle(handlerInput) {  
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
   
      const slotValue = handlerInput.requestEnvelope.request.intent.slots.bill.value;
      
      console.log(handlerInput.requestEnvelope.request.intent.slots)
      let outputSpeech = 'isso é um teste de update de conta: ' + sessionAttributes.favoriteColor+ ' ' + slotValue + ' ';

      return handlerInput.responseBuilder
        .speak(outputSpeech + commonMessage)
        .reprompt(commonMessage)
        .getResponse();
    
    },  
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = '';

        //ESTUDOS PARA ATRIBUIÇÃO DE VARIÁVEIS NA CONVERSA POR COMPLETO
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
        const favoriteColor = "blue"
        
        sessionAttributes.favoriteColor = favoriteColor;
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);


        return handlerInput.responseBuilder
        .speak(speakOutput + commonMessage)
        .reprompt(commonMessage)
        .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        checkBills,
        updateBill,
        createBill,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();