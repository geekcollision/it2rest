var sugar = require('object-sugar');
var schema = sugar.schema();

var schemas = {};

module.exports = schemas;


schema(schemas, 'Company').fields({
    company: String,
    does: String,
    technologies: String,
    homepage: String,
    other: String,
    employees: String,
    references: String
});
