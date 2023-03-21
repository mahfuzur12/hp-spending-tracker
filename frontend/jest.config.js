module.exports = {
    // ...other configurations
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
};

