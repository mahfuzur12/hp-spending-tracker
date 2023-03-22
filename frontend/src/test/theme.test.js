import theme from "../pages/Overview/theme";
describe('Theme object', () => {
    test('colors object should contain correct values', () => {
      expect(theme.colors.background).toBe('#EDEDED');
      expect(theme.colors.text).toBe('#030303');
      expect(theme.colors.primary).toBe('#43a047');
      expect(theme.colors.secondary).toBe('#039be5');
      expect(theme.colors.white).toBe('#FFFFFF');
      expect(theme.colors.grey).toBe('#D9D9D9');
      expect(theme.colors.danger).toBe('#e53935');
    });
  
    test('borderRadius object should contain correct values', () => {
      expect(theme.borderRadius.button).toBe('1.6vh');
      expect(theme.borderRadius.card).toBe('3.2vh');
    });
  
    test('fonts object should contain correct values', () => {
      expect(theme.fonts.titles).toBe('Poppins, sans-serif');
      expect(theme.fonts.brand).toBe('Poppins, sans-serif');
      expect(theme.fonts.subHeadings).toBe('Inter, sans-serif');
      expect(theme.fonts.buttonText).toBe('Inter, sans-serif');
      expect(theme.fonts.normalText).toBe('Inter, sans-serif');
    });
  
    test('fontSizes object should contain correct values', () => {
      expect(theme.fontSizes.titles).toBe('clamp(38px, calc(38px + (48 - 38) * (100vw - 320px) / (1920 - 320)), 48px)');
      expect(theme.fontSizes.brand).toBe('clamp(14px, calc(14px + (30 - 14) * (100vw - 320px) / (1920 - 320)), 30px)');
      expect(theme.fontSizes.subHeadings).toBe('clamp(10px, calc(10px + (16 - 10) * (100vw - 320px) / (1920 - 320)), 16px)');
      expect(theme.fontSizes.medium).toBe('clamp(12px, calc(12px + (16 - 12) * (100vw - 320px) / (1920 - 320)), 16px)');
      expect(theme.fontSizes.buttonText).toBe('clamp(10px, calc(10px + (14 - 10) * (100vw - 320px) / (1920 - 320)), 14px)');
      expect(theme.fontSizes.normalText).toBe('clamp(10px, calc(10px + (14 - 10) * (100vw - 320px) / (1920 - 320)), 14px)');
      expect(theme.fontSizes.mini).toBe('clamp(8px, calc(8px + (12 - 8) * (100vw - 320px) / (1920 - 320)), 12px)');
    });
  
    test('fontWeight object should contain correct values', () => {
      expect(theme.fontWeight.semiBold).toBe(600);
      expect(theme.fontWeight.regular).toBe(400);
    });
  });
  