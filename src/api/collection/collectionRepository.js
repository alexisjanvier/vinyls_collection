import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'collection';
    const exposedFields = [
        'id',
        'name',
        `COALESCE((SELECT ARRAY_TO_JSON(ARRAY_AGG(rows)) FROM (
            SELECT * FROM album
            WHERE album.collection_id = collection.id
        ) rows), '[]'::json) AS albums`,
    ];
    const queries = queriesFactory(client, tableName, exposedFields);

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
