import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getCollectionsFetch as getCollectionsFetchActionCreator } from './collectionActions';

class CollectionList extends Component {
    componentWillMount() {
        this.props.getCollectionsFetch();
    }

    render() {
        const { collections } = this.props;

        if (collections === null) {
            return null;
        }

        return (
            <div className="container p-t-3">
                <h1 className="text-xs-center">
                    Liste des collections
                </h1>
                <p><Link className="nav-link" to="/collection/tadam">
                    Une collection
                </Link></p>
            </div>
        );
    }
}

CollectionList.propTypes = {
    getCollectionsFetch: PropTypes.func.isRequired,
    collections: PropTypes.array,
};

const mapDispatchToProps = {
    getCollectionsFetch: getCollectionsFetchActionCreator,
};

function mapStateToProps({ collections }) {
    return {
        collections: collections.all,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
