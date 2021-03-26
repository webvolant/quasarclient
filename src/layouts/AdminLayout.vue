<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">Меню</q-item-label>
        <q-item clickable v-ripple><q-item-section><router-link :to="{name: 'items', params: { } }">Все аудиосказки</router-link></q-item-section></q-item>
        <q-item clickable v-ripple><q-item-section><router-link :to="{name: 'item', params: { id: 'new' }, query: { time: Date.now() } }">Добавить новую книгу</router-link></q-item-section></q-item>

        <q-item clickable v-ripple><q-item-section><router-link :to="{name: 'books', params: { } }">Каталог</router-link></q-item-section></q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
	import EssentialLink from 'components/EssentialLink.vue'

	const linksData = [
		{
			title: 'Docs',
			caption: 'quasar.dev',
			icon: 'school',
			link: 'https://quasar.dev'
		},
		{
			title: 'Quasar Awesome',
			caption: 'Community Quasar projects',
			icon: 'favorite',
			link: 'https://awesome.quasar.dev'
		}
	]

	export default {
		name: 'AdminLayout',
		components: { EssentialLink },
		data () {
			return {
				leftDrawerOpen: false,
				essentialLinks: linksData
			}
		}
	}
</script>
