const fs = require('fs');
const { home } = require('../common/utils');

module.exports.run = (options = {}) => {
    const config = options.config || `${home}/.travolta_config`;

    if (!fs.existsSync(config)) {
        fs.writeFileSync(config, JSON.stringify({
            projectDir: `${home}/IdeaProjects/travolta/src/`,
            defaultName: 'BaseComponent1',
            theme: false,
            scss: true,
            test: true,
        }, null, 2), { flag: 'wx' });
        console.log(`Default config was successfully initialized!`);
    }
};
