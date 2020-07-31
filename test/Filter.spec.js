import { mount } from '@vue/test-utils'
import Filter from '~/components/Filter'

describe('Component Filter', () => {
  test('Filter has Text', () => {
    const wrapper = mount(Filter)
    const switchCoin = wrapper.find('v-switch')
    expect(switchCoin.exists()).toBe(true)
  })

  test('Filter name', () => {
    const wrapper = mount(Filter)
    expect(wrapper.name()).toBe('CoinFilter')
  })

  test('Method changeApiParam is working', () => {
    const changeApiParam = jest.fn()
    const wrapper = mount(Filter, {
      methods: {
        changeApiParam,
      },
    })
    expect(changeApiParam).toHaveBeenCalledTimes(0)
    const switchCoin = wrapper.find('v-switch')
    switchCoin.trigger('change')
    expect(changeApiParam).toHaveBeenCalledTimes(1)
  })

  test('Okay Dolar is selected', () => {
    const wrapper = mount(Filter)
    wrapper.vm.changeApiParam(false)
    expect(wrapper.vm.apiParam).toBe('dolar_intercambio')
  })

  test('Observed Dolar is selected', () => {
    const wrapper = mount(Filter)
    wrapper.vm.changeApiParam(true)
    expect(wrapper.vm.apiParam).toBe('dolar')
  })
})
