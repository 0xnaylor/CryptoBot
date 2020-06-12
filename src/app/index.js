const pricing = require('pricing')
const database = require('database')
const util = require('util')
const Price = require('../model/price')

const setTimeoutPromise = util.promisify(setTimeout)
pricing.setCurrency('BTC-GBP')

const mainLoop = async () => {

  const prices = await pricing.getPrices();
  const price = await Price.create(prices)
  console.log(prices)

  const time = 5 * 1000
  await setTimeoutPromise(time)
  mainLoop()
}

module.exports = {


  start: async () => {
    
    await database.connect()
    mainLoop()

  }
}


