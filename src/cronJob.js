const cron = require('node-cron');

// Schedule a cron job to run every 2 hours
cron.schedule('0 */2 * * *', () => {
    console.log('Hello, World!');
});