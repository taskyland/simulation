import type { RowType } from 'd1-sql-tag'
import type { selectProbeStatuses } from '../db/statements'
import { probeConfigs } from '../probes/configs'
import { ProbeCard } from './ProbeCard'

export function ProbeOverview({
	probeStatuses,
	timezone
}: {
	probeStatuses: RowType<typeof selectProbeStatuses>[]
	timezone: string
}) {
	return (
		<section class="grid gap-6 md:grid-cols-3">
			{probeConfigs.map((probeConfig) => {
				const status =
					probeStatuses.find((it) => it.id === probeConfig.id) ?? null
				return (
					<ProbeCard
						probeConfig={probeConfig}
						probeStatus={status}
						timezone={timezone}
					/>
				)
			})}
		</section>
	)
}
