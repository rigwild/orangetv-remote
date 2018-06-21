const http = require('http');
const isReachable = require('is-reachable');
const querystring = require('querystring');

const ipPrefix = '192.168.1.';
const tvPort = 8080;

//Ping all hosts on the same sub-network and resolve all alive ones IP
const findAliveHostsIP = async () => (await Promise.all(
  Array.from(new Array(255))
  .map(async (_, i) => (await isReachable(`http://${ipPrefix}${i + 1}:${tvPort}`, {timeout: 500}) && `${ipPrefix}${i+1}`))
)).filter(x => x);


//Http request function
const request = (ip, port, path, method, query) =>
  new Promise((resolve, reject) => {
    const options = {
      hostname: ip,
      path: path + (query ? '?' + query : ''),
      port: port,
      method: method
    };
    const req = http.request(options, res => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => resolve(rawData));
    });
    req.on('error', (e) => reject(e));
    req.end();
  });

module.exports = {
  //Find the IP of the Orange TV
  findTvIP: () =>
    new Promise((resolve, reject) => {
      findAliveHostsIP()
        .then(res => {
          let promiseArray = [];
          res.forEach(x =>
            promiseArray.push(new Promise((reso, reje) => {
              request(x, tvPort, '/BasicDeviceDescription.xml', 'GET')
                .then(() => reso(x))
                .catch(e => reje(e));
            }))
          )
          Promise.all(promiseArray)
            .then(res => resolve(res[0]))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    }),

  //Push a button of the remote
  pushButton: (ipTv, buttonId) => {
    let query = {
      operation: "01",
      key: buttonId,
      mode: "0"
    };
    request(ipTv, tvPort, '/remoteControl/cmd', 'GET', querystring.stringify(query))
      .catch(err => console.error('Failed activating the button', err))
  }
};