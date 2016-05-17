import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getCollectionsFetch as getCollectionsFetchActionCreator } from '../collection/collectionActions';

class AlbumPage extends Component {
    componentWillMount() {
        if (!this.props.collections) {
            this.props.getCollectionsFetch();
        }
    }
    render() {
        const { album, collection } = this.props;

        if (!album) {
            return null;
        }

        return (
            <div className="jumbotron">
                <h1 className="display-3">{ album.title }</h1>
                <img src={ album.cover_url.normal } classNameName="img-rounded center-block" />
                <p className="lead">{album.artist}</p>
                <hr className="m-y-2"></hr>
                <p>{album.label}</p>
                <Link className="nav-link" to={`/collection/${collection.id}`}>
                    Retour à la collection
                </Link>
            </div>
        );
    }
}

AlbumPage.propTypes = {
    album: PropTypes.object,
    collection: PropTypes.object,
    collections: PropTypes.array,
    getCollectionsFetch: PropTypes.func.isRequired,
};

function mapStateToProps({ collections }, { params: { collectionId, albumId } }) {
    const collection = collections.all ? collections.all.find(c => c.id === collectionId) : null;
    return {
        album: collection ? collection.albums.find(a => a.id === albumId) : null,
        collection,
        collections: collections.all,
    };
}

export default connect(mapStateToProps, {
    getCollectionsFetch: getCollectionsFetchActionCreator,
})(AlbumPage);
