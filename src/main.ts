import * as core from '@actions/core'

/**
 * The main function for this action
 */
export async function run() {
	try {
		const webhookURL = core.getInput('webhook_url', { required: true })
		const windowSize = parseInt(core.getInput('window_size', { required: true }), 10)

		const windowStart = Date.now();
		const windowEnd = windowStart + (windowSize * 24 * 3600 * 1000)

		const res = await fetch(`https://ctftime.org/api/v1/events/?limit=100&start=${windowStart}&finish=${windowEnd}`)
		const data = await res.json()

		const params = {
			username: "My Webhook Name",
			avatar_url: "",
			content: "The message to send"
		}


		await fetch(webhookURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params)
		})

	} catch (error) {
		core.setFailed(`Action failed with error ${error}`)
	}
}
