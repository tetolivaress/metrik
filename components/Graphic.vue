<template lang="pug">
  v-flex
    h1 Variaci&oacute;n del Precio del D&oacute;lar, A&ntilde;o: {{ selectedYear }}
    v-select(v-model='selectedYear' :items='years' label='Seleccione un año')
    chart(v-if='chartData' :chart-data='chartData')
</template>
<script>
import moment from 'moment'
import { getDataByYear } from '~/services/dataService'
import Chart from '~/components/Chart'
moment.locale('es')

export default {
  components: { Chart },
  props: {
    dolarType: {
      type: String,
      default: 'dolar',
    },
  },
  data() {
    return {
      isLoading: true,
      dayModal: false,
      currency: 'dolar',
      dollarPrices: [],
      chartData: null,
      years: ['2019', '2020'],
      selectedYear: '2019',
      loading: false,
    }
  },
  computed: {
    dates() {
      return this.dollarPrices.map(({ fecha }) => moment(fecha).format('l'))
    },
    prices() {
      return this.dollarPrices.map(({ valor }) => valor)
    },
  },
  watch: {
    async selectedYear(newVal) {
      const res = await getDataByYear(this.dolarType, newVal)
      this.dollarPrices = res.data.serie
      const chartData = {
        labels: this.dates.reverse(),
        datasets: [
          {
            label: 'Precio del Dólar en Pesos Chilenos',
            borderColor: '#f87979',
            data: this.prices.reverse(),
          },
        ],
      }
      this.chartData = chartData
    },
    async dolarType(newVal) {
      const res = await getDataByYear(newVal, this.selectedYear)
      this.dollarPrices = res.data.serie
      const chartData = {
        labels: this.dates.reverse(),
        datasets: [
          {
            label: 'Precio del Dólar en Pesos Chilenos',
            borderColor: '#f87979',
            data: this.prices.reverse(),
          },
        ],
      }
      this.chartData = chartData
    },
  },
  async created() {
    const res = await getDataByYear(this.dolarType, this.years[0])
    this.dollarPrices = res.data.serie

    const chartData = {
      labels: this.dates.reverse(),
      datasets: [
        {
          label: 'Valor',
          borderColor: '#f87979',
          data: this.prices.reverse(),
        },
      ],
    }
    this.chartData = chartData
  },
}
</script>
<style lang="sass">
h1
  font-size: 18px
</style>
