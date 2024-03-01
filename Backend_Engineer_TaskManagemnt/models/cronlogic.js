// Dependencies and setup
const cron = require('node-cron');      // for scheduling task
const Task = require('./task_model');     
const User = require('./user_model'); 
const twilio = require('twilio');         // for making callls
const TWILIO_ACCOUNT_SID = 'AC0f2445a8ca055a523b9d1ae27742f44d';
const TWILIO_AUTH_TOKEN = '730c170912a12208c68bf48d3f75508c';
const TWILIO_PHONE_NUMBER = '+18284714288';
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Cron job to update task priorities every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const tasks = await Task.find({ deleted_at: null });

    for (const task of tasks) {
      const currentDate = new Date();
      const timeDifference = task.due_date - currentDate;
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      if (daysDifference <= 0) {
        task.priority = 0;
      } else if (daysDifference <= 2) {
        task.priority = 1;
      } else if (daysDifference <= 4) {
        task.priority = 2;
      } else {
        task.priority = 3;
      }

      await task.save();
    }
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});


cron.schedule('0 * * * *', async () => {
  try {
    const users = await User.find().sort({ priority: 1 }); // Ensure users are sorted by priority

    for (const user of users) {
      const tasks = await Task.find({
        user_id: user._id,
        due_date: { $lt: new Date() },
        status: 'TODO',
        deleted_at: null,
      });

      if (tasks.length > 0) {
        await client.calls.create({
          url: 'http://demo.twilio.com/docs/voice.xml',
          to: user.phone_number,
          from: TWILIO_PHONE_NUMBER,
        });
        break; // Exit loop after making the call to the first available high-priority user
      }
    }
  } catch (error) {
    console.error('Error making Twilio call:', error);
  }
});


// -----------------------------------------------------------------------------------------------------------------------------





