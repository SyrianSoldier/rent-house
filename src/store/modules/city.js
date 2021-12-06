import storage from '@/utils/storage'
const state = _ => {
  return {
    cureentCity: storage.get('cureentCity'),
    currentCityCode: storage.get('currentCityCode'),
    queryParams: {
      cityId: storage.get('currentCityCode'),
      area: '',
      price: '',
      rentType: '',
      start: 61,
      end: 80,
      more: ''
    }
  }
}

const mutations = {
  setCity(state, { cityName, cityCode }) {
    state.cureentCity = cityName
    state.currentCityCode = cityCode
    storage.set('cureentCity', cityName)
    storage.set('currentCityCode', cityCode)
  },
  updateQueryParams(state, paramsObj) {
    const keys = Object.keys(paramsObj)
    console.log(keys)
    keys.forEach(key => {
      if (paramsObj[key] !== '') {
        // 只要传过来的字段值不为空串, 更新字段
        state.queryParams[key] = paramsObj[key]
      }
    })
  },
  setPage(state, isInit) {
    // 参数为是否初始化, 默认为累加模式
    if (isInit) {
      state.queryParams.start = 61
      state.queryParams.end = 80
    } else {
      state.queryParams.start += 20
      state.queryParams.end += 20
    }
  }
}

export const city = {
  namespaced: true,
  mutations,
  state
}
