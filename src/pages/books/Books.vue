<template>
  <q-page class="">
    <div class="q-pa-md"> <!-- style="display: none;" preload="auto" -->

      <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-12 col-sm-6 col-md-3" v-for="(item, index) in items">
          <router-link :to="{name: 'book', params: { id: item.slug } }" custom v-slot="{ navigate }">
            <q-card class="my-card cursor-pointer q-hoverable" v-ripple clickable @click="navigate"> <!--@click="$router.replace('/book/')"-->
              <!--<router-link :to="{name: 'book', params: { id: item.id } }">Перейти</router-link>-->
              <q-img :src="globalConstants.imageUrl + item.files[0].path" v-if="item.files.length>0" style="height: 300px"/>
              <!--:ratio="1" sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"-->



              <q-card-section class="q-mb-md">
                <div class="text-h5">{{ item.title }}</div>
                <!--<div class="text-subtitle2 q-mt-md">количество прослушиваний(рейтинг)</div>-->
                <span class="float-left text-h6" v-for="author in item.authors">{{ author.value }}</span>
                <span class="float-right text-h6">{{ item.duration }}</span>
              </q-card-section>

              <q-card-section class="q-pt-none">
              </q-card-section>
            </q-card>
          </router-link>
          <!---->


        </div>



      </div>



    </div>
  </q-page>
</template>

<script>
	export default {
		//name: 'PageItem',
		data () {
			return {
				items:[
					//{author:'Мультсериал', duration:'12:00', alias:'chenki-patrul', name:'Щенячий патруль', image:'http://192.168.56.101/time/public/uploads/chenki.jpg'},
					//{author:'Эдуард Успенский', duration:'16:00', alias:'findus', name:'Петсон и финдус', image:'http://192.168.56.101/time/public/uploads/prostokvashino.jpg'},
					//{author:'Свен Нурдквист', duration:'21:00', alias:'prosto', name:'Простоквашино', image:'http://192.168.56.101/time/public/uploads/petson-i-findus.jpg'},
				],
			}
		},
		mounted(){
			this.getItems();
		},
		methods: {
			getItems: function () {
				this.$axios.get(this.globalConstants.apiUrl + 'items').then((response) => {
					//console.log(response.data)
					this.data = response.data
          this.items = response.data
				})
				.catch(() => {
					this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
				})
			},
		}
	}
</script>
