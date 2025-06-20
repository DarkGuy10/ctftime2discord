import { ActionConfig, Event } from './types'
import { getTimestamp } from './utils'

export function buildEmbed(eventData: Event[], config: ActionConfig) {
  const { footerIcon, footerText, embedColor } = config

  const description = eventData
    .map(({ title, start, finish, url, description, ctftime_url, weight }) => {
      const startTS = getTimestamp(new Date(start))
      const finishTS = getTimestamp(new Date(finish))

      const discordInviteRegex = new RegExp(
        /https:\/\/discord.gg\/[0-9a-zA-Z]+/m
      )
      const discordInvite = description.match(discordInviteRegex)

      const entry =
        `- [**${title}**](${url}): <t:${startTS}> to <t:${finishTS}>\n` +
        `${description.split('\n')[0]}` +
        `Weight: ${weight}\n` +
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
