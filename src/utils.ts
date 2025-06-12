export function getTimestamp(date: Date) {
	const ts = Math.round(date.getTime() / 1000)
	return ts
}
