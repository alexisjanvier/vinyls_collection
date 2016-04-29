exports.up = (db, callback) => {
    const sql = `
create table album (
    id                  uuid primary key default uuid_generate_v4(),
    collection_id       uuid not null references collection (id) on delete cascade,
    title               varchar not null,
    artist              varchar[] not null,
    label               varchar[],
    cover_url           jsonb
);

create index album__collection on album(collection_id);
`;

    db.runSql(sql, callback);
};

exports.down = (db, callback) => {
    const sql = `
drop table album;
    `;

    db.runSql(sql, callback);
};
