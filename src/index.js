/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:30:35 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 17:30:18
 * 
 * 入口文件 
 */
const ObjectEnvironmentRecord = require('./ObjectEnvironmentRecord')
const ExecutionContext = require('./ExecutionContext')
const LexicalEnvironment = require('./LexicalEnvironment')


// 创建一个对象式全局管理记录项， 负责登记全局变量（window， 全局变量）
let globalEnvironmentRecords = new ObjectEnvironmentRecord()

// 创建一个词法环境， 用来登记变量和查找变量
let globalLexicalEnvironment = new LexicalEnvironment(globalEnvironmentRecords, globalThis)

// 创建一个全局执行上下文
let globalExecutionContext = new ExecutionContext(globalLexicalEnvironment, globalThis)