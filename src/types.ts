interface Organizer {
  id: number
  name: string
}

interface Event {
  organizers: Organizer[]
  ctftime_url: string
  ctf_id: number
  weight: number
  duration: {
    hours: number
    days: number
  }
  live_feed: ''
  logo: string
  id: number
  title: number
  start: string
  participants: number
  location: string
  finish: string
  description: string
  format: string
  is_votable_now: boolean
  prizes: string
  format_id: number
  onsite: boolean
  restrictions: string
  url: string
  public_votable: boolean
}

interface ActionConfig {
  webhookUrl: string
  windowSize: number
  messageContent: string
  embedColor: number
  appUsername: string
  appAvatar: string
  footerText: string
  footerIcon: string
  filterOnline: boolean
}

export { Event, ActionConfig }
