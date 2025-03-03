const cron = require('node-cron');

// Schedule a cron job to run every 45 minutes
cron.schedule('*/45 * * * *', () => {
    console.log('Hello, World!');
});