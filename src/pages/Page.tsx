import type { SqlTag } from 'd1-sql-tag'
import {
	selectLatestEvents,
	selectLatestLogLines,
	selectProbeStatuses
} from '../db/statements'
import { EventHistory } from './EventHistory'
import { Logs } from './Logs'
import { ProbeOverview } from './ProbeOverview'
import { TimezoneSwitcher } from './TimezoneSwitcher'

export async function StatusPage({
	sql,
	timezone,
	enableExecuteAllProbes
}: {
	sql: SqlTag
	timezone: string
	enableExecuteAllProbes: boolean
}) {
	const [
		{ results: probeStatuses },
		{ results: events },
		{ results: logLines }
	] = await sql.batch([
		selectProbeStatuses(sql),
		selectLatestEvents(sql),
		selectLatestLogLines(sql)
	] as const)

	return (
		<html lang="en">
			<head>
				<title>simulation</title>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<meta name="description" content="Status page powered by dark magic" />
				<meta property="og:title" content="simulation" />
				<meta
					property="og:description"
					content="Status page powered by dark magic"
				/>
				<meta property="og:type" content="website" />
				<meta name="theme-color" content="#9EB1FF" />
				<link rel="stylesheet" href="/built.css" />
				<script src="/theme.js" />
			</head>

			<body>
				<main>
					<div class="flex flex-col w-full p-4 md:p-6">
						<header class="flex items-center h-16 mb-6">
							<h1 class="text-2xl font-bold">simulation 🛸</h1>
						</header>
						<div class="flex flex-col gap-6">
							<ProbeOverview
								probeStatuses={probeStatuses}
								timezone={timezone}
							/>
							<TimezoneSwitcher timezone={timezone} />
							<EventHistory events={events} timezone={timezone} />
							<Logs logLines={logLines} timezone={timezone} />
						</div>
					</div>
					<footer class="mt-4 w-full max-w-2xl p-4 text-center text-stone-800 dark:text-stone-400">
						<div class="flex justify-center space-x-2">
							<a href="https://github.com/fmhy/simulation" class="px-2">
								source
							</a>
							<span>•</span>
							<a href="https://discord.gg/Stz6y6NgNg" class="px-2">
								discord
							</a>
							<span>•</span>
							<a
								// biome-ignore lint: don't care
								onClick="window.toggleColorScheme()"
								type="button"
								class="px-2"
							>
								theme
							</a>
							{enableExecuteAllProbes && (
								<>
									<span>•</span>
									<button
										type="button"
										onClick="fetch('/api/execute-all-probes').then(res => res.text()).then(() => window.location.reload())"
									>
										Execute all probes
									</button>
								</>
							)}
						</div>
					</footer>
				</main>
			</body>
		</html>
	)
}
