<template>
  <q-page class="">
    <div class="q-pa-md">

      <div class="row">
        <div class="col">
          <q-table title="Items" dense :data="data" :columns="columns" row-key="name">
            <template v-slot:body-cell-title="props">
              <q-td :props="props">
                <router-link :to="{name: 'item', params: { id: props.row.slug } }">{{ props.row.title }}</router-link>
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
					/*{
						align: 'left',
						sortable: true
					},*/
					//{ name: 'id', label: 'ID', field: 'id' },
					{ name: 'title', label: 'Title', field: 'title', align: 'left'},
					{ name: 'slug', label: 'Slug', field: 'slug', align: 'left'},
				],
			}
		},
		created(){
			this.getItems();
		},
		methods: {
			getItems: function () {
				this.$axios.get(this.globalConstants.apiUrl + 'items').then((response) => {
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
