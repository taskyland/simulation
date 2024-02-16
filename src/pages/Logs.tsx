import type { RowType } from 'd1-sql-tag'
import type { selectLatestLogLines } from '../db/statements'
import { formatDateTime } from '../utils/date'

export function Logs({
	logLines,
	timezone
}: {
	logLines: RowType<typeof selectLatestLogLines>[]
	timezone: string
}) {
	if (logLines.length === 0) {
		return <></>
	}
	return (
		<section class="border border-neutral-800 rounded-lg p-4 bg-neutral-800">
			<h2 class="text-lg font-semibold mb-4">Logs</h2>
			{logLines.map((logLine) => {
				return (
					<div class="py-2">
						<h3 class="text-sm font-medium">
							{formatDateTime(logLine.createdAt, timezone)}
						</h3>
						<p class="text-sm text-neutral-500 mt-1">{logLine.level}</p>
						<p class="text-sm text-neutral-500 mt-1">{logLine.message}</p>
					</div>
				)
			})}
		</section>
	)
}
