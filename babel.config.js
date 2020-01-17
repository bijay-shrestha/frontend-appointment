module.exports = {
    plugins: [
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-regenerator',
        '@babel/plugin-transform-runtime',
    ],
    presets: ['@babel/preset-env', '@babel/preset-react']
};