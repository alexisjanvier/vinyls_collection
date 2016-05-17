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
                <h1 className="display-4">
                    Les collections
                </h1>
                <ul className="list-group">
                    {collections.map(collection =>
                        <li key={collection.id} className="list-group-item">
                            <Link className="nav-link" to={`/collection/${collection.id}`}>
                                <h3 className="text-xs-center">{ collection.name } ({collection.albums.length} albums)</h3>
                            </Link>
                        </li>
                    )}
                </ul>
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
