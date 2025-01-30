function convertPatternToRegex(pattern) {
    return pattern
        .replace(/\{(\w+)\}\(max-(\d+)\)/g, '[a-zA-Z0-9]{1,$2}')
        .replace(/\{(\w+)\}\((\d+)\)/g, '[a-zA-Z0-9]{$2}')
        .replace(/\-/g, '\\-');
}

module.exports = { convertPatternToRegex };