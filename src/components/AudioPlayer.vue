<template>
    <div class=""> <!-- style="display: none;" preload="auto" -->


      <div class="row">
        <div class="col">
          <audio ref="audio" :src="file.path">
            <!--<source src="audio/patrul-0.mp3" type="audio/mpeg">
            Your browser does not support the audio element.-->
          </audio>
          <q-slider v-model="currentSeconds" :min="0" :max="durationSeconds" @change="seek"/>
        </div>

      </div>



      <div class="row justify-center">
        <div class="col">
          <div class="player-time-current" style="margin-top: 5px; font-size: 18px;">{{ convertTime(currentSeconds) }}</div>
        </div>
        <div class="col-auto col-md-auto">
          <q-btn flat color="primary" @click="prev()" icon="fas fa-angle-double-left" />
          <q-btn round size="lg" style="background: #FF0080; color: white" @click="play()" v-if="!playing" icon="fas fa-play" />
          <q-btn round size="lg" color="primary" @click="pause()" v-if="playing" icon="fas fa-pause" />
          <q-btn flat color="primary" @click="next()" icon="fas fa-angle-double-right" />
        </div>
        <div class="col">
          <div class="player-time-total float-right" style="margin-top: 5px; font-size: 18px;">{{ convertTime(durationSeconds) }}</div>
        </div>
      </div>

      <div class="row" style="margin-top: 15px">
        <div class="col">
          <q-list bordered separator style="background: #fdfdfd;">
            <q-item clickable v-ripple v-for="(item, index) in files" :active="file.path === item.path" @click="changeTrack(item)" active-class="text-orange">
              <q-item-label class="text-bold text-h6" style="">{{ item.title }}</q-item-label>
            </q-item>
          </q-list>
        </div>
      </div>

    </div>
</template>



<script>
	import moment from 'moment'
	import lodash from 'lodash'
	export default {
		//name: 'PageItem',
		props: {
			files: {
				type: Array
			}
		},
		data () {
			return {
				audio: undefined,
				file: {
					type: Object,
					default: null
				},
				currentSeconds: 0,
				durationSeconds: 0,
        playing:false,
				//file: null,
				loaded: false,
				//files: this.files,
				/*files:[
          {path:'audio/patrul-0.mp3', name:'Щенки спасают лес'},
					{path:'audio/patrul-1.mp3', name:'Щенки спасают театр'},
					{path:'audio/patrul-2.mp3', name:'Щенки спасают лес2'},
					{path:'audio/patrul-3.mp3', name:'Щенки спасают лес3'},
					{path:'audio/patrul-4.mp3', name:'Щенки спасают лес4'},
				],*/
			}
		},
		mounted(){

		},
		created: function(){
				this.$nextTick(function() {
					this.initPlayer()
					this.audio = this.$refs.audio
					this.$refs.audio.addEventListener('timeupdate', this.update)
					this.$refs.audio.addEventListener('loadeddata', this.load)
					this.$refs.audio.addEventListener('pause', () => { this.playing = false; })
					this.$refs.audio.addEventListener('play', () => { this.playing = true; })
					this.$refs.audio.addEventListener('ended', () => { this.next(); this.playing = true; })
				})
		},
		/*computed: {

			percentComplete() {
				return parseInt(this.currentSeconds / this.durationSeconds * 100);
			},
			muted() {
				return this.volume / 100 === 0;
			}
		},*/
		methods: {
			changeTrack(item){
				this.file = item
        this.$nextTick(function() {
          this.$refs.audio.load()
          //if(this.playing === true) this.$refs.audio.play()
          this.$refs.audio.play()
        })
      },
			load() {
				//console.log(this.$refs.audio.readyState)
				//if (this.$refs.audio.readyState >= 2) {
					this.loaded = true;
					console.log('loaded')
					//if(this.file === null){
						//this.file = this.files[0]
						this.durationSeconds = parseInt(this.$refs.audio.duration);
					//}
					//this.$refs.audio.load()
					//return this.playing = this.autoPlay;
				//}

				//throw new Error('Failed to load sound file.');
			},
			/*getSeconds(time){
				return moment.utc(time).format("SSS")
			},*/
			convertTime(time){
				let temp = moment.duration(time, 'seconds')
				return moment.utc(temp._milliseconds).format("HH:mm:ss")
      },
			update(e) {
				//console.log(this.$refs.audio.currentTime)
				this.currentSeconds = parseInt(this.$refs.audio.currentTime);
			},
			seek(e) {
				/*if (!this.playing) {
					return;
				}*/

				//const el = e.target.getBoundingClientRect();
				//const seekPos = (e.clientX - el.left) / el.width;

				//this.$refs.audio.currentTime = parseInt(this.$refs.audio.duration * seekPos);
        console.log(e);
				this.$refs.audio.currentTime = e;
			},
			initPlayer: function(){
				if(!this.file.path){
					this.file = this.files[0]
					//this.durationSeconds = parseInt(this.$refs.audio.duration);
				}
				this.$refs.audio.load()
      },
			play: function () {
				//this.playing = true
				this.$refs.audio.play()
			},
			pause: function () {
				//this.playing = false
				this.$refs.audio.pause()
			},
			prev: function () {
				const current = _.indexOf(this.files, this.file)
				if(current>0){
					this.file = this.files[current-1]
				}else{
					this.file = this.files[0]
        }
				this.$nextTick(function() {
					this.$refs.audio.load()
					if(this.playing === true) this.$refs.audio.play()
				})
			},
			next: function () {
				const current = _.indexOf(this.files, this.file)
        if(this.files.length > current){
	        this.file = this.files[current+1]
        }
				this.$nextTick(function() {
				  this.$refs.audio.load()
					if(this.playing === true) this.$refs.audio.play()
				})
			},

		}
	}
</script>
<!--
<style>

  .player-progress {
    background-color: #c1c1c1;
    cursor: pointer;
    height: 5px;
    min-width: 200px;
    position: relative;


  }

  .player-seeker {
    background-color: #1976d2;
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;
  }

  .player-seeker::after {
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
    border-radius: 100%;
    right: -10px;
    top: -10px;
    background-color: white;
    border: 1px solid #1976d2;
  }

</style>
-->