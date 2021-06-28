import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import axios from "axios"


Vue.use(VueRouter)

Vue.prototype.globalConstants = {
  //baseUrl: {
    //website: 'https://my.fancy.website.example.com',
    apiUrl: 'https://webeskadra.ru/public/index.php/api/',
    imageUrl: 'https://webeskadra.ru/public'
  //}
}

//Vue.config.globalProperties.$appName = 'My App'
//export default ({ Vue, router }) => { // <-------- This is where the `router` comes from
  Vue.prototype.$axios = axios;

/*axios.interceptors.request.use((config) => {
  console.log('request anton')
  console.log(document.cookie, config.headers.Cookie); //undefined
});*/

  axios.interceptors.response.use((res)=>{
    console.log('anton')
    console.log(res)
    //console.log(res.headers['set-cookie']);  //undefined
    return res;
  });
//}
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
