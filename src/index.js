/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:30:35 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 23:54:48
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

// console.log(
//   ESCstack.current.LexicalEnvironment.GetIdentifierReference('a'),
//   ESCstack.current.LexicalEnvironment.GetIdentifierReference('b')
// )


/**
 * =======================================================================================
 * 如果遇到新的代码块， 创建一个新词法环境对象， 让新的词法环境对象.outer = 当前的词法环境
 *
 * 开始执行块级代码
 * 只有全局函数才会创建新的执行上下文
 * 块级作用域不会生成新的执行上下文，但是会生成新的词法环境
*/
let oldEnv = ESCstack.current.LexicalEnvironment
// 以oldenv为父级词法环境创建词法环境
let block1Env = LexicalEnvironment.NewDeclearactiveEnvironment(oldEnv)
// block1的变量提升阶段
block1Env.createBinding('c')
block1Env.setBinding('c', { type: 'let', uninitialized: true })
// 让当前执行上下文的词法环境对象指向block1Env
ESCstack.current.LexicalEnvironment = block1Env

// block1Env.getBindingValue("c")
block1Env.setBinding('c', 3)
// console.log(
//   ESCstack.current.LexicalEnvironment.GetIdentifierReference('a'),
//   ESCstack.current.LexicalEnvironment.GetIdentifierReference('b'),
//   ESCstack.current.LexicalEnvironment.GetIdentifierReference('c')
// )

/**
 * 执行完block1之后再退回上一个执行环境
*/
ESCstack.current.LexicalEnvironment = oldEnv

let block2Env = LexicalEnvironment.NewDeclearactiveEnvironment(oldEnv)
block1Env.createBinding('c')
block1Env.setBinding('c', { type: 'let', uninitialized: true })
ESCstack.current.LexicalEnvironment = block2Env
block1Env.setBinding('c', 4)
console.log(
  ESCstack.current.LexicalEnvironment.GetIdentifierReference('a'),
  ESCstack.current.LexicalEnvironment.GetIdentifierReference('b'),
  ESCstack.current.LexicalEnvironment.GetIdentifierReference('c')
)
/**
 * 执行完block1之后再退回上一个执行环境
*/
ESCstack.current.LexicalEnvironment = oldEnv
// 弹出testFn执行上下文
ESCstack.pop()

// 然后那些block就被gc了~
