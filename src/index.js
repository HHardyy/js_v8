/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:30:35 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 23:10:30
 * 
 * 入口文件 
 */
const ExecutionContext = require('./ExecutionContext')
const ExecutionContextStack = require('./ExecutionContextStack')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')
const LexicalEnvironment = require('./LexicalEnvironment')
const FunctionInstance = require('./FunctionInstance')

// 创建一个上下文执行栈
const ESCstack = new ExecutionContextStack()

// 创建一个对象式全局管理记录项， 负责登记全局变量（window， 全局变量）
let globalEnvironmentRecords = new ObjectEnvironmentRecords(global)
// 创建一个词法环境， 用来登记变量和查找变量
let globalLexicalEnvironment = new LexicalEnvironment(globalEnvironmentRecords, null)
// 创建一个全局执行上下文
let globalExecutionContext = new ExecutionContext(globalLexicalEnvironment, global)

// 全局上下文入栈
ESCstack.push(globalExecutionContext)
// 登记变量
ESCstack.current.LexicalEnvironment.createBinding('a')
ESCstack.current.LexicalEnvironment.setBinding('a', undefined)
// 登记函数 testFn, 函数变量由定义的时候决定
// 静态作用于， 函数的作用域是由在哪里定义决定的，不是在执行的时候决定的

// 变量提成完成了
let testFn = new FunctionInstance(
  'testFn',
  'var b = 2; console.log(a, b);',
  ESCstack.current.LexicalEnvironment  /*当前栈点词法环境*/
)
ESCstack.current.LexicalEnvironment.createBinding('testFn')
ESCstack.current.LexicalEnvironment.setBinding('testFn', testFn)

// 开始执行全局代码
ESCstack.current.LexicalEnvironment.setBinding('a', 1)

// 开始执行函数testFn 
let testFnLexicalEnvironment = LexicalEnvironment.NewDeclearactiveEnvironment(testFn.scope)
let testFnExcutionContext = new ExecutionContext(testFnLexicalEnvironment, global)

ESCstack.push(testFnExcutionContext)
ESCstack.current.LexicalEnvironment.createBinding('b')
ESCstack.current.LexicalEnvironment.setBinding('b', undefined)
// 开始执行
ESCstack.current.LexicalEnvironment.setBinding('b', 2)

console.log(
  ESCstack.current.LexicalEnvironment.GetIdentifierReference('a'),
  ESCstack.current.LexicalEnvironment.GetIdentifierReference('b')
)