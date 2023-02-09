/*
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db, listening on port ' + process.env.PORT)
        })
    })
    .catch((error => {
        console.log(error)
    }))

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    req.user = { id: "63e208865bf1447790d7e32b" };
    next()
})
*/

const { response } = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': '63e42502d85c2e001297b65d',
      'PLAID-SECRET': 'f94671db90523240c5f39d8ba53283',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/hello", (request, response) => {
    response.json({ message: "Hello " + request.body.name });
});

app.post('/create_link_token', async function (request, response) {
    // Get the client_user_id by searching for the current user
    const plaidRequest = {
      user: {
        // This should correspond to a unique id for the current user.
        client_user_id: 'user',
      },
      client_name: 'Plaid Test App',
      products: ['auth'],
      language: 'en',
      redirect_uri: 'http://localhost:3000',
      country_codes: ['GB'],
    };
    try {
      const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
      response.json(createTokenResponse.data);
    } catch (error) {
        response.status(500).send("failure");
      // handle error
    }
  });

app.post('/auth', async function(request, response) {
    try {
        const access_token = request.body.access_token;
        const plaidRequest = {
          access_token: access_token,
        };
        const plaidResponse = await plaidClient.authGet(plaidRequest);
        response.json(plaidResponse.data);     
    } catch(e) {
        response.status(500).send("failure");
    }
});


app.post('/exchange_public_token', async function (
  request,
  response,
  next,
) {
  const publicToken = request.body.public_token;
  try {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    const accessToken = plaidResponse.data.access_token;

    response.json({ accessToken });
  } catch (error) {
      response.status(500).send("failure");
    // handle error
  }
});


app.listen(8000, () => {
    console.log("server has started");
});



