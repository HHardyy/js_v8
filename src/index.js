/*
 * @Author: 小方块 
 * @Date: 2021-12-21 16:30:35 
 * @Last Modified by: 小方块
 * @Last Modified time: 2021-12-21 17:54:00
 * 
 * 入口文件 
 */
const ExecutionContext = require('./ExecutionContext')
const ExecutionContextStack = require('./ExecutionContextStack')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')
const LexicalEnvironment = require('./LexicalEnvironment')

// 创建一个对象式全局管理记录项， 负责登记全局变量（window， 全局变量）
let globalEnvironmentRecords = new ObjectEnvironmentRecords(global)
// 创建一个词法环境， 用来登记变量和查找变量
let globalLexicalEnvironment = new LexicalEnvironment(globalEnvironmentRecords, null)
// 创建一个全局执行上下文
let globalExecutionContext = new ExecutionContext(globalLexicalEnvironment, globalThis)