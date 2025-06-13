import { ActionConfig, type Event } from './types'
import { getTimestamp } from './utils'

export async function fetchEvents(windowSize: number, config: ActionConfig) {
  const windowStart = getTimestamp(new Date())
  const windowEnd = windowStart + windowSize * 24 * 3600

  const res = await fetch(
    `https://ctftime.org/api/v1/events/?limit=100&start=${windowStart}&finish=${windowEnd}`
  )

  if (res.status !== 200) {
    throw new Error(`Ctftime api failed with response: ${await res.text()}`)
  }

  let events = (await res.json()) as Event[]
  if (config.filterOnline) events = events.filter(e => !e.onsite)
  console.log(`Fetched ${events.length} events`)
  return events
}
