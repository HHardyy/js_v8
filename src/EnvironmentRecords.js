/*
 * @Author: 小方块
 * @Date: 2021-12-21 16:42:19
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 16:46:49
 *
 * 管理记录项， 用于登记记录所有的绑定变量
 *
 */
class EnvironmentRecords {
  constructor(bindings) {
    this.bindings = bindings || {}
  }
  createBinding(K) {
    this.bindings[K] = undefined
  }
  setBinding(K, V) {
    this.bindings[K] = V
  }
  hasBindings(K) {
    return K in this.bindings
  }
  getBindingValue(K) {
    return this.bindings[K]
  }
}

module.exports = EnvironmentRecords