<template>
    <q-page class="">
        <div class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled dense v-model="item.title" label="Your name *" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/>
            <q-input filled dense v-model="item.slug" label="Your name *" hint="" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"/>
            <q-input v-model="item.description" filled type="textarea"/>


            <q-uploader
              label="Files"
              multiple
              ref="files"
            />
            {{ item }}
            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
            </div>
        </q-form>
        </div>
    </q-page>
</template>
<!--@added="addedFilesFunc"-->
<script>
export default {
    //name: 'PageItem',
    data () {
        return {
            item:{},
            //files:[],
            editing: false,
            /*title: 'title1',
            slug: 'slug1',
            description: 'desc'*/
        }
    },
    mounted(){

        console.log('ehllo ! items')
        console.log(this.$route.params.id)
        //if ("id" in this.$route.params) {
        if (this.$route.params.id !== undefined) {
            this.getItem();
            this.editing = true;
        } else {
            console.log("ups");
        }
    },
    methods: {
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
            this.$axios.get('http://192.168.56.101/time/public/index.php/api/items/'+this.$route.params.id).then((response) => {
                //console.log(response)
                this.item = response.data
                const url = 'http://192.168.56.101/time/public/uploads/1610917697_123.png'
                //const url = '/storage/uploads/1610917697_123.png'
                fetch(url).then(r => r.blob()).then(blob => {
                    //const url = window.URL.createObjectURL(blob) console.log(url)
                    let file = new File([blob], 'newname', {type: 'image/png'})
                    this.$refs.files.addFiles([file])
                })
                //const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png'
            })
            .catch(() => {
                this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
            })
        },
        onSubmit: function () {
            let fd = new FormData();
            //fd.append("files", this.$refs.files.files);

            if (this.$route.params.id !== undefined) {
                fd.append("id", this.$route.params.id)
            }

            fd.append("title", this.item.title)
            fd.append("slug", this.item.slug)
            fd.append("description", this.item.description)

            for( var i = 0; i < this.$refs.files.files.length; i++ ){
                let file = this.$refs.files.files[i];
                fd.append('files[' + i + ']', file)
            }

            const headers = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            //const that = this;
            console.log('submitted')
            this.$axios.post('http://192.168.56.101/time/public/index.php/api/item/save', fd, headers).then((response) => {
                console.log(response)
                //this.item = response.data
            })
            .catch(() => {
                this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
            })
        }
    }
}
</script>
