# orangetv-remote
An Orange TV remote app based on [electron](https://github.com/electron/electron). This multi-platform app lets you control your Orange TV directly from your computer. It works perfectly.
When starting it will scan the network to find the Orange TV's IP address, then you can enjoy controlling your TV without the need of the physical remote.

## Install
To install this app, you first need to have node.js and npm. You can do so by executing these commands :

	$ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
	$ sudo apt-get install -y nodejs

You can find more informations on node.js's installation guide : [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/).

___
You then need to download the content of the repository and install the needed dependencies through these commands :

    $ git clone https://github.com/rigwild/orangetv-remote
    $ npm install
## Configure
If you modified your default network settings, you should change this line in the *./assets/js/orangeTvRemoteHttp.js* file to match the IP prefix you set :

    const ipPrefix = '192.168.1.';

Don't forget the ending point or it will not work. When starting, the program will test all IPs from 0 to 255 to find your Orange TV's IP.

If you have troubles connecting with your TV, uncomment this line in *./main.js* so the developer tools will open when starting the app :

      // Open the DevTools.
      // mainWindow.webContents.openDevTools()
___
You are done ! To start the app without compiling it into an executable you can run this command in the root directory of the repository :

    $ npm start

## Compile
In order to compile this app for your system, you can run the file *build_current_platform.sh* or execute the following commands :

    $ electron-packager --out out/ --icon assets/icon/favicon.ico --overwrite ./
The *./out/* directory will be created, containing your compiled application.

## App showcase
![demo](https://github.rigwild.dev/img/other/orangetv-remote.gif)

## License
[The MIT license](https://github.com/rigwild/orangetv-remote/blob/master/LICENSE)