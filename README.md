# Heatmap
## What you need

This sw was build and tested in Linux(Gentoo).
Needed software
node, at least version 12
npx, 
## installation
Run commands

npm install

npm build

npm run

Browse to localhost:3003 and you will see heatmap demo with no cont3ext

## Setting test data

"nom run" starts a small server which creates an empty testdata file heatmap.csv to the root directory of this project.

You can gerate test data with a command sh scripts/test.sh. In the browser

## Server

A small web-server was done for needs of testing. It servers all static
files to the client and also offers a websocket for updating heatmap data.
Server watches the data file (./heatmap.csv) for changes and updates
them ao all listening clients.

Server is started to localhost port 3003, http://localhost:3003

## Client

Client shows 2019 heatmap without any dditional decorations. Weeks are in
columns. Each square shows heat value that day with a color and a number.
Colors shown value range 0-10.

## Setting values to heatmap

Start the server and go to localhost:3003 with your browser.
You can say in the project's root directory.
(to set 2.1.2019 heat value to 5)
echo "0,1,5" | cat > heatmap.csv

In the script-directory is a shell script (test.sh), which fills
the heatmap with different values.

You can strt it by saying

sh scripts/test.sh