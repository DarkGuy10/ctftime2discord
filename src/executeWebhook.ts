import { Event } from './types'
import { getTimestamp } from './utils'

function buildEmbed(eventData: Event[]) {
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
				(discordInvite ? `[[ Discord Server ]](${url})` : '')
			return entry
		})
		.join('\n\n')

	const embed = {
		title: 'Upcoming CTF Events!',
		type: 'rich',
		description,
		timestamp: new Date().toISOString(),
		footer: {
			text: 'Doggo fetched everything very fast',
			icon_url: 'https://i.imgur.com/cuEp3vr.gif',
		},
		color: 9419963,
	}
	return embed
}

export async function executeWebhook(
	webhookURL: string,
	eventData: Event[],
	messageContent: string
) {
	const body = {
		username: 'Watch Doggo',
		avatar_url: 'https://i.imgur.com/cuEp3vr.gif',
		content: messageContent,
		embeds: [buildEmbed(eventData)],
	}

	await fetch(webhookURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': 'ctftime2discord/1',
		},
		body: JSON.stringify(body),
	})
	console.log('Webhook executed sent succesfully!')
}
