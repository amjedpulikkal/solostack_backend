const Queue = require('bull');

import {nodemailer} from "./src/infrastructure/server/router/injections/injection"

const pushQueue = new Queue('push-notifications', 'redis://127.0.0.1:6379');

console.log("subWorker started")
pushQueue.process(async (job) => {

  switch (job.data.task) {
    case "email":

      const { payload, task } = job.data;
      
      try {
        await nodemailer.sendOtpToMail(payload)
    
        console.log(' email sent successfully.');
      } catch (error) {
        console.error('email notification:', error);
      }
      break;
    case "webPush":

      break;
    default:
      break;
  }
});
