const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
    delay(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    
    },

    shuffle(array){
        const arr = array.slice(0)
        for(let i = arr.length - 1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr;
    },

    list(arr, conj = 'and'){
        const len = arr.length;
        return `${arr.slice(0, -1).join(', ')}${len > 2 ? ',': ''}`
    },

    isNumber(){
        return /^\d+$/.test(this)
    },
    
    random(){
        return Math.floor(Math.random() * this.length)
    }

}