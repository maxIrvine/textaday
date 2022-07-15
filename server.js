require('dotenv').config();
const cron = require('cron');
const axios = require('axios');
const util = require('util')

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const job = cron.job('* 07 * * *', () => {
    getDog();
});

job.start()

function createText(dogURL, quote, author) {
    var now = new Date();
    client.messages.create({
     body: `${process.env.MESSAGE}\n\nQuote of the day: "${quote}" -${author}\n\nHave a great day!`,
     mediaUrl: [dogURL],
     from: '+16592224589',
     to: process.env.TO_PHONE_NUMBER
   })
  .then(message => console.log(`Message sent at: ${now}`));
};

async function sendText(dogURL) {
    await axios.get('https://api.quotable.io/random').then(res => {
        console.log(res.data);
        return createText(dogURL, res.data.content, res.data.author);
    })
}

async function getDog() {
   await axios.get('https://dog.ceo/api/breed/retriever/golden/images/random')
        .then(res => {
            return sendText(res.data.message);
        })
        .catch(error => {
            return error;
        });
};