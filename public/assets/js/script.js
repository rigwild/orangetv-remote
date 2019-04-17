'use strict'

const buttonList = {
  'power': 116,
  'menu': 139,
  'up': 103,
  'left': 105,
  'ok': 352,
  'right': 106,
  'down': 108,
  'back': 158,
  'volUp': 115,
  'chanUp': 402,
  'volDown': 114,
  'chanDown': 403,
  'mute': 113,
  '0': 512,
  '1': 513,
  '2': 514,
  '3': 515,
  '4': 516,
  '5': 517,
  '6': 518,
  '7': 519,
  '8': 520,
  '9': 521,
  'stop': 166,
  'play-pause': 164,
  'record': 167,
  'backward': 168,
  'forward': 159,
  'vod': 393
}

new Vue({
  el: '#app',
  data: {
    configMenu: true,
    ip: '192.168.1.16',
    port: 8080
  },
  methods: {
    // Get the full url to the API
    getApiPrefix() {
      return `http://${this.ip}:${this.port}/remoteControl/cmd`
    },

    // Check configuration is valid
    async checkConfig() {
      return fetch(`${this.getApiPrefix()}?operation=10`)
        .then(res => res.json())
        .then(res => {
          if (res.result.message === 'ok')
            this.configMenu = false
        })
        .catch(() => false)
    },

    // Push a button of the remote
    pushButton(buttonName) {
      const buttonId = buttonList[buttonName]
      const qs = new URLSearchParams({
        operation: '01',
        key: buttonId,
        mode: '0'
      })
      fetch(`${this.getApiPrefix()}?${qs}`).catch(err => console.error('Failed activating the button', err))
    }
  }
})
