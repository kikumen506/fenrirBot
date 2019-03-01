var express = require('express');
var request = require('sync-request')
const Telegraf = require('telegraf')
const nlu = require('./nlu')

const app = express()
const bot = new Telegraf("777516604:AAFjZ7OwP0TpoidSEOsdgKe9AUHXUQAT2Hc")

bot.telegram.setWebhook('https://ee7d29cc.ngrok.io/ruta-secreta')

app.get('/', (req, res) => res.send('Hello World!'))
app.use(bot.webhookCallback('/ruta-secreta'))

app.post('/ruta-secreta', (req, res) => {
  console.log('ENTRA POST')
  res.send('test')
})

bot.start((ctx) => ctx.reply('Di amigo y entra'))

bot.command('help', (ctx) => ctx.reply('/creator:muestra la informacion sobre el equipo a cargo del proyecto.\n /weather Ciudad: consulta la temperatura y el estado actual de tu ciudad.\n /whereami Direccion: devuelve al ususario la latitud y longitud de la direccion que especifique en el comando'))

bot.command('creator', (ctx) => ctx.reply('El equipo de desarrollo: Jymmy, Mario y Kike'))

bot.command('weather', (ctx) => {
  let pos = ctx.message.text.indexOf(' ')
  let ciudadElegida = ctx.message.text.substring(pos).trim()

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
 
})

bot.command('whereami', (ctx) => {
  let pos = ctx.message.text.indexOf(' ')
  let ciudad = ctx.message.text.substring(pos).trim()
  
  try{
    
    var res = request('GET', 'https://geocode.xyz/' + ciudad + '?auth=140751324591381313120x1898&json=1')
    
    let json = JSON.parse(res.getBody().toString())

    let longitud = (json.longt)
    let latitud = (json.latt)
    
    let image =  `https://maps.googleapis.com/maps/api/staticmap?center=${latitud},${longitud}&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${latitud},${longitud}&key=AIzaSyDL6bCkarkfr91Sr_kZgdF9WdbjVRzXI0g`

    console.log(image)

    ctx.reply('La longitud de '+ciudad+' es '+longitud+' y la   latitud '+latitud)
    ctx.replyWithPhoto(image)

  } catch (err) {
    console.log(err.message)
    ctx.reply('Ciudad no existente')

  }

})

bot.on('text', (ctx)=>{
  nlu(ctx.message.text)
  ctx.reply(ctx.message)
})

app.listen(3333, () => {
  console.log('Example app listening on port 3000!')
})
