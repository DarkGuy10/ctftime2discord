import { getInput, getBooleanInput, setFailed } from '@actions/core'
import { fetchEvents } from './fetchEvents'
import { executeWebhook } from './executeWebhook'
import { ActionConfig } from './types'

export async function run() {
  try {
    const webhookUrl = getInput('webhook_url', { required: true })
    const windowSize = parseInt(getInput('window_size', { required: true }), 10)
    const messageContent = getInput('message_content')
    const embedColor = parseInt(getInput('embed_color', { required: true }), 10)
    const appUsername = getInput('app_username', { required: true })
    const appAvatar = getInput('app_avatar')
    const footerText = getInput('footer_text')
    const footerIcon = getInput('footer_icon')
    const filterOnline = getBooleanInput('filter_online', {
      required: true,
    })

    const config: ActionConfig = {
      webhookUrl,
      windowSize,
      messageContent,
      embedColor,
      appAvatar,
      appUsername,
      footerIcon,
      footerText,
      filterOnline,
    }
    const eventData = await fetchEvents(windowSize, config)
    await executeWebhook(eventData, config)
  } catch (error) {
    setFailed(`Action failed with error ${error}`)
  }
}
