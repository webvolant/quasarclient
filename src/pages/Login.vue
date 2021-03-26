<template>
  <q-page class="">
    <div class="q-pa-md">

      <div class="row">
        <div class="col">
          <button @click="">github</button>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
/*
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
  },
  methods: {
    /*auth: function () {
    	const that = this;
      this.$axios.get('http://192.168.56.101/time/public/index.php/api/auth/redirect').then((response) => {
        //console.log(response.data)
        that.url = response.data
        //console.log(that.url)
	      window.location.href = that.url;
      })
          .catch((res) => {
          	console.log(res)
            that.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
          })
    },*/
  }
}
</script>
