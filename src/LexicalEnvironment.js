/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:58:05 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 23:34:37
 * 
 * 词法环境
 *  
 */

const DeclarativeEnvironmentRecords = require('./DeclarativeEnvironmentRecords')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')

class LexicalEnvironment {
  constructor(environmentRecord /*管理记录项*/, outer /*外部词法环境*/) {
    this.environmentRecord = environmentRecord
    this.outer = outer
  }
  // 创建变量 || 登记变量
  createBinding(N) {
    this.environmentRecord.createBinding(N)
  }
  // 设置变量的值
  setBinding(N, V) {
    this.environmentRecord.setBinding(N, V)
  }
  // 判断某个变量是否登记过
  hasBinding(N) {
    return this.environmentRecord.hasBinding(N)
  }
  // 获取变量的值
  getBindingValue(N) {
    return this.environmentRecord.getBindingValue(N)
  }
  // 获取某个变量对应的值
  GetIdentifierReference(name) {
    let lexicalEnvironment = this
    do {
      let exists = lexicalEnvironment.hasBinding(name)
      if (exists) {
        return lexicalEnvironment.getBindingValue(name)
      } else {
        lexicalEnvironment = lexicalEnvironment.outer
      }
    } while (lexicalEnvironment)
  }
  static NewDeclearactiveEnvironment(outerLexicalEnvironment) {
    let envRec = new DeclarativeEnvironmentRecords()
    let env = new LexicalEnvironment(envRec, outerLexicalEnvironment)
    return env
  }
  static NewObjectEnvironmentRecords(object, outerLexicalEnvironment) {
    let envRec = new ObjectEnvironmentRecords(object)
    let env = new LexicalEnvironment(envRec, outerLexicalEnvironment)
    return env
  }
}

module.exports = LexicalEnvironment