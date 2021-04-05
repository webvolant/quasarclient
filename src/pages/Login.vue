<template>
  <q-page class="">
    <div class="q-pa-md">

      <div class="row">
        <div class="col">
          <button @click="auth()">login with github</button>
          <hr/>
          <!--<button @click="auth(true)">register with github</button>-->
          <button @click="checkAuth()">check AUTH</button>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
/*

send a request to api for the url to fetch the code:

Socialite::with('facebook')->stateless()->redirect()->getTargetUrl()

Then make a request with the above fetched url, which redirects with the code parameter.

Send the code to the api and fetch the user:

$fb_user = Socialite::with('facebook')->user();

This is where it crashes. I'm not sure why.

send a request to api for the url to fetch the code: Socialite::with('facebook')->stateless()->redirect()->getTargetUrl()
Then make a request with the above fetched url, which redirects with the code parameter.
Send the code to the api and fetch the user: $fb_user = Socialite::with('facebook')->user();
*/

export default {
  name: 'PageItems',
  data () {
    return {
      data:[],
      url:'',
      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        { name: 'title', label: 'Title', field: 'title' },
        { name: 'slug', label: 'Slug', field: 'slug' },
      ],
    }
  },
  created(){
    //this.auth();
    //if callback then func
    if(this.$router.history.current.name=='logincallback'){
      this.callback();
    }
  },
  methods: {
    checkAuth: function () {
      const that = this
      const config = {
        headers: { Authorization: `Bearer `+localStorage.getItem('token') }
      }
      this.$axios.get(this.globalConstants.apiUrl + 'withauth', config).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        that.$q.notify({color: 'negative',position: 'top',message: error.response.data.message,icon: 'report_problem'})
      })
    },
    auth: function (is_register) {
      const that = this
      if(is_register===true) { localStorage.setItem('reg', 1) } else { localStorage.removeItem('reg') }
      this.$axios.get(this.globalConstants.apiUrl + 'auth/redirect').then((response) => {
        console.log(response.data)
        that.url = response.data
        window.location.href = that.url
      }).catch((error) => {
        that.$q.notify({color: 'negative',position: 'top',message: error.response.data.message,icon: 'report_problem'})
      })
    },
    callback: function () {
      const that = this
      let code = this.$route.query.code
      let params = {
        code: code
      }
      let url = this.globalConstants.apiUrl + 'auth/callback'
      if(localStorage.getItem('reg') === 1){
        console.log('register process')
        url = this.globalConstants.apiUrl + 'auth/register'
      }

      this.$axios.post(url, params).then((response) => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.removeItem('reg')
      }).catch((error) => {
          that.$q.notify({color: 'negative',position: 'top',message: error.response.data.message,icon: 'report_problem'})
      })
    },
  }
}
</script>
