import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteTransition } from 'react-router-transition';
import HelmetTitle from './HelmetTitle';

import CollectionsList from '../collection/CollectionsList';

export class App extends Component {

    render() {
        const { children, location } = this.props;

        return (
            <div className="app container-fluid">
                <HelmetTitle />
                <div className="row">
                    <nav className="navbar navbar-fixed-top navbar-dark bg-primary">
                        <a className="navbar-brand" href="#">Vinyls collections</a>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-lg-9">
                        <RouteTransition
                            pathname={location.pathname}
                            atEnter={{ translateX: 100 }}
                            atLeave={{ translateX: -100 }}
                            atActive={{ translateX: 0 }}
                            mapStyles={s => ({ transform: `translateX(${s.translateX}%)` })}
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'absolute', width: '100%' }}>
                                {children === null ?
                                    <CollectionsList />
                                : children}
                            </div>
                        </RouteTransition>
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
