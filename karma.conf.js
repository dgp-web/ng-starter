const dgpNgAppTools = require("./dgp-ng-app.tools");

module.exports = function (config) {

    const karmaConfig = dgpNgAppTools.createKarmaConfig(config);

    config.set({
        ...karmaConfig
    });
};
