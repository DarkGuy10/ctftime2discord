import { type Event } from './types'
import { getTimestamp } from './utils'

export async function fetchEvents(windowSize: number) {
	const windowStart = getTimestamp(new Date())
	const windowEnd = windowStart + windowSize * 24 * 3600

	console.log(
		`https://ctftime.org/api/v1/events/?limit=100&start=${windowStart}&finish=${windowEnd}`
	)
	const res = await fetch(
		`https://ctftime.org/api/v1/events/?limit=100&start=${windowStart}&finish=${windowEnd}`
	)
	const allEvents = (await res.json()) as Event[]
	const filteredEvents = allEvents.filter(e => !e.onsite)
	console.log(
		`Fetched ${allEvents.length} events, out of which ${filteredEvents.length} are online.`
	)
	return filteredEvents
}
