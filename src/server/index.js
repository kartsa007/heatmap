#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');

const Debug = require('debug');
const websockify = require('koa-websocket');

const debug = new Debug('Server');

debug('Starting');
const PORT = process.env.PORT || 3003;
const koaApp = new Koa();
const app = websockify(koaApp);

// Check out data file
const dataFile = 'heatmap.csv';
let heatmapData = JSON.stringify({});

// Catch a new connection and send heatmap
app.ws.use((ctx) => {
  ctx.websocket.send(heatmapData);
});

koaApp.use(async (ctx) => {
  debug('static handling');
  if (ctx.path === '/') {
    ctx.path = '/index.html';
  }
  const fileRoot = path.resolve(__dirname, '../../dist');
  try {
    await send(ctx, ctx.path, { root: fileRoot });
  } catch (error) {
    debug(`${ctx.path} ${error.message}`);
    await send(ctx, 'index.html', { root: fileRoot });
  }
});

koaApp.use(async (ctx, next) => {
  await next();
  debug(`Logging ${ctx.url}`);
});
const parseData = (data) => {
  const lines = data.split('\n');
  const parsed = lines.reduce((acc, line) => {
    const field = line.split(',');
    const month = Number.parseInt(field[0], 10);
    const day = Number.parseInt(field[1], 10);
    const heat = Number.parseInt(field[2], 10);
    if (Number.isNaN(month) || Number.isNaN(day) || Number.isNaN(heat)) {
      return acc;
    }
    return {
      ...acc,
      [`${month}_${day}`]: heat,
    };
  }, {});
  return parsed;
};

const heatmapUpdater = () => {
  fs.readFile(dataFile, (err, data) => {
    if (err) {
      debug('Heatmap update error');
      return;
    }
    heatmapData = JSON.stringify(parseData(data.toString()));
    app.ws.server.clients.forEach((client) => {
      client.send(heatmapData);
    });
  });
};

// Read data to buffer
fs.readFile(dataFile, (err, data) => {
  if (err) {
    debug(`Data file ${dataFile} does not exist`);
    debug('Creating one');
    fs.writeFile(dataFile, '', (err2) => {
      if (err2) {
        throw err2;
      }
    });
  } else {
    debug(__dirname);
    debug(`Data file ${dataFile} exists`);
    heatmapData = JSON.stringify(parseData(data.toString()));
  }
  debug(`Start watching ${__dirname}/${dataFile}`);
  fs.watch(dataFile, heatmapUpdater);
});

app.listen(PORT);
