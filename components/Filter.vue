<template lang="pug">
  span
    v-switch( v-model="switchYear" :label="switchYear ? 'Año' : 'Día'" @change="changeYearParam($event)")
    v-switch( v-show="switchYear" v-model="switchCoin" :label="switchCoin ? 'Dolar' : 'Dólar Intercambio'" @change="changeApiParam($event)")
</template>
<script>
export default {
  name: 'CoinFilter',
  data() {
    return {
      switchYear: true,
      switchCoin: true,
      apiParam: 'dolar',
    }
  },
  methods: {
    changeApiParam(e) {
      e ? (this.apiParam = 'dolar') : (this.apiParam = 'dolar_intercambio')
      this.$emit('changedDolar', this.apiParam)
    },
    changeYearParam(e) {
      e ? (this.switchYear = e) : (this.switchYear = e)
      this.$emit('changedYearParam', this.switchYear)
    },
  },
}
</script>
