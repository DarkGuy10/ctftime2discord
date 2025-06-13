import { ActionConfig, Event } from './types'
import { getTimestamp } from './utils'

function buildEmbed(eventData: Event[], config: ActionConfig) {
  const { footerIcon, footerText, embedColor } = config

  const description = eventData
    .map(({ title, start, finish, url, description, ctftime_url }) => {
      const startTS = getTimestamp(new Date(start))
      const finishTS = getTimestamp(new Date(finish))

      const discordInviteRegex = new RegExp(
        /https:\/\/discord.gg\/[0-9a-zA-Z]+/m
      )
      const discordInvite = description.match(discordInviteRegex)

      const entry =
        `- [**${title}**](${url}): <t:${startTS}> to <t:${finishTS}>\n` +
        `${description.split('\n')[0]}` +
        `-# [[ CTFtime Link ]](${ctftime_url})    ` +
        (discordInvite ? `[[ Discord Server ]](${discordInvite[0]})` : '')
      return entry
    })
    .join('\n\n')

  let embed = {
    title: 'Upcoming CTF Events!',
    type: 'rich',
    description,
    timestamp: new Date().toISOString(),
    footer: {
      text: footerText,
      icon_url: footerIcon,
    },
    author: {
      name: 'ctftime2discord',
      url: 'https://github.com/DarkGuy10/ctftime2discord',
    },
    color: embedColor,
  }
  return embed
}

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
