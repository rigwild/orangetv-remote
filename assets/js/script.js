const http = require('http')
const querystring = require('querystring')

const tvIP = process.env.tvIP
const tvPort = process.env.tvPort
console.log(tvIP,tvPort)

const buttonList = [
  {name: 'power', id: 116},
  {name: 'menu', id: 139},
  {name: 'up', id: 103},
  {name: 'left', id: 105},
  {name: 'ok', id: 352},
  {name: 'right', id: 106},
  {name: 'down', id: 108},
  {name: 'back', id: 158},
  {name: 'volUp', id: 115},
  {name: 'chanUp', id: 402},
  {name: 'volDown', id: 114},
  {name: 'chanDown', id: 403},
  {name: 'mute', id: 113},
  {name: '0', id: 512},
  {name: '1', id: 513},
  {name: '2', id: 514},
  {name: '3', id: 515},
  {name: '4', id: 516},
  {name: '5', id: 517},
  {name: '6', id: 518},
  {name: '7', id: 519},
  {name: '8', id: 520},
  {name: '9', id: 521},
  {name: 'stop', id: 166},
  {name: 'play-pause', id: 164},
  {name: 'record', id: 167},
  {name: 'backward', id: 168},
  {name: 'forward', id: 159},
  {name: 'vod', id: 393}
]

//A http request wrapper
const request = (ip, port, path, method, query) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: ip,
      path: path + (query ? '?' + query : ''),
      port: port,
      method: method
    }
    const req = http.request(options, res => {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', chunk => rawData += chunk)
      res.on('end', () => resolve(rawData))
    })
    req.on('error', (e) => reject(e))
    req.end()
  })

//Push a button of the remote
const pushButton = buttonId => {
  let query = {
    operation: "01",
    key: buttonId,
    mode: "0"
  };
  request(tvIP, tvPort, '/remoteControl/cmd', 'GET', querystring.stringify(query))
    .catch(err => console.error('Failed activating the button', err))
}

const addButtonEvent = () =>
  buttonList.forEach(x => {
    const ele = document.getElementById(x.name)
    if (ele) ele.addEventListener('click', () => pushButton(x.id))
  })

document.addEventListener("DOMContentLoaded", () => addButtonEvent(tvIP))