/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:32:08 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 16:37:15
 * 
 * 全局执行上下文
 * 
 */
class ExecutionContext {
  constructor(LexicalEnvironment /*词法环境*/, thisBinding/*this 指针*/) {
    this.LexicalEnvironment = LexicalEnvironment
    this.thisBinding = thisBinding
  }
}

module.exports = ExecutionContext