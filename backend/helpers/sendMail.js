const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth

const CLIENT_ID = '1075685384095-smp5tir5l46uosrogu4aufiifimk7n2p.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04mXduBz3QM7UCgYIARAAGAQSNwF-L9IroCVHNvXcwHMTVoDa8RNJswhyydff11YS3DcrCEiT_nvEpJNzNta8JgirKDD4hpTkEJg'
const ADMIN_EMAIL = 'hitgub.pocilot@gmail.com'

const oauth2client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendEmailReset = (to, url, text, name)=>{
    oauth2client.setCredentials({
        refresh_token: REFRESH_TOKEN
    })
    const accessToken = oauth2client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: ADMIN_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: to,
        subject: "RESET PASSWORD",
        html: `
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
          <title>Hitgub Pocilot | Account Activation</title>
          <style>
            body {
              background-color: #333333;
              height: 100vh;
              font-family: "Roboto", sans-serif;
              color: #fff;
              position: relative;
              text-align: center;
            }
            .container {
              max-width: 700px;
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            .wrapper {
              padding: 0 15px;
            }
            .card {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100%;
            }
            span {
              color: #ffc107;
            }
            button {
              padding: 1em 6em;
              border-radius: 5px;
              border: 0;
              background-color: hsl(45, 100%, 51%);
              transition: all 0.3s ease-in;
              cursor: pointer;
            }
            button:hover {
              background-color: hsl(45, 70%, 51%);
              transition: all 0.3s ease-in;
            }
            .spacing {
              margin-top: 5rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="wrapper">
              <div class="card">
                <h1><span>Hey</span> ${name}</h1>
                <p>Please click the button below to reset your password. 🙂</p>
                <a href=${url}><button>${text}</button></a>
                <p class="spacing">
                  If the button above does not work, please navigate to the link
                  provided below 👇🏻
                </p>
                <div>${url}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    smtpTransport.sendMail(mailOptions, (err, info)=>{
        if(err) return {err}
        return info;

    });
};

module.exports = sendEmailReset;

