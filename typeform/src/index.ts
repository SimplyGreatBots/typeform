import * as sdk from '@botpress/sdk'
import * as bp from '.botpress'
import { typeformWebhookEventSchema } from './const'

const crypto = require('crypto')
type sendFormOutput = bp.actions.sendForm.output.Output

export default new bp.Integration({
  register: async () => {
  },
  unregister: async () => {
  },
  actions: {
    sendForm: async (args): Promise<sendFormOutput> => {

      const conversationId = args.input.conversationId
      const formUrl = args.input.formUrl

      try {
        const typeformUrl = new URL(formUrl);
    
        const hashParams = new URLSearchParams(typeformUrl.hash.substring(1));
        hashParams.set('conversation_id', conversationId);
        typeformUrl.hash = hashParams.toString();
    
        return { link: typeformUrl.href };
      } catch (error: any) {
        throw new sdk.RuntimeError('Could not generate Typeform link. Ensure the URL is a valid Typeform URL with Conversation Id as a hash parameter.')
      }
    }
  },
  channels: {},
  handler: async ({ req, client, logger, ctx }) => { 
    const bodyObject = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const parsedData = typeformWebhookEventSchema.safeParse(bodyObject)

    logger.forBot().info('Received Typeform webhook event:', bodyObject)
  
    if (!parsedData.success) {
      logger.forBot().error('Invalid Typeform webhook event:', parsedData.error)
      throw new sdk.RuntimeError('Invalid Typeform webhook event')
    }

    const secret = ctx.configuration.accessToken
    const signature = req.headers['typeform-signature'];
    
    if (!signature) {
      logger.forBot().error('Missing Typeform signature header')
      throw new sdk.RuntimeError('Missing Typeform signature header. Ensure you have added a secret key in the Typeform webhook.')
    }
    
    if (!verifySignature(signature, req.body, secret)) {
      logger.forBot().error('Typeform secret does not match Botpress token. Verify your secret key.');
      throw new sdk.RuntimeError('Typeform secret does not match Botpress token. Verify your secret key.');
    }

    const form_response = parsedData.data.form_response
    const hiddenVars = form_response.hidden || {}
    const conversationId = hiddenVars.conversation_id
  
    if (conversationId) {
      try {
        const event = await client.createEvent({
          type: 'typeformEvent',
          conversationId: conversationId,
          payload: {
            conversation: {
              id: conversationId
            },
            data: form_response
          },
        });
        logger.forBot().info('Typeform event created successfully.')
      } catch (error) {
        logger.forBot().error('Failed to create Typeform event:', error)
        throw new sdk.RuntimeError('Failed to create Typeform event. Check integration logger for more details.')
      }
    } else {
      logger.forBot().warn('Could not find matching conversation ID. Ensure you are passing {{event.conversationId}} into your Send Typeform link.')
      throw new sdk.RuntimeError('Could not find matching conversation ID. Ensure you are passing {{event.conversationId}} into your Send Typeform link.')
    }
  },
})

const verifySignature = (receivedSignature: string, payload: any, secret: string) => {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');
  return receivedSignature === `sha256=${hash}`;
}