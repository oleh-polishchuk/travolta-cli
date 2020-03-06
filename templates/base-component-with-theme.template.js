module.exports = (options = {}) => {
    return `\
import "./style.scss";
import React from "react";
import PropTypes from "prop-types";

const ${options.name} = ({ theme }) => (
    <section styleName={\`${options.className} \${theme}\`}>
        ${options.name} works!
    </section>
);

${options.name}.themes = [
    "",
];

${options.name}.defaultProps = {
    theme: "",
};

${options.name}.propTypes = {
    theme: PropTypes.oneOf(${options.name}.themes),
};

export default ${options.name};
`
};
