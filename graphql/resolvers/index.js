const targetResolvers =  require('./target');
const contactResolvers = require('./contact');

module.exports = Object.assign(
    {},
    targetResolvers,
    contactResolvers
);