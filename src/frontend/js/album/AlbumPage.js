import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class AlbumPage extends Component {
    render() {
        const { album } = this.props;

        if (!album) {
            return null;
        }

        return (
            <div className="container p-t-3">
            <h1 className="text-xs-center">
                { album.title }
            </h1>
            <img src={ album.cover_url.normal } className="img-rounded center-block" />
            </div>
        );
    }
}

AlbumPage.propTypes = {
    album: PropTypes.object,
};

function mapStateToProps({ collections }, { params: { collectionId, albumId } }) {
    const collection = collections.all ? collections.all.find(c => c.id === collectionId) : null;
    return {
        album: collection ? collection.albums.find(a => a.id === albumId) : null,
    };
}

export default connect(mapStateToProps)(AlbumPage);
