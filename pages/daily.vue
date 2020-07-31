<template lang="pug">
v-layout(column justify-center align-center)
  daily-graphic( :dolarType="dolar" :date="date" )
  nuxt-link(to="/") Volver al inicio
</template>

<script>
// import moment from 'moment'
import DailyGraphic from '~/components/DailyGraphic.vue'

export default {
  components: { DailyGraphic },
  data() {
    return {
      date: '2020-7-31',
      dolar: 'dolar',
    }
  },
}
</script>

<style></style>
