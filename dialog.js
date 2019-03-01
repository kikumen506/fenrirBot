let fs = require('fs')


module.exports = (message)=>{
    return new Promise((resolve,reject)=>{
        if(message.nlu.entities && message.nlu.entities.intent && message.nlu.entities.intent.length > 0){
            let fileName = message.nlu.entities.intent[0].value
            fs.readFile(`./frases/${fileName}`, (err,content)=>{
                let frases = content.toString().split('\n')
                resolve(frases[Math.round(Math.random()*frases.length)])
            })
           
        } else {
            resolve(`No comprendo tus palabras, ¡habla bien copon!`)
        }
    })
    
}