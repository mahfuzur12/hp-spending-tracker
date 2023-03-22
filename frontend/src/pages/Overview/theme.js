const responsiveFontSize = (minSize, maxSize) => `clamp(${minSize}px, calc(${minSize}px + (${maxSize} - ${minSize}) * (100vw - 320px) / (1920 - 320)), ${maxSize}px)`;

const theme = {
    colors: {
        background: '#EDEDED',
        text: '#030303',
        primary: '#43a047',
        secondary: '#039be5',
        white: '#FFFFFF',
        grey: '#D9D9D9',
        danger: '#e53935'
    },
    borderRadius: {
        button: '1.6vh',
        card: '3.2vh',
    },
    fonts: {
        titles: 'Poppins, sans-serif',
        brand: 'Poppins, sans-serif',
        subHeadings: 'Inter, sans-serif',
        buttonText: 'Inter, sans-serif',
        normalText: 'Inter, sans-serif',
    },
    fontSizes: {
        titles: responsiveFontSize(38, 48),
        brand: responsiveFontSize(14, 30),
        subHeadings: responsiveFontSize(10, 16),
        medium: responsiveFontSize(12, 16),
        buttonText: responsiveFontSize(10, 14),
        normalText: responsiveFontSize(10, 14),
        mini: responsiveFontSize(8, 12),
    },
    fontWeight: {
        semiBold: 600,
        regular: 400,
    },
};

export default theme;
