require('dotenv').config();
const cron = require('cron')

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const job = cron.job('* * * * *', () => sendText())
job.start()

function sendText() {
    var now = new Date();
    client.messages.create({
     body: process.env.MESSAGE,
     from: '+16592224589',
     to: process.env.TO_PHONE_NUMBER
   })
  .then(message => console.log(`Message sent at: ${now}`));
};
