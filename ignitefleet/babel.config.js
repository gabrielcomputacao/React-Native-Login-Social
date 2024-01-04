module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      /* plugin para manusear variaveis de ambiente */
      ["module:react-native-dotenv",
        {
          /* como vai ser importada as variaveis de ambiente */
          'moduleName': '@env',
          /* nao permite undefined */
          'allowUndefined': false,

        }

      ]
    ],

  };
};