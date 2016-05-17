import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getCollectionsFetch as getCollectionsFetchActionCreator } from './collectionActions';

class CollectionPage extends Component {
    componentWillMount() {
        if (!this.props.collections) {
            this.props.getCollectionsFetch();
        }
    }

    render() {
        const { collection } = this.props;

        if (!collection) {
            return null;
        }

        return (
            <div className="container p-t-3">
                <h1 className="display-4">
                    { collection.name }
                </h1>
                <ul className="list-group">
                { collection.albums ? collection.albums.map(album =>
                    <li key={album.id} className="list-group-item">
                        <Link className="nav-link" to={`/album/${collection.id}/${album.id}`}>
                            <div className="media album">
                                    <img src={ album.cover_url.normal } className="media-object img-rounded" />
                                <div className="media-body">
                                    <h4 className="media-heading">
                                        { album.title }
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </li>
                ) : <li>Aucun alblum dans cette collection</li>}
                </ul>
                <br /><p>
                    <Link className="btn btn-info" role="button" to={`/add-album/${collection.id}`}>
                    Ajouter un album
                    </Link>
                </p>
            </div>
        );
    }
}

CollectionPage.propTypes = {
    collections: PropTypes.array,
    collection: PropTypes.object,
    getCollectionsFetch: PropTypes.func.isRequired,
};

function mapStateToProps({ collections }, { params: { id } }) {
    return {
        collections: collections.all,
        collection: collections.all ? collections.all.find(c => c.id === id) : null,
    };
}

export default connect(mapStateToProps, {
    getCollectionsFetch: getCollectionsFetchActionCreator,
})(CollectionPage);
