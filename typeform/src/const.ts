import { z } from '@botpress/sdk'

export const typeformWebhookEventSchema = z.object({
    event_id: z.string(),
    event_type: z.string(),
    form_response: z.object({
      form_id: z.string(),
      token: z.string(),
      submitted_at: z.string(), // ISO 8601 format
      landed_at: z.string(), // ISO 8601 format
      calculated: z.object({
        score: z.number()
      }).optional(),
      variables: z.array(
        z.object({
          key: z.string(),
          type: z.string(),
          number: z.number().optional(),
          text: z.string().optional()
        })
      ).optional(),
      hidden: z.object({
        conversation_id: z.string().optional()
      }).optional(),
      definition: z.object({
        id: z.string(),
        title: z.string(),
        fields: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            type: z.string(),
            ref: z.string(),
            allow_multiple_selections: z.boolean().optional(),
            allow_other_choice: z.boolean().optional(),
            choices: z.array(z.object({
              id: z.string(),
              label: z.string(),
              ref: z.string().optional()
            })).optional()
          })
        )
      }),
      answers: z.array(
        z.object({
          type: z.string(),
          text: z.string().optional(),
          choice: z.object({
            id: z.string().optional(),
            label: z.string(),
            ref: z.string().optional()
          }).optional(),
          choices: z.object({
            ids: z.array(z.string()).optional(),
            labels: z.array(z.string()).optional(),
            refs: z.array(z.string()).optional(),
            other: z.string().optional()
          }).optional(),
          boolean: z.boolean().optional(),
          number: z.number().optional(),
          date: z.string().optional(), // ISO 8601 format
          file_url: z.string().url().optional(),
          payment: z.object({
            amount: z.string(),
            last4: z.string(),
            name: z.string(),
            success: z.boolean()
          }).optional(),
          field: z.object({
            id: z.string(),
            type: z.string(),
            ref: z.string().optional()
          })
        })
      )
    })
  });