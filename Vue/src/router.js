import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import OidcCallback from './components/OidcCallback.vue'
import OidcCallbackError from './components/OidcCallbackError.vue'
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import store from './store'

Vue.use(Router)

const router = new Router({
    //mode: 'history',
    routes: [{
            path: '/',
            component: Home,
            meta: {
                isPublic: true
            },
            name: "home"
        },
        { path: '/welcome', component: Welcome, name: "welcome" },
        {
            path: '/protected',
            name: 'protected',
            component: () =>
                import ( /* webpackChunkName: "protected" */ './components/Protected.vue')
        },
        { path: '/oidc-callback', component: OidcCallback, name: "oidcCallback" },
        {
            path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
            name: 'oidcCallbackError',
            component: OidcCallbackError,
            meta: {
                isPublic: true
            }
        }
    ]
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'))

export default router