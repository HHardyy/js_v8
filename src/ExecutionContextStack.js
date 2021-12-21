/*
 * @Author: 小方块
 * @Date: 2021-12-21 16:31:43
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 18:31:10
 *
 * 执行栈(执行上下文栈)  先进后出
 */

class ExecutionContextStack {
  constructor() {
    this.excutionContexts = []
  }
  push(excutionContext) {
    this.excutionContexts.push(excutionContext)
  }
  pop() {
    this.excutionContexts.pop()
  }
  // 获取当前执行上下文
  get current() {
    return this.excutionContexts[this.excutionContexts.length - 1]
  }
}

module.exports = ExecutionContextStack