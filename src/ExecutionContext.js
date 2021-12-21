/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:32:08 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 23:23:25
 * 
 * 全局执行上下文
 * 
 */
class ExecutionContext {
  constructor(LexicalEnvironment /*词法环境*/, thisBinding/*this 指针*/) {
    this.LexicalEnvironment = LexicalEnvironment

    // 变量环境 === 词法环境
    this.variableEnvironment = this.LexicalEnvironment

    this.thisBinding = thisBinding
  }
}

module.exports = ExecutionContext