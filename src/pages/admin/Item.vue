<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-form class="q-gutter-md" ref="form">
        <q-input filled dense v-model="item.title" label="Название" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Обязательное поле']"/>
        <q-input filled dense v-model="item.slug" label="Ссылка" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Обязательное поле']"/>
        <q-input filled dense v-model="item.description" type="textarea" label="Текст описания"/>
        <q-select filled dense v-model="item.status" :options="status" label="Статус" emit-value map-options/>
        <!--//todo: 1. связанные с этим сказки , сезоны серии
            // 2. добавить порядок для файлов -->

        <!--<q-toggle v-model="expandMeta" label="Meta" class="q-mb-md" />-->

        <q-expansion-item v-model="expandMeta"
          icon="search"
          label="Meta"
          caption="title, description, keywords"
        >
          <q-card>
            <q-card-section>
              <q-input filled dense v-model="item.meta_title" label="SEO заголовок"/>
              <q-input filled dense v-model="item.meta_description" type="textarea" label="SEO описание"/>
              <q-input filled dense v-model="item.meta_keywords" type="textarea" label="SEO ключевые слова"/>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-list>
          <q-item v-for="file in item.files" :key="file.name">

            <q-item-section>
            <q-item-label class="full-width ellipsis">
              {{ file.name }}
            </q-item-label>
            </q-item-section>

            <q-item-section>
              <label></label>
              <input v-model="addons[file.name]" placeholder="" width="100%" />
              <input v-model="positions[file.name]" placeholder="" width="100%" />
            </q-item-section>

            <q-item-section>
              <q-btn class="gt-xs" size="12px" dense @click="removeFile(file)"><q-icon name="delete" /></q-btn>
            </q-item-section>

          </q-item>
        </q-list>

        <q-uploader filled dense style="width: 98%" label="Файлы" multiple ref="files">
          <template v-slot:list="scope">
            <q-list separator>

              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section side>
                  <q-item-label class="full-width ellipsis">
                    {{ file.name }}
                  </q-item-label>

                  <!--<q-item-label caption>
                    Status: {{ file.__status }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>-->
                </q-item-section>

                <q-item-section>
                  <input v-model="addons[file.name]" placeholder="Пример: Глава 1, Петсон идет в поход" width="100%"/>
                </q-item-section>

                <!--<q-item-section
                  v-if="file.__img"
                  thumbnail
                  class="gt-xs"
                >
                  <img :src="file.__img.src">
                </q-item-section>-->

                <q-item-section top side>
                  <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="scope.removeFile(file); removeFile(file)"></q-btn>
                </q-item-section>
              </q-item>

            </q-list>
          </template>
        </q-uploader>

        <!-- option-value="id"
          option-label="value"
          emit-value -->
        <q-select map-options emit-value multiple new-value-mode="add-unique" filled v-model="item.authors" use-input use-chips fill-input input-debounce="0" :options="authors" hint="Автор" style="width: 250px; padding-bottom: 32px"/>
        <q-select map-options label="Теги" filled :options="tags" v-model="item.tags" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" style="width: 250px" hint="Автор"/>

        <div>
          <q-btn :loading="loading1" label="Сохранить" @click="onSubmit()" color="primary"/>
          <q-btn :loading="loading1" label="Сохранить и выйти" @click="onSubmit(true)" color="primary"/>
          <q-btn label="Testing post" type="button" color="primary" @click="testing()"/>
        </div>
      </q-form>
      <br/>
      Отладочная информация: {{ item.tags }}
    </div>
  </q-page>
</template>
<!--@added="addedFilesFunc"-->
<script>
	export default {
		/*this.beforeEach((to, from, next) => {
			if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isSignedIn']) {
				next({ name: 'account-signin', query: { next: to.fullPath } })
			} else {
				next()
			}
		}),*/
		beforeRouteEnter (to, from, next) {
			next(vm => {
				console.log('before router!!')
				// access to component instance via `vm`
			})
		},
		//name: 'PageItem',
		data () {
			return {
        expandMeta:false,
        loading1: false,
				item:{
				  status: 1,
          description: '',
          title: '',
          slug: '',
          files: [],
        },
        /*tags:{
	        type: Array,
        },*/
        tags:[],
        authors:[],
				addons:{
					type: Array,
					//default: null
				},
        positions:{
          type: Array,
          //default: null
        },
        status:[
          {
            label: 'Opened',
            value: 1,
          },
          {
            label: 'Closed',
            value: 2,
          },
          {
            label: 'Closed only files',
            value: 3,
          },
        ],
				//files:[],
				editing: false,
				/*title: 'title1',
        slug: 'slug1',
        description: 'desc'*/
			}
		},
		watch: {
				'item.title'(newVal, oldVal){ if(this.$route.params.id === 'new') { console.log('changed title'); this.item.slug = this.convertStrToSlug(this.item.title) } },
		},
		mounted(){
      console.log('mounted')
			if (this.$route.params.id !== undefined && this.$route.params.id !== 'new') {
				this.getItem();
				this.editing = true;
			} else {
				this.editing = false
			}
      this.expandMeta = !this.editing
		},
		methods: {
			testing: function(){
        this.$router.push({name:'item', params:{id: 'patrol'} })
			},
			removeFile: function(file){
				let fd = new FormData();
				fd.append('name', file.name)
				fd.append('size', file.size)

				this.$axios.post(this.globalConstants.apiUrl + 'item/file/remove', fd).then((response) => {
					//console.log(response)
				})
				.catch(() => {
					this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
				})
      },
			convertStrToSlug(text){
				text = text.toString().toLowerCase().trim();

				const sets = [
					{to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀ]'},
					{to: 'c', from: '[ÇĆĈČ]'},
					{to: 'd', from: '[ÐĎĐÞ]'},
					{to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
					{to: 'g', from: '[ĜĞĢǴ]'},
					{to: 'h', from: '[ĤḦ]'},
					{to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
					{to: 'j', from: '[Ĵ]'},
					{to: 'ij', from: '[Ĳ]'},
					{to: 'k', from: '[Ķ]'},
					{to: 'l', from: '[ĹĻĽŁ]'},
					{to: 'm', from: '[Ḿ]'},
					{to: 'n', from: '[ÑŃŅŇ]'},
					{to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
					{to: 'oe', from: '[Œ]'},
					{to: 'p', from: '[ṕ]'},
					{to: 'r', from: '[ŔŖŘ]'},
					{to: 's', from: '[ßŚŜŞŠȘ]'},
					{to: 't', from: '[ŢŤ]'},
					{to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
					{to: 'w', from: '[ẂŴẀẄ]'},
					{to: 'x', from: '[ẍ]'},
					{to: 'y', from: '[ÝŶŸỲỴỶỸ]'},
					{to: 'z', from: '[ŹŻŽ]'},
					{to: '-', from: '[·/_,:;\']'}
				];

				sets.forEach(set => {
					text = text.replace(new RegExp(set.from,'gi'), set.to)
				});

				return text
				.replace(/\s+/g, '-')    // Replace spaces with -
				.replace(/[^-a-zа-я\u0370-\u03ff\u1f00-\u1fff]+/g, '') // Remove all non-word chars
				.replace(/--+/g, '-')    // Replace multiple - with single -
				.replace(/^-+/, '')      // Trim - from start of text
				.replace(/-+$/, '')      // Trim - from end of text
			},
			/*
			passFile: function(files){
				const that = this;
				//console.log(files)
        files.forEach(function (value, index) {
        	console.log(value)
          //value.addon = 'hell';
	        //this.addons[value.name] = value.title;
	        //that.addons['1613332051_patrul-1.mp3'] = 'new';
          console.log(value)
        })
			},*/
			/*addedFilesFunc(files) {
          const that = this;
          console.log(this.$refs.files.files)
          this.$refs.files.files.forEach(function(value){
              console.log(value)
              const obj = {
                  size: value.size,
                  name: value.name,
                  type: value.type,
              }
              //that.item.files.push(value)
              //that.item.ofiles.push(value)
          });
          //item.files
          //this.selected_file = file[0];
          //this.check_if_document_upload=true
      },
      removedFilesFunc(files) {
          console.log(files)
          //this.selected_file = file[0];
          //this.check_if_document_upload=true
      },*/
			getItem: function () {
				const that = this
        let id = this.$route.params.id
				this.$axios.get(this.globalConstants.apiUrl + 'items/'+id).then((response) => {
					//console.log(response)
					this.item = response.data.item
					this.tags = response.data.tags
					this.authors = response.data.authors

					that.$refs.formFields = []

					this.item.files.forEach(function (value, index) {
						//console.log(value)
						that.addons[value.name] = value.title;
            that.positions[value.name] = value.position;
					})


					/*this.item.files.forEach(function (value, index) {
						console.log(value)

						that.addons[value.name] = value.title;

						//const url = 'http://192.168.56.101/time/public/uploads/1610917697_123.png'
						//const url = 'http://192.168.56.101/time/'+value.path
						const url = that.globalConstants.imageUrl+value.path
            console.log(url)
						fetch(url).then(r => r.blob()).then(blob => {
							//const url = window.URL.createObjectURL(blob) console.log(url)
							let file = new File([blob], value.name, {type: 'image/png'})

							that.$refs.files.addFiles([file])
							that.$refs.formFields.push(value.name)
						})
					})*/
					//this.addons['1613332051_patrul-1.mp3'] = 'new';
					//const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png'
				})
				.catch((error) => {
					this.$q.notify({
						type: 'negative',
						message: error.message
					})
				})
			},
			onSubmit: function (toList = null) {
			  this.loading1 = true
				const that = this
				this.$refs.form.validate().then(success=>{

				let fd = new FormData();
				//fd.append("files", this.$refs.files.files);

				if (this.editing===true) {
					fd.append("id", this.$route.params.id)
				}

				fd.append("title", this.item.title)
				fd.append("slug", this.item.slug)
				fd.append("description", this.item.description)
				fd.append("status", this.item.status)
				fd.append("meta_keywords", this.item.meta_keywords)
				fd.append("meta_title", this.item.meta_title)
				fd.append("meta_description", this.item.meta_description)

        if(this.item.tags !== undefined) fd.append("tags", JSON.stringify(this.item.tags))
        if(this.item.authors !== undefined) fd.append("authors", JSON.stringify(this.item.authors))
        if(this.addons !== undefined) fd.append("addons", JSON.stringify(this.addons))
        if(this.positions !== undefined) fd.append("positions", JSON.stringify(this.positions))


				for( var i = 0; i < this.$refs.files.files.length; i++ ){
					let file = this.$refs.files.files[i]

					//file name
					//file.title = this.addons[file.name]

          //if(this.$refs.formFields)
					//if(!this.$refs.formFields.includes(file.name)){
						//console.log(file)
						fd.append('files[' + i + ']', file)
					//}
				}

				const headers = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}

          this.$axios.post(this.globalConstants.apiUrl + 'item/save', fd, headers).then((response) => {
            let slug = response.data.item.slug
            //this.item = response.data
            if(toList===true){
              this.$router.push({name:'items' })
            }else{
              //if(!this.editing) not all loadign after save in edit
              this.$router.push({name:'item', params:{id: slug}, query: { time: Date.now() } })
            }
            this.loading1 = false
          })
          .catch((error) => {
            console.log(error)
            this.$q.notify({
              type: 'negative',
              message: error.message
            })
          })
        })
			}
		}
	}
</script>
