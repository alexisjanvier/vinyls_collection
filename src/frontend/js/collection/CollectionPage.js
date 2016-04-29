import React from 'react';
import { Link } from 'react-router';

const CollectionPage = () => (
    <div className="container p-t-3">
        <h1 className="text-xs-center">
            Page de collection
        </h1>
        <p><Link className="nav-link" to="/album/tadam">
            Un album
        </Link></p>
        <p><Link className="nav-link" to="/add-album">
            Ajouter un album
        </Link></p>
    </div>
);

export default CollectionPage;
