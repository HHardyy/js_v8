/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:58:05 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 17:37:21
 * 
 * 词法环境
 *  
 */

class LexicalEnvironment {
  constructor(environmentRecord /*管理记录项*/, outer /*外部词法环境*/) {
    this.environmentRecord = environmentRecord
    this.outer = outer
  }

  // 创建变量 || 登记变量
  createBinding(K) {
    this.environmentRecord.bindings[K] = undefined
  }

  // 设置变量的值
  setBinding(K, V) {
    this.environmentRecord.bindings[K] = V
  }

  // 判断某个变量是否登记过
  hasBindings(K) {
    return K in this.environmentRecord.bindings
  }

  // 获取变量的值
  getBindingValue(K) {
    return this.environmentRecord.bindings[k]
  }

  // 获取某个变量对应的值
  getIdentifierReference(name) {
    let lexicalEnvironment = this

    do {
      let exists = lexicalEnvironment.hasBindings(name)
      if (exists) {
        return lexicalEnvironment.getBindingValue(name)
      } else {
        lexicalEnvironment = lexicalEnvironment.outer
      }
    } while (lexicalEnvironment)
  }
}

module.exports = LexicalEnvironment