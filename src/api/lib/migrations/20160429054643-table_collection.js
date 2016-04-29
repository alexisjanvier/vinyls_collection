exports.up = (db, callback) => {
    const sql = `
create extension if not exists "uuid-ossp";
create table collection (
    id                  uuid primary key default uuid_generate_v4(),
    name                varchar not null
);
`;

    db.runSql(sql, callback);
};

exports.down = (db, callback) => {
    const sql = `
drop table collection;
    `;

    db.runSql(sql, callback);
};
