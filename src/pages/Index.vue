<template>
  <q-page class="">
    <div class="q-pa-md"> <!-- style="display: none;" preload="auto" -->
      <audio-player>
      </audio-player>
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
					'audio/patrul-0.mp3',
					'audio/patrul-1.mp3',
					'audio/patrul-2.mp3',
					'audio/patrul-3.mp3',
					'audio/patrul-4.mp3',
        ],
			}
		},
		mounted(){
			console.log('INDEX AUDIO page')
		},
		methods: {


		}
	}
</script>
