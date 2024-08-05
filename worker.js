const Queue = require('bull');
const webPush = require('web-push');
const { sendNotification } = require('web-push');

const pushQueue = new Queue('push-notifications', 'redis://127.0.0.1:6379');

pushQueue.process(async (job) => {
  const { subscription, payload } = job.data;

  try {
    await sendNotification(subscription, payload);
    
    console.log('Push notification sent successfully.');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
});
