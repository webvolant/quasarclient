<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-md-6 col-sm-6"> <!-- style="display: none;" preload="auto" -->
        <q-img v-if="images.length>0" :src="images[0].path" style="height: 400px"/>
        <audio-player :files="files" v-if="files.length>0 && item.status==1"></audio-player>
        <div color="primary" v-if="item.status == 3">
          Приносим свои извинения. Доступ к файлам временно закрыт!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
	import AudioPlayer from 'components/AudioPlayer.vue'
  import axios from "axios";
	export default {
		//name: 'PageItem',
		components: { AudioPlayer },
    meta(){
		  return {
		    title: this.item.meta_title
      }
    },
    /*meta: {
		  title:this.item.meta_title,
      //return {
      meta:{
        //title: 'check',//this.item.meta_title,
        //description: this.item.meta_description,
        //keywords: this.item.meta_keywords, //{ name: 'keywords', content: 'Quasar website' },
        //equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      }
    },*/
		data () {
			return {
        meta_title:null,
			  item:{},
				files:[
					///{path:'audio/patrul-0.mp3', name:'Щенки спасают лес'},
					//{path:'audio/patrul-1.mp3', name:'Щенки спасают театр'},
					//{path:'audio/patrul-2.mp3', name:'Щенки спасают лес2'},
					//{path:'audio/patrul-3.mp3', name:'Щенки спасают лес3'},
					//{path:'audio/patrul-4.mp3', name:'Щенки спасают лес4'},
				],
        images:[
        ],
			}
		},
    preFetch({store, currentRoute}){
      /*const that = this;
      $axios.get(this.globalConstants.apiUrl + 'item/' + currentRoute.params.id).then((response) => {
        console.log(response.data)
        //return store.dis

      })
        .catch((error) => {
          console.log(error)
          /*this.$q.notify({
            type: 'negative',
            message: error.message
          })*/
          //this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
        //})
    },
		mounted(){
      this.getItem();
		},
    /*computed:{
      meta_item: this.item.meta_title
    },*/
		methods: {
			getItem: function () {
				const that = this;
				this.$axios.get(this.globalConstants.apiUrl + 'item/' + this.$route.params.id, {withCredentials: true}).then((response) => {
					console.log(response.data)
					that.item = response.data.item
          if(that.item.files)
          that.item.files.forEach(function (value, index) {
						if(value.type==1){
							value.path = that.globalConstants.imageUrl + value.path
							that.files.push(value)
						}

            if(value.type==2){
              value.path = that.globalConstants.imageUrl + value.path
              that.images.push(value)
            }

					})
					/*this.item.files.forEach(function (value, index) {
						console.log(value)

						that.addons[value.name] = value.title;

						//const url = 'http://192.168.56.101/time/public/uploads/1610917697_123.png'
						const url = 'http://192.168.56.101/time/'+value.path
						console.log(url)
						fetch(url).then(r => r.blob()).then(blob => {
							//const url = window.URL.createObjectURL(blob) console.log(url)
							let file = new File([blob], value.name, {type: 'image/png'})

							that.$refs.files.addFiles([file])
						})
					})*/
				})
				.catch((error) => {
					console.log(error)
          this.$q.notify({
            type: 'negative',
            message: error.message
          })
					//this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
				})

				/*this.$axios.get(this.globalConstants.apiUrl + 'items').then((response) => {
					console.log(response.data)
					this.data = response.data
					this.items = response.data
				})
				.catch(() => {
					this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
				})*/
			},

		}
	}
</script>
