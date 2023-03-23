const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const request = require('supertest');
const app = require('../server');

describe('PlaidApi', () => {
  describe('constructor', () => {
    it('should create a new PlaidApi instance with the correct configuration', () => {
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

      expect(plaidClient.configuration).toEqual(configuration);
    });
  });
});

describe('POST /create_link_token', () => {
  let server; // declare a variable to hold your server instance
  
  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // close the server connection after all tests have run
  });

  it('should responds with a link token when successful', async () => {
    const response = await request(app)
      .post('/create_link_token')
      .send({
        user: {
          client_user_id: 'user',
        },
        client_name: 'Plaid Test App',
        products: ['auth', 'transactions'],
        language: 'en',
        redirect_uri: 'http://localhost:3000',
        country_codes: ['GB'],
      })
      .expect(200);

    expect(response.body.link_token).toBeDefined();
  });
});

describe('POST /auth', () => {
  let server; // declare a variable to hold your server instance
  let accessToken = "access-sandbox-3f689895-bed4-4b84-bde3-12dabd14b389"
  
  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // close the server connection after all tests have run
  });

  it('should responds with a link token when successful', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        access_token: accessToken,
      })
      .expect(200);

    expect(response.body.accounts).toBeDefined();
  });
});

describe('POST /institution', () => {
  let server; // declare a variable to hold your server instance
  let institutionId = "ins_59"
  
  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // close the server connection after all tests have run
  });

  it('should responds with a link token when successful', async () => {
    const response = await request(app)
      .post('/institution')
      .send({
        institution_id: institutionId,
        country_codes: ['GB'],
      })
      .expect(200);

    expect(response.body.institution).toBeDefined();
  });
});

describe('POST /transactions', () => {
  let server; // declare a variable to hold your server instance
  let accessToken = "access-sandbox-3f689895-bed4-4b84-bde3-12dabd14b389"

  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // close the server connection after all tests have run
  });

  it('should responds with a link token when successful', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        access_token: accessToken,
        start_date: '2019-01-01',
        end_date: '2019-01-31',
        Options: {
          count: 250,
          offset: 0,
        },
      })
      .expect(200);

    expect(response.body.transactions).toBeDefined();
  });
});

describe('POST /exchange_public_token', () => {
  let server; // declare a variable to hold your server instance
  let publicToken = "public-sandbox-7aaa5544-5961-4871-aa65-059914152078"
  let accessToken = "access-sandbox-f2223b69-0d8b-46ad-989c-29d4559bc3e1"

  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log('Server started');
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // close the server connection after all tests have run
  });

  it('should responds with a link token when successful', async () => {
    const response = await request(app)
      .post('/exchange_public_token')
      .send({
        public_token: publicToken,
      })
      .expect(200);

    expect(accessToken).toBeDefined();
  });
});