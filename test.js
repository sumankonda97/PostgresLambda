const pg = require('pg');
const configuration = {
    user: 'postgres',
    host: 'postgres.crspo6lde2lz.us-west-2.rds.amazonaws.com',
    database: 'postgres',
    password: 'postgres',
    port: '5432'
};
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyLoop = false;

    const pool = new pg.Pool(configuration)
    pool.connect(function (err, connection) {
        if (err) {
            console.log('cannot connect to db ' + err);
        }
        var sql = "SELECT * FROM employee_details";
        connection.query(sql, function (error, results, fields) {
            console.log('Successfully connected');
            connection.release();
            console.log(results);
            const response = {
                statusCode: 200,
                body: results.rows
            };
            if (error) callback(error);
            else callback(null, response);
        });
    });
};