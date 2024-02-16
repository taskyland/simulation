import { clsx } from 'clsx'
import type { RowType } from 'd1-sql-tag'
import type { selectProbeStatuses } from '../db/statements'
import type { ProbeConfig } from '../probes/types'
import { formatDateTime } from '../utils/date'

export function ProbeCard({
	probeConfig,
	probeStatus,
	timezone
}: {
	probeConfig: ProbeConfig
	probeStatus: RowType<typeof selectProbeStatuses> | null
	timezone: string
}) {
	let statusText: string
	let statusColor: string
	let statusDesc: string
	switch (probeStatus?.lastResult) {
		case 'failure':
			statusText = 'Failure'
			statusDesc = probeStatus.lastFailureAt
				? `Service is down. Last failure ${formatDateTime(
						probeStatus.lastFailureAt,
						timezone
				  )}`
				: 'No downtimes yet.'
			statusColor = 'bg-red-400'
			break

		case 'success':
			statusText = 'Operational'
			statusDesc = probeStatus.lastSuccessAt
				? `No issues reported. Last success ${formatDateTime(
						probeStatus.lastSuccessAt,
						timezone
				  )}`
				: 'No success yet.'
			statusColor = 'bg-green-400'
			break

		default:
			statusText = 'Unknown'
			statusDesc = 'Not known yet.'
			statusColor = 'bg-yellow-400'
			break
	}

	return (
		<div class="flex flex-col border border-neutral-600 rounded-lg p-4 bg-neutral-800">
			<h2 class="text-lg font-semibold mb-2">
				{probeConfig.url ? (
					<a class="underline underline-offset-4" href={probeConfig.url}>
						{probeConfig.title}
					</a>
				) : (
					probeConfig.title
				)}
			</h2>
			<div class="flex items-center gap-2">
				<span class={clsx('inline-flex w-3 h-3 rounded-full', statusColor)} />
				<span>{statusText}</span>
			</div>
			<p class="text-sm text-neutral-500 mt-2">{statusDesc}</p>
		</div>
	)
}
