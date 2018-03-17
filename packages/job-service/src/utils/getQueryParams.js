const { parse } = require('querystring');

function getQueryParams(url) {
    const position = url.indexOf('?');

    if (position < 0) {
        return {};
    }

    return parse(url.substr(position + 1));
}

module.exports = getQueryParams;