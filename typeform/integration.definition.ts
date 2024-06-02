import { IntegrationDefinition, z } from '@botpress/sdk'
import { integrationName } from './package.json'

export default new IntegrationDefinition({
  name: integrationName,
  title: 'Typeform',
  description: 'This integration allows your bot to interact with Typeform to send and responsd to forms with your bot.',
  version: '0.0.1',
  readme: 'hub.md',
  icon: 'icon.svg',
  channels: {},
  configuration: {
    schema: z.object({
      accessToken: z.string().describe('Personal Access Token from Typeform'),
    }),
  },
  actions: {
    sendForm: {
      title: 'Send Typeform link',
      description: 'Send a Typeform link',
      input: {
        schema: z.object({
          conversationId: z.string().describe('ID of the conversation'),
          formUrl: z.string().describe('Url of the form'),
        }),
      },
      output: {
        schema: z.object({
          link: z.string().url().describe('URL for the typeform'),
        })
      },
    }
  },
  events: {
    typeformEvent: {
      title: 'Typeform Event',
      description: 'This event is received after a user fills out the form.',
      schema: z.object({
        conversation: z.object({
          id: z.string().describe('ID of the conversation'),
        }),
        data: z.record(z.any()),
      }).passthrough(),
    },
  },
})
