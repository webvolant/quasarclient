<template>
    <q-page class="">
        <div class="q-pa-md">

            <div class="row">
                <div class="col">
                    <q-table title="Items" dense :data="data" :columns="columns" row-key="name">
                        <template v-slot:body-cell-id="props">
                            <q-td :props="props">
                                <router-link :to="{name: 'item', params: { id: props.value } }">{{ props.value }}</router-link>
                            </q-td>
                        </template>
                    </q-table>
                </div>
            </div>

        </div>
    </q-page>
</template>

<script>
    export default {
        name: 'PageItems',
        data () {
            return {
                data:[],
                columns: [
                    { name: 'id', label: 'ID', field: 'id' },
                    { name: 'title', label: 'Title', field: 'title' },
                    { name: 'slug', label: 'Slug', field: 'slug' },
                ],
            }
        },
        created(){
            this.getItems();
        },
        methods: {
            getItems: function () {
                this.$axios.get('http://192.168.56.101/time/public/index.php/api/items/').then((response) => {
                    console.log(response)
                    this.data = response.data
                })
                .catch(() => {
                    this.$q.notify({color: 'negative',position: 'top',message: 'Loading failed',icon: 'report_problem'})
                })
            },
        }
    }
</script>
