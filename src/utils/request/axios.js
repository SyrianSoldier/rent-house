import axios from 'axios'

export class MyAxios {
  constructor(config) {
    this.instance = axios.create(config)
    this.config = config

    this._init()
    return this.instance
  }

  _init() {
    this.initInterceptors()
  }

  initInterceptors() {
    this.instance.interceptors.response.use(res => res.data)
  }
}
