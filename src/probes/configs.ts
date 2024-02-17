import { probeHttp } from './probeHttp'
import type { ProbeConfig } from './types'

// Must match the cron expressions in wrangler.toml
const cronHourly = '0 * * * *'

export const probeConfigs: ProbeConfig[] = [
	{
		id: 'site',
		title: 'Website',
		url: 'https://fmhy.net',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) => probeHttp(context, 'https://fmhy.net')
	},

	{
		id: 'searx',
		title: 'SearX',
		url: 'https://searx.fmhy.net',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) => probeHttp(context, 'https://searx.fmhy.net/healthz')
	},
	{
		id: 'whoogle',
		title: 'Whoogle',
		url: 'https://whoogle.fmhy.net',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) => probeHttp(context, 'https://whoogle.fmhy.net')
	},
	{
		id: 'survival',
		title: 'Dynmap (Survival)',
		url: 'https://survival.dynmap.fmhy.net',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) => probeHttp(context, 'https://survival.dynmap.fmhy.net')
	},
	{
		id: 'modded',
		title: 'Dynmap (Modded)',
		url: 'https://modded.dynmap.fmhy.net',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) => probeHttp(context, 'https://modded.dynmap.fmhy.net')
	},
	{
		id: 'api',
		title: 'API',
		matchCron: (cron) => cron === cronHourly,
		execute: (context) =>
			probeHttp(context, 'https://feedback.tasky.workers.dev/test')
	}
]
