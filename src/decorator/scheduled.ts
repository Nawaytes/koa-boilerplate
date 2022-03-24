import {CronJob} from 'cron';


export function scheduled(timeConfig) {
    return (target, propertyKey) => {
		const job = new CronJob(timeConfig, target[propertyKey], null, true, 'Asia/Jakarta');
    };
}
