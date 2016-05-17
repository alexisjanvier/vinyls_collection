import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelmetTitle from './HelmetTitle';

import CollectionsList from '../collection/CollectionsList';

export class App extends Component {

    render() {
        const { children } = this.props;

        return (
            <div className="app container">
                <HelmetTitle />
                <div className="row">
                    <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
                        <a className="navbar-brand" href="#">Vinyl collections</a>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div>
                            {children === null ?
                                <CollectionsList />
                            : children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
