import type { RowType } from 'd1-sql-tag'
import type { selectLatestEvents } from '../db/statements'
import { probeConfigs } from '../probes/configs'
import { formatDate, formatTime } from '../utils/date'
import { webhooksConfigs } from '../webhooks/webhook-configs'

export function EventHistory({
	events,
	timezone
}: {
	events: RowType<typeof selectLatestEvents>[]
	timezone: string
}) {
	const groups: Record<string, RowType<typeof selectLatestEvents>[]> = {}
	for (const event of events) {
		const date = formatDate(event.createdAt, timezone)
		if (!groups[date]) {
			groups[date] = []
		}
		groups[date].push(event)
	}

	return (
		<>
			<section class="border border-neutral-dark-10 dark:border-neutral-10 rounded-lg p-4 bg-neutral-3 text-neutral-12 dark:bg-neutral-dark-3 dark:text-neutral-dark-12">
				<h2 class="text-lg font-semibold mb-4">Recent</h2>
				{Object.entries(groups).map(([date, groupEvents]) => (
					<>
						<h1 class="text-lg font-medium underline">{date}</h1>
						{groupEvents.map((event) => {
							const source = event.probeId
								? probeConfigs.find((it) => it.id === event.probeId)
								: webhooksConfigs.find((it) => it.id === event.webhookId)
							return (
								<div class="py-2">
									<h3 class="text-sm font-medium">{source?.title}</h3>
									<p class="text-sm text-neutral-11 dark:text-neutral-dark-11 mt-1">
										{event.description
											? event.description
											: undefined || event.result === 'success'
											  ? 'All Systems Operational.'
											  : 'Service Outage.'}
										{' • '}
										{formatTime(event.createdAt, timezone)}
										{event.duration === null
											? undefined
											: ` • Took ${event.duration}ms`}
									</p>
								</div>
							)
						})}
					</>
				))}
			</section>
		</>
	)
}
