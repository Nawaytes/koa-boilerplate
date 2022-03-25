import {scheduled} from "../decorator/scheduled";

export default class DefaultScheduler {
	@scheduled('0 * * * * *')
	public async defaultScheduler() {
		console.log('You will see this message every hour');
	}
}
