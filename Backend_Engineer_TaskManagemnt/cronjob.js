

//  This File is for testing purpose

// Testing if the user is getting the phone call on the desired number...



const accountSid = 'AC0f2445a8ca055a523b9d1ae27742f44d';
const authToken = '730c170912a12208c68bf48d3f75508c';
const client = require('twilio')(accountSid, authToken);

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml',
    to: '+919116475806', // Ensure correct E.164 format
    from: '+18284714288'
  })
  .then(call => console.log(call.sid))
  .catch(error => console.error(error)); 
