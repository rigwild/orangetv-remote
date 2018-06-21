const orangeTvRemoteHttp = require('./assets/js/orangeTvRemoteHttp.js');

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
];

const addButtonEvent = tvIP => {
  buttonList.forEach(x => {
    const ele = document.getElementById(x.name);
    if (ele) ele.addEventListener('click', () => orangeTvRemoteHttp.pushButton(tvIP, x.id));
  });
}

orangeTvRemoteHttp.findTvIP()
  .catch(err => console.error("Could not find the Orange TV's IP.", err))
  .then(tvIP => {
    console.log("Found your Orange TV's IP : " + tvIP);
    addButtonEvent(tvIP);
  })