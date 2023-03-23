const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { activateUser } = require('../controllers/userController');

describe('activateUser', () => {
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeAll(() => {
    process.env.ACTIVATION_TOKEN = 'secret';
  });

  it('should activate user and return 200 status', async () => {
    const req = mockRequest({ activation_token: jwt.sign({ name: 'test', email: 'test@example.com', password: 'password' }, process.env.ACTIVATION_TOKEN) });
    const res = mockResponse();
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValueOnce();
    
    await activateUser(req, res);
    
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(User.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: "Your account has been activated, you can now sign in." });
  });

  it('should return 400 status if user already exists', async () => {
    const req = mockRequest({ activation_token: jwt.sign({ name: 'test', email: 'test@example.com', password: 'password' }, process.env.ACTIVATION_TOKEN) });
    const res = mockResponse();
    User.findOne = jest.fn().mockResolvedValueOnce({});
    
    await activateUser(req, res);
    
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "This email is already registered." });
  });

  it('should return 500 status if there is an error', async () => {
    const req = mockRequest({ activation_token: jwt.sign({ name: 'test', email: undefined, password: 'password' }, process.env.ACTIVATION_TOKEN) });

    const res = mockResponse();
    User.findOne = jest.fn().mockRejectedValueOnce(new Error('Database error'));
    
    await activateUser(req, res);
    
    expect(User.findOne).toHaveBeenCalledWith({ email: undefined });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Database error" });
  });
});
