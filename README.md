# Heatmap
## What you need

This software was build and tested in Linux(Gentoo).
You need
node, at least version 12  
and  
npx  
to build and run it.

## installation
Run commands:  
npm install  
npm run build   
npm run start 

Browse to localhost:3003 and you will see heatmap demo with no content.

## Server

A small web-server was done for the needs of testing. It serves all static
files to the client and also offers a websocket for updating heatmap data.
Server watches the data file (./heatmap.csv) for changes and updates
them to all listening clients.

Server is started to localhost port 3003, http://localhost:3003

## Client

Client shows 2019 heatmap without any dditional decorations. Weeks are in
columns. Each square shows the heat value that day with a color and a number.
Colors shown value range 0-10.

## Setting values to the heatmap

Start the server (npm run start) and go to localhost:3003 with your browser.
You can say in the project's root directory  
(to set 2.1.2019 heat value to 5):  
echo "0,1,5" | cat > heatmap.csv  

In the script-directory is a shell script (test.sh), which fills
the heatmap with different values.

You can start it by saying:  
sh scripts/test.sh
