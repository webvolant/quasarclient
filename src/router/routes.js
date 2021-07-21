
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { name: 'books', path: '', component: () => import('pages/books/Books.vue') },
            //{ name: 'books_index', path: '', component: () => import('pages/Login.vue') },
        ]
    },
    {
        path: '/login',
        component: () => import('layouts/MainLayout.vue'),
        //component: () => import('pages/Items.vue'),
        children: [
            { path: '', component: () => import('pages/Login.vue') },
            { name: 'logincallback', path: '/login/callback', component: () => import('pages/Login.vue') }
        ]
    },
    /*{
        path: '/item/:id',
        name: 'item',
        //component: () => import('pages/Item.vue')
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Item.vue') }
        ]
    },*/

    /*{
        path: '/items',
        component: () => import('layouts/MainLayout.vue'),
        //component: () => import('pages/Items.vue'),
        children: [
            { name: 'books', path: '', component: () => import('pages/Items.vue') },
            { name: 'book', path: '/items/:id', component: () => import('pages/Item.vue') }
        ]
    },*/



    {
        path: '/admin/items',
        component: () => import('layouts/AdminLayout.vue'),
        //component: () => import('pages/Items.vue'),
        children: [
            { name: 'items', path:'', component: () => import('pages/admin/Items.vue') },
            { name: 'item', path: '/admin/items/:id', component: () => import('pages/admin/Item.vue'),
                /*beforeEnter: (to, from, next) => {
                    console.log(to)
                    console.log(from)
                /*
										 todo check if to === from
										 Warning!: location.reload()  completely destroy all vuejs stored states
										 */
                    //window.location.reload()
                    /*return next()
                }*/
            }
        ]
    },
    {
        path: '/books',
        component: () => import('layouts/MainLayout.vue'),
        //component: () => import('pages/Items.vue'),
        children: [
            //{ name: 'books', path: '', component: () => import('pages/books/Books.vue') },
            { name: 'book', path: '/books/:id', component: () => import('pages/books/Book.vue') }
        ]
    },

  /*{
    path: '/robots.txt',
    component: () => import('pages/Error404.vue')
  },*/

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }

]

export default routes
