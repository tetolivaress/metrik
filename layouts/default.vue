<template lang="pug">
  v-app(dark='')
    v-main
      v-container
        nuxt
    v-navigation-drawer(v-model='rightDrawer' :right='right' temporary='' fixed='')
      v-list
        v-list-item(@click.native='right = !right')
          v-list-item-action
            v-icon(light='') mdi-repeat
          v-list-item-title Switch drawer (click me)
    v-footer(:absolute='!fixed' app='')
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
