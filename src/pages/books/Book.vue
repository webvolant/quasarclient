<template>
  <q-page class="">
    <div class="q-pa-md"> <!-- style="display: none;" preload="auto" -->
      <audio-player :files="files" v-if="files.length>0"></audio-player>
    </div>
  </q-page>
</template>

<script>
	import AudioPlayer from 'components/AudioPlayer.vue'
	export default {
		//name: 'PageItem',
		components: { AudioPlayer },
		data () {
			return {
				files:[
					///{path:'audio/patrul-0.mp3', name:'Щенки спасают лес'},
					//{path:'audio/patrul-1.mp3', name:'Щенки спасают театр'},
					//{path:'audio/patrul-2.mp3', name:'Щенки спасают лес2'},
					//{path:'audio/patrul-3.mp3', name:'Щенки спасают лес3'},
					//{path:'audio/patrul-4.mp3', name:'Щенки спасают лес4'},
				],
			}
		},
		mounted(){
			this.getItem();
		},
		methods: {
			getItem: function () {
				const that = this;
				this.$axios.get(this.globalConstants.apiUrl + 'items/' + this.$route.params.id).then((response) => {
					//console.log(response.data)
					that.item = response.data.item
					that.item.files.forEach(function (value, index) {
						if(value.type==1){
							value.path = that.globalConstants.imageUrl + value.path
							that.files.push(value)
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
