const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('../common/config');
const baseComponentTemplate = require('../templates/base-component.template');
const baseComponentWithThemeTemplate = require('../templates/base-component-with-theme.template');
const baseStyleTemplate = require('../templates/base-style.template');
const baseTestTemplate = require('../templates/base-test.template');
const { decamelize } = require("../common/utils");

module.exports.run = (name = "", options = {}) => {
    const componentName = name || config.getConfig().defaultName;
    const theme = options.theme !== undefined ? options.theme : config.getConfig().theme;
    const scss = options.scss !== undefined ? options.scss : config.getConfig().scss;
    const test = options.test !== undefined ? options.test : config.getConfig().test;
    const projectDir = config.getConfig().projectDir;

    let componentsDir = path.resolve(projectDir, 'Components');
    if (options.path && fs.existsSync(options.path)) {
        componentsDir = options.path;
    }
    const componentDir = path.resolve(componentsDir, componentName);
    const componentPath = path.resolve(componentDir, 'index.js');
    const stylePath = path.resolve(componentDir, 'style.scss');
    const testPath = path.resolve(componentDir, 'index.snapshot.test.js');

    if (fs.existsSync(componentDir)) {
        return console.log(`Component ${componentDir} already exists!`);
    }

    fs.mkdirSync(componentDir);

    const componentTemplate = (theme && scss) ? baseComponentWithThemeTemplate : baseComponentTemplate;
    fs.writeFileSync(componentPath, componentTemplate({
        name: componentName,
        className: decamelize(componentName),
    }), { flag: 'wx' });

    if (scss) {
        fs.writeFileSync(stylePath, baseStyleTemplate({
            className: decamelize(componentName),
        }), { flag: 'wx' });
    }

    if (test) {
        fs.writeFileSync(testPath, baseTestTemplate({
            componentName
        }), { flag: 'wx' });
    }

    execSync(`cd ${projectDir} && git add .`);

    console.log(`Created ${componentPath}`);
    scss && console.log(`Created ${stylePath}`);
    test && console.log(`Created ${testPath}`);
};
