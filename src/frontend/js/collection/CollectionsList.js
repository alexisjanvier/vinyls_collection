import React from 'react';
import { Link } from 'react-router';

const CollectionList = () => (
    <div className="container p-t-3">
        <h1 className="text-xs-center">
            Liste des collections
        </h1>
        <p><Link className="nav-link" to="/collection/tadam">
            Une collection
        </Link></p>
    </div>
);

export default CollectionList;
