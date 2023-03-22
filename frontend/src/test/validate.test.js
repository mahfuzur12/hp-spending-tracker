import { isEmpty, isEmail, isLength, isMatch } from '../components/helper/validate';

// describe('Auth Utils', () => {
//     describe('isEmpty', () => {
//       it('should return true if value is empty', () => {
//         expect(isEmpty(undefined)).toBe(true);
//         expect(isEmpty('')).toBe(true);
//         expect(isEmpty({})).toBe(true);
//       });
  
//       it('should return false if value is not empty', () => {
//         expect(isEmpty('Hello')).toBe(false);
//         expect(isEmpty(1)).toBe(false);
//         expect(isEmpty(false)).toBe(false);
//         expect(isEmpty([1, 2, 3])).toBe(false);
//       });
//     });
  
    // describe('isLength', () => {
    //   it('should return true if password is too short', () => {
    //     expect(isLength('12345')).toBe(true);
    //   });
  
    //   it('should return false if password is long enough', () => {
    //     expect(isLength('123456')).toBe(false);
    //     expect(isLength('1234567')).toBe(false);
    //   });
    // });
  
  

  describe('isEmail', () => {
    it('should return true if email is valid', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('john.doe@example.co.uk')).toBe(true);
      expect(isEmail('jane_doe123@example.edu')).toBe(true);
    });

    it('should return false if email is invalid', () => {
      expect(isEmail('notanemail')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('test@example')).toBe(false);
      expect(isEmail('test@example.c')).toBe(false);
      expect(isEmail('test@example.123')).toBe(false);
    });
  });

//   describe('isLength', () => {
//     it('should return true if password is too short', () => {
//       expect(isLength('12345')).toBe(true);
//       expect(isLength('')).toBe(true);
//       expect(isLength(undefined)).toBe(true);
//       expect(isLength(null)).toBe(true);
//     });

//     it('should return false if password is long enough', () => {
//       expect(isLength('123456')).toBe(false);
//       expect(isLength('password')).toBe(false);
//       expect(isLength('1aB3cD')).toBe(false);
//     });
//   });

  describe('isMatch', () => {
    it('should return true if passwords match', () => {
      expect(isMatch('password', 'password')).toBe(true);
      expect(isMatch('1aB3cD', '1aB3cD')).toBe(true);
      expect(isMatch('', '')).toBe(true);
    });

    it('should return false if passwords do not match', () => {
      expect(isMatch('password', 'password1')).toBe(false);
      expect(isMatch('1aB3cD', '1aB3cD1')).toBe(false);
      expect(isMatch('', 'password')).toBe(false);
      expect(isMatch(undefined, 'password')).toBe(false);
      expect(isMatch(null, 'password')).toBe(false);
    });
  });
