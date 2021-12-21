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
  createBinding(N) {
    this.bindings[N] = undefined
  }
  setBinding(N, V) {
    this.bindings[N] = V
  }
  hasBinding(N) {
    return N in this.bindings
  }
  getBindingValue(N) {
    return this.bindings[N]
  }
}

module.exports = EnvironmentRecords