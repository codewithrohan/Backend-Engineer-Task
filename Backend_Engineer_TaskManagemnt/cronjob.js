

//  This File is for testing purpose

// Testing if the user is getting the phone call on the desired number...



const accountSid = ' your accSid here';
const authToken = 'your authToken here';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: ' your number', // Ensure correct E.164 format
    from: 'your twilio number'
  })
  .then(call => console.log(call.sid))
  .catch(error => console.error(error)); 
