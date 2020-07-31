<template lang="pug">
  v-flex
    h1 Variación del Precio del Dólar, Fecha: {{ date | formatDate }}
    span(v-if="empty") No tenemos registro de la fecha seleccionada
    template(v-else-if='!empty')
      bar-chart(:chart-data='chartData')
      p(v-if="variation < 0") El precio del dolar descendió {{ variation.toFixed(2) }} Pesos chilenos
      p(v-if="variation > 0") El precio del dolar aumentó {{ variation.toFixed(2) }} Pesos chilenos
</template>
<script>
import moment from 'moment'
import { getDataByDate } from '~/services/dataService'
// import BarChart from '~/components/BarChart'

moment.locale('es')
export default {
  filters: {
    formatDate(val) {
      return moment(val).format('DD-MM-YYYY').toString()
    },
  },
  props: {
    date: {
      type: String,
      // required: true,
      default: moment().format('DD-MM-YYYY'),
    },
    dolarType: {
      type: String,
      default: 'dolar',
    },
  },
  data() {
    return {
      chartData: null,
      dollarPrices: null,
      previousDate: '',
      variation: 0,
      empty: false,
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
    async date(newVal) {
      await this.getDollarData()
    },
  },
  async created() {
    this.previousDate = moment(this.date)
    await this.getDollarData()
  },
  methods: {
    async getDollarData() {
      const date = moment(this.date).format('DD-MM-YYYY').toString()
      let previousDate = moment(this.date).subtract(1, 'days')
      previousDate = previousDate.format('DD-MM-YYYY').toString()

      const res = await getDataByDate(this.dolarType, date)
      const res2 = await getDataByDate(this.dolarType, previousDate)
      this.empty = !res.data.serie.length || !res2.data.serie.length
      if (!this.empty) {
        this.dollarPrices = res.data.serie
        this.dollarPrices[1] = res2.data.serie[0]
        this.chartData = {
          labels: this.dates.reverse(),
          datasets: [
            {
              label: 'Precio del Dólar en Pesos Chilenos',
              backgroundColor: '#f87979',
              data: this.prices.reverse(),
            },
          ],
        }
        this.variation = this.dollarPrices[0].valor - this.dollarPrices[1].valor
      }
      // console.log(this.dollarPrices[0].valor - this.dollarPrices[1].valor)
    },
  },
}
</script>
