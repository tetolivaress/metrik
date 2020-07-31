<template lang="pug">
  v-layout(column justify-center align-center)
    coin-filter( @changedDolar="anotherDolar($event)" @changedYearParam="isYear($event)" )    
    transition( :name="year ? 'daily' : 'annually'" mode="out-in" )
      graphic( :dolarType="dolar" v-if="year")
      div(v-else)
        v-date-picker(locale="es" v-model="picker" @change="selecedDay($event)")
        v-dialog(v-model='dayModal' width='500')
          v-card
            DailyGraphic( :date="selectedDay" )
            v-divider
            v-card-actions
              v-spacer
              v-btn(color='primary' text='' @click='dayModal = false')
                | Cerrar
    nuxt-link(to="/daily") Precio De Hoy
</template>
<script>
import CoinFilter from '~/components/Filter.vue'
import DailyGraphic from '~/components/DailyGraphic.vue'
import Graphic from '~/components/Graphic.vue'

export default {
  components: {
    CoinFilter,
    DailyGraphic,
    Graphic,
  },
  data() {
    return {
      picker: '',
      selectedDay: '',
      dayModal: false,
      dolar: 'dolar',
      year: true,
    }
  },
  methods: {
    anotherDolar(e) {
      this.dolar = e
    },
    isYear(e) {
      this.year = e
    },
    selecedDay(day) {
      this.selectedDay = day
      this.dayModal = true
    },
  },
}
</script>
<style lang="sass">
.daily-enter-active
  transition: .45s
.daily-leave-active
  transition: .45s
.daily-enter
  transform: translateX(100vw)
.daily-leave-to
  transform: translateX(-100vw)
.annually-enter-active
  transition: .45s
.annually-leave-active
  transition: .45s
.annually-enter
  transform: translateX(-100vw)
.annually-leave-to
  transform: translateX(100vw)
</style>
