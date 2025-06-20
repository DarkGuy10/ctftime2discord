import { ActionConfig, Event } from './types'
import { buildEmbed } from './buildEmbed'

export async function executeWebhook(eventData: Event[], config: ActionConfig) {
  const { webhookUrl, messageContent, appUsername, appAvatar } = config

  const body = {
    username: appUsername,
    avatar_url: appAvatar,
    content: messageContent,
    embeds: [buildEmbed(eventData, config)],
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'ctftime2discord/1',
    },
    body: JSON.stringify(body),
  })

  if (res.status !== 204) {
    throw new Error(`Discord webhook failed with response: ${await res.text()}`)
  }

  console.log('Webhook executed succesfully!')
}
