import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class CollectionPage extends Component {
    render() {
        const { collection } = this.props;

        if (!collection) {
            return null;
        }

        return (
            <div className="container p-t-3">
                <h1 className="text-xs-center">
                    { collection.name }
                </h1>
                <ul className="list-group">
                { collection.albums ? collection.albums.map(album =>
                    <li key={album.id} className="list-group-item">
                        <Link className="nav-link" to={`/album/${collection.id}/${album.id}`}>
                            { album.title }
                        </Link>
                    </li>
                ) : <li>Aucun alblum dans cette collection</li>}
                </ul>
                <p><Link className="nav-link" to={`/add-album/${collection.id}`}>
                    Ajouter un album
                </Link></p>
            </div>
        );
    }
}

CollectionPage.propTypes = {
    collection: PropTypes.object,
};

function mapStateToProps({ collections }, { params: { id } }) {
    return {
        collection: collections.all ? collections.all.find(c => c.id === id) : null,
    };
}

export default connect(mapStateToProps)(CollectionPage);
