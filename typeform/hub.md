
## What it is
A simply great integration to connect your Typeform account to your Botpress Bot. Send forms to users and receive an event with their responses when they are completed.

## How it works
The `Send Typeform Link` action can be used to create a new link to the form you wish to use. It requires a Conversation Id and Form URL. 

`Conversation Id` is a unique identifier for each conversation. You can pass {{event.conversationId}} into this field to embed your id. When receiving an Event you can use {{event.payload.conversation.id}} in the Advanced Options `Conversation ID` field of the `Typeform Event Trigger`. This will push the event to the appropriate conversation.

`Form URL` is url of the form you wish to use. You can find the link under `Share` -> `Copy Link`. Ensure that you have setup the hidden field from the Typeform setup to pass the conversation id.

You can see the full integration code at: https://github.com/SimplyGreatBots/typeform

## Typeform Setup
1. Go to your [Typeform Account](https://admin.typeform.com/user) and click on `Personal Access Tokens`.
2. Click on `Generate New Token`, name your token, and click `Generate Token`.
3. After the token is created, copy, and save it in a safe location. Proceed to the Botpress set up and then return for the final steps.
4. Create/Open the form that you wish to integrate with your bot and click `Connect` in the top menu.
5. Select the Webhooks option and click `Add a Webhook`.
6. Paste your Botpress Typeform Webhook URL into `Endpoint` field and click `Save Webhook`.
7. Click edit on your new Webhook and add Typeform Access token to the `Secret` field and save changes.
8. The final step is to setup a hidden field in your form with a conversation id. Click `Create` in the form -> `Logic` -> `Personalize With Data` -> `Hidden Fields`.
9. Click `Add new field` and name it exactly: `conversation_id`
10. Save and you are now setup to use the Botpress Typeform integration.

## Botpress Setup
1. Click `Install` on the top right and select your bot.
2. Click the popup that appears to configure your integration.
3. Add your Typeform access token to the `Access Token` field.
4. Enable and save the integration.
5. Copy your Webhook URL for the integration. This will be used in Step 6. of the Typeform setup.