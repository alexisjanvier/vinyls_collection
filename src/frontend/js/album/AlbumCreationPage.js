import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AlbumCreationForm from './AlbumCreationForm';

class AlbumCreationPage extends Component {
    render() {
        const { collection } = this.props;

        if (!collection) {
            return null;
        }

        return (
            <div className="container p-t-3">
                <h1 className="text-xs-center">
                    Ajouter un album à la collection { collection.name }
                </h1>
                <AlbumCreationForm collectionId={collection.id} />
            </div>
        );
    }
}

AlbumCreationPage.propTypes = {
    collection: PropTypes.object,
};

function mapStateToProps({ collections }, { params: { collectionId } }) {
    return {
        collection: collections.all ? collections.all.find(c => c.id === collectionId) : null,
    };
}

export default connect(mapStateToProps)(AlbumCreationPage);
