import * as core from '@actions/core'
import { fetchEvents } from './fetchEvents'
import { executeWebhook } from './executeWebhook'
import { ActionConfig } from './types'

export async function run() {
  try {
    const webhookUrl = core.getInput('webhook_url', { required: true })
    const windowSize = parseInt(
      core.getInput('window_size', { required: true }),
      10
    )
    const messageContent = core.getInput('message_content')
    const embedColor = parseInt(
      core.getInput('embed_color', { required: true }),
      10
    )
    const appUsername = core.getInput('app_username', { required: true })
    const appAvatar = core.getInput('app_avatar')
    const footerText = core.getInput('footer_text')
    const footerIcon = core.getInput('footer_icon')
    const filterOnline = core.getBooleanInput('filter_online', {
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
    core.setFailed(`Action failed with error ${error}`)
  }
}
