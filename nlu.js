const TelegrafWit = require('telegraf-wit')

const wit = new TelegrafWit('RW6CG24E72IHKLTCCSMLENVBRJDXEDT5')

module.exports=(message)=>{
    return new Promise((resolve,reject)=>{
        wit.meaning()
    })
}