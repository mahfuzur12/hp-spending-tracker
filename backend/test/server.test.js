const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const request = require('supertest');
const app = require('../server');


describe ('PlaidApi', () => {
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

  it('should return 500 when given the wrong accessToken', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        access_token: "wrongToken",
      })
      .expect(500);
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

  it('should return 500 when given the wront institutionId', async () => {
    const response = await request(app)
      .post('/institution')
      .send({
        institution_id: "ins_00000",
        country_codes: ['GB'],
      })
      .expect(500);

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

  it('should return 500 when given the wront accessToken', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        access_token: "wrongToken",
        start_date: '2019-01-01',
        end_date: '2019-01-31',
        Options: {
          count: 250,
          offset: 0,
        },
      })
      .expect(500);

  });

});


