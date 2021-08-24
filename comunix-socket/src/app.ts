import { initServerEvents } from './server';
import { initMessageRouter } from './router';

initServerEvents();
initMessageRouter()
console.log('Server up and running');