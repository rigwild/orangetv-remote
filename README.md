# orangetv-remote
An Orange TV remote app based on [electron](https://github.com/electron/electron). This multi-platform app lets you control your Orange TV directly from your computer.

## Install
Download the content of the repository and install the needed dependencies through these commands :

    git clone https://github.com/rigwild/orangetv-remote
    cd orangetv-remote
    npm install

## Configure
If you modified your default network settings, you can set your own configuration in the *.env* file.

    tvIP='192.168.1.12'
    tvPort=8080

If you have troubles connecting with your TV, uncomment this line in *./main.js* so the developer tools will open when starting the app.

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

You are done ! To start the app without compiling it into an executable you can run this command.

    npm start

## Build
In order to build this app for your system, use :

    npm run build

Build for all systems : 

    npm run build_all

The *./out/* directory will be created, containing your compiled application.

## App showcase
![demo](https://github.rigwild.dev/img/other/orangetv-remote.gif)

## License
[The MIT license](https://github.com/rigwild/orangetv-remote/blob/master/LICENSE)