const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require('webpack')
const path = require('path')

module.exports = (webpackConfigEnv, argv) => {
  // webpackConfigEnv.analyze = true;
  const defaultConfig = singleSpaDefaults({
    orgName: "{{= it.orgName }}",
    projectName: "{{= it.projectName }}",
    webpackConfigEnv,
    argv,
  });


  return merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
              fullySpecified: false,
          },
        },
        {
          test: /\.ttf$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin({
        ...process.env,
        PUBLIC_URL: '{{= it.PUBLIC_URL }}'
      }), 
   
    ]
  });
};
