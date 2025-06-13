import * as core from '@actions/core'
import { fetchEvents } from './fetchEvents'
import { executeWebhook } from './executeWebhook'

export async function run() {
  try {
    const webhookURL = core.getInput('webhook_url', { required: true })
    const windowSize = parseInt(
      core.getInput('window_size', { required: true }),
      10
    )
    const messageContent = core.getInput('message_content')

    const eventData = await fetchEvents(windowSize)
    await executeWebhook(webhookURL, eventData, messageContent)
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`)
  }
}
