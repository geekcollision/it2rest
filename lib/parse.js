module.exports = parseRows;

function parseRows(sheet, cb) {
    sheet.getRows(1, function(err, rows) {
        if(err) return cb(err);

        cb(null, rows.map(parseRow));
    });
}

function parseRow(row) {
    return {
        company: row.title,
        does: row['mitätekee'],
        technologies: row.teknologiat,
        homepage: row.kotisivu,
        other: row.muuta,
        employees: row['toiminnanlaajuusjklhlö'],
        references: row['viitteitä']
    };
}
