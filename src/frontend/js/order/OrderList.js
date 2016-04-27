import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelmetTitle from '../app/HelmetTitle';
import Loading from '../app/Loading';
import OrderItem from './OrderItem';
import orderActions from './orderActions';

class OrderList extends Component {
    componentDidMount() {
        this.props.loadOrders();
    }

    render() {
        const { loading, orders } = this.props;

        return (
            <div className="row orders-list">
                <HelmetTitle title="Orders" />
                <div className="col-xs-12">
                    {loading && <Loading />}
                    {!loading &&
                        <div className="list-group">
                            {orders.map(order => (
                                <OrderItem key={order.id} {...order} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape(OrderItem.propTypes)),
    loading: PropTypes.bool.isRequired,
    loadOrders: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        loading: state.order.loading,
        orders: state.order.list,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadOrders: orderActions.list.request,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
