import queriesFactory from '../lib/db/queries/index';

export default client => {
    const tableName = 'album';
    const exposedFields = [
        'id',
        'collection_id',
        'title',
        'artist',
        'label',
        'cover_url',
    ];
    const queries = queriesFactory(client, tableName, exposedFields);

    return {
        tableName,
        exposedFields,
        ...queries,
    };
};
