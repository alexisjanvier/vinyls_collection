/* global angular APP_NAME ADMIN_API_URL */
import 'ng-admin';
require('ng-admin/build/ng-admin.min.css');

function redirectToLogin() {
    window.location = '/admin/login.html';
}

function logout() {
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('expires');
    redirectToLogin();
}

window.logout = logout;

if (!window.localStorage.getItem('token')) redirectToLogin();

const myApp = angular.module('myApp', ['ng-admin']);

myApp.config(['NgAdminConfigurationProvider', (nga) => {
    const admin = nga
        .application(APP_NAME)
        .baseApiUrl(ADMIN_API_URL);

    admin.addEntity(nga.entity('products'));
    admin.addEntity(nga.entity('orders'));

    require('./products/config')(nga, admin);
    require('./orders/config')(nga, admin);

    admin.menu(nga.menu()
        .addChild(nga.menu(admin.getEntity('products')).icon('<span class="fa fa-picture-o fa-fw"></span>'))
        .addChild(nga.menu(admin.getEntity('orders')).icon('<span class="fa fa-credit-card fa-fw"></span>'))
    );

    admin.dashboard(nga.dashboard());
    admin.header(require('./header.html'));

    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', (RestangularProvider) => {
    RestangularProvider.setDefaultHttpFields({ withCredentials: true });
    RestangularProvider.addFullRequestInterceptor((element, operation, what, url, headers, params) => {
        const currentTime = (new Date()).getTime();
        const tokenExpires = window.localStorage.getItem('expires');

        if (tokenExpires && tokenExpires < currentTime) logout();

        headers = headers || {};
        headers['Authorization'] = window.localStorage.getItem('token');

        if (operation === 'getList') {
            if (params._page) {
                const start = (params._page - 1) * params._perPage;
                const end = params._page * params._perPage - 1;
                params.range = `[${start},${end}]`;
                delete params._page;
                delete params._perPage;
            }

            if (params._sortField) {
                params.sort = `[${params._sortField},${params._sortDir}]`;
                delete params._sortField;
                delete params._sortDir;
            }

            if (params._filters) {
                Object.keys(params._filters).forEach(filter => {
                    if (filter === 'q') params.filter = params._filters.q;
                    else params[filter] = params._filters[filter];
                });
                delete params._filters;
            }
        }

        return { params };
    });
}]);
