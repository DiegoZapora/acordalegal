const dataHTML = document.getElementById("dataRelogio")
const horaHTML = document.getElementById("horaRelogio")

const inpA = document.getElementById("inpAlarme")
const res = document.getElementById("res")
const btnA = document.getElementById("btnAtivar")
const btnP = document.getElementById("btnPara")
const alarme = document.getElementById("alarme")

let ts_atual = null
let ts_alarme = null
let alarme_ativo = false
let alarme_tocando = false

let audio = new Audio("./midias/tocar.m4a")
audio.loop = -1

const data = new Date()

let dia = data.getDate()
if (dia < 10) {
    dia = "0"+dia
} else {
    dia
}

let mes = data.getMonth()
if (mes < 10) {
    mes = "0"+(mes + 1)
} else {
    mes+1
}

dataHTML.innerHTML = `${dia}/${mes}/${data.getFullYear()}`

btnA.addEventListener("click", () => {
    if (inpA.value <= 0) {
        window.alert("ERRO! O ALARME PRECISSA TER UM VALOR VALIDO!")
    } else {
        ts_atual = Date.now()
        ts_alarme = ts_atual + (inpA.value*1000)
        alarme_ativo = true
        const dt_alarme = new Date(ts_alarme)

        hora = dt_alarme.getHours()
        hora = hora<10?"0"+hora:hora
        minutos = dt_alarme.getMinutes()
        minutos = minutos<10?"0"+minutos:minutos
        segundos = dt_alarme.getSeconds()
        segundos = segundos<10?"0"+segundos:segundos

        res.innerHTML = `Proximo alarme em: ${hora}:${minutos}:${segundos}`
    }
})

btnP.addEventListener("click", () => {
    if (alarme_ativo == true) {
        alarme_ativo = false
        alarme_tocando = false
        inpA.value = "" 
        res.innerHTML = "Adicione um alarme."
        audio.pause()
        audio.currentTime = 0
        alarme.classList.remove("ativo")
    } else {
        window.alert("ERRO! NENHUM ALARME PROGRAMADO")
    }
    
})

const relogio = () => {
    const data = new Date()

    let hora = data.getHours()
    hora = hora < 10 ? "0" + hora : hora
    let minutos = data.getMinutes()
    minutos = minutos < 10 ? "0" + minutos : minutos
    let segundos = data.getSeconds()
    segundos = segundos < 10 ? "0" + segundos : segundos

    let completo = `${hora}:${minutos}:${segundos}`

    horaHTML.innerHTML = completo

    if (alarme_ativo == true && !alarme_tocando) {
        if (data.getTime() >= ts_alarme) {

            alarme_tocando = true
            audio.play()
            alarme.classList.add("ativo")
        }
    }
}

const intervalo = setInterval(relogio, 1000)

relogio()