const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const dgpNgAppTools = require("./dgp-ng-app.tools");

module.exports = function (env) {

    return dgpNgAppTools.createWebpackAppConfig({
        development: env.development,
        angularCompilerPlugin: new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.app.json',
            entryModule: './src/app/app.module#AppModule',
            sourceMap: false,
        })
    });

};
