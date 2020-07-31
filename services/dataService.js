import axios from 'axios'
const URL = 'https://mindicador.cl/api'

function getDataByYear(currency = 'dolar', year = '2019') {
  const url = `${URL}/${currency}/${year}`
  return axios.get(url)
}

function getDataByDate(currency = 'dolar', date) {
  const url = `${URL}/${currency}/${date}`
  return axios.get(url)
}

export { getDataByYear, getDataByDate }
