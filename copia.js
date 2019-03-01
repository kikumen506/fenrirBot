var express = require('express');
var request = require('sync-request')
const Telegraf = require('telegraf')

const app = express()
const bot = new Telegraf("777516604:AAFjZ7OwP0TpoidSEOsdgKe9AUHXUQAT2Hc")

bot.telegram.setWebhook('https://29678f50.ngrok.io/ruta-secreta')

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bot.webhookCallback('/ruta-secreta'))

app.post('/ruta-secreta', (req, res) => {
  console.log('ENTRA POST')
  res.send('test')
})


bot.command('help', (ctx) => ctx.reply('/creator:muestra la informacion sobre el equipo a cargo del proyecto, /weather Ciudad: consulta la temperatura y el estado actual de tu ciudad, /whereami Direccion: devuelve al ususario la latitud y longitud de la direccion que especifique en el comando'))

bot.command('creator', (ctx) => ctx.reply('El equipo de desarrollo: Jymmy, Mario y Kike'))

bot.command('weather', (ctx) => {
  const ciudad = ctx.message.text.split(' ')
  let ciudadElegida = ciudad[1]

  try {
    var res = request('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudadElegida + '&units=metric&lang=es&APPID=167c7dd8e5dbfe65b6d448c20d4ef0e0');
    let json = JSON.parse(res.getBody().toString())
    let description = (json.weather[0].description)
    let temp_min = (json.main.temp_min)
    let temp_max = (json.main.temp_max)
    ctx.reply('La maxima en: ' + ciudadElegida + ' es ' + temp_max + ' C, la minima es: ' + temp_min + ' C, el tiempo esta: ' + description)
  } catch (err) {
    ctx.reply('Ciudad no existente')
  }
  // ctx.reply(temp_min),
  // ctx.reply(temp_max)



})


bot.command('whereami', (ctx) => {
  //const ubicacion = ctx.message.text.split(' ')
  // let ubicacionElegida = ubicacion[1]

  let pos = ctx.message.text.indexOf(' ')
  let ciudad = ctx.message.text.substring(pos).trim()

  try{
    
    var res = request('GET', 'https://geocode.xyz/' + ciudad + '?auth=140751324591381313120x1898&json=1')

    let json = JSON.parse(res.getBody().toString())

    let longitud = (json.longt)
    let latitud = (json.latt)

    ctx.reply('La longitud de '+ciudad+' es '+longitud+' y la   latitud '+latitud)

  } catch (err) {
    console.log(err.message)
    ctx.reply('Ciudad no existente')

  }
    
  



})
