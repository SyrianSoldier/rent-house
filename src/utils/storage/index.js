class LocalStorage {
  get(key) {
    // 若本地存储的为JSON格式, 则返回转义过的数据
    // 若本地存储的为普通字符串, 则返回普通字符串
    // 不能都用JSON.parse()返回数据, JSON.parse解析普通字符串会报错
    const ret = localStorage.getItem(key)
    try {
      return JSON.parse(ret) // 报错了就返回普通字符串
    } catch (err) {
      return ret
    }
  }

  set(key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  remove(key) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}
export default new LocalStorage()
