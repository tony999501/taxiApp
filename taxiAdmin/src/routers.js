const Routers = [
    { 
        path: '/',
        component(resolve){
            require.ensure(['./components/main.vue'],()=>{
                 resolve(require('./components/main.vue'));
            })
        },
        children:[
            { 
                path: '/',
                name: 'taxi',
                component(resolve){
                    require.ensure(['./components/taxi.vue'],()=>{
                        resolve(require('./components/taxi.vue'));
                    })
                }
            },
            { 
                path: '/taxi',
                name: 'taxi',
                component(resolve){
                    require.ensure(['./components/taxi.vue'],()=>{
                        resolve(require('./components/taxi.vue'));
                    })
                }
            },
            { 
                path: '/taxiAdmin',
                name: 'taxiAdmin',
                component(resolve){
                    require.ensure(['./components/taxiAdmin.vue'],()=>{
                        resolve(require('./components/taxiAdmin.vue'));
                    })
                }
            },
            { 
                path: '/water',
                name: 'water',
                component(resolve){
                    require.ensure(['./components/water.vue'],()=>{
                        resolve(require('./components/water.vue'));
                    })
                }
            },
            { 
                path: '/statistics',
                name: 'statistics',
                component(resolve){
                    require.ensure(['./components/statistics.vue'],()=>{
                        resolve(require('./components/statistics.vue'));
                    })
                }
            },
            { 
                path: '/duizhang',
                name: 'duizhang',
                component(resolve){
                    require.ensure(['./components/duizhang.vue'],()=>{
                        resolve(require('./components/duizhang.vue'));
                    })
                }
            },
            { 
                path: '/snen',
                name: 'snen',
                component(resolve){
                    require.ensure(['./components/snen.vue'],()=>{
                        resolve(require('./components/snen.vue'));
                    })
                }
            }
        ]
    },
    { 
        path: '/login',
        name: 'login',
        component(resolve){
            require.ensure(['./components/login.vue'],()=>{
                 resolve(require('./components/login.vue'));
            })
        }
    },
    { path: '*', redirect: '/' }
]

export default Routers;