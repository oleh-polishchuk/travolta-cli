#!/usr/bin/env node

const fs = require('fs');
const argv = require('yargs').argv;
const { home } = require('./common/utils');

const action = argv._[ 0 ];
const instance = argv._[ 1 ];
const name = argv._[ 2 ];

const options = {
    theme: argv.theme && JSON.parse(argv.theme),
    scss: argv.scss && JSON.parse(argv.scss),
    test: argv.test && JSON.parse(argv.test),
    path: argv.path,
    brand: argv.brand,
    config: argv.config,
};

if (action === 'init' || !fs.existsSync(`${home}/.travolta_config`)) {
    return require('./commands/init.command').run(options);
}

if (action === 'reinit') {
    return require('./commands/reinit.command').run(options);
}

if (action === 'generate' && instance === 'component') {
    return require('./commands/generate-component.command').run(name, options);
}

if (action === 'remove' && instance === 'component') {
    return require('./commands/remove-component.command').run(name, options);
}

if (action === 'generate' && instance === 'page') {
    return require('./commands/generate-page.command').run(name, options);
}

if (action === 'remove' && instance === 'page') {
    return require('./commands/remove-page.command').run(name, options);
}

console.log(`Usage: ${argv.$0} [action] [instance] [name]`);
console.log(`       ${argv.$0} init`);
console.log(`       ${argv.$0} init --config=/Users/olehpolishchuk/.travolta_config`);
console.log(`       ${argv.$0} reinit --config=/Users/olehpolishchuk/.travolta_config`);
console.log(`       ${argv.$0} generate component HomeSlider`);
console.log(`       ${argv.$0} generate component HomeSlider --theme=true --scss=false`);
console.log(`       ${argv.$0} remove component HomeSlider`);
console.log(`       ${argv.$0} generate page Home`);
console.log(`       ${argv.$0} remove page Home`);
