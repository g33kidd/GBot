import * as Discord from 'discord.js';
import * as admin from 'firebase-admin';
import * as http from 'http';

import GBot from './gbot';
import Hook from './hook';
import Command from './command';
import { getCommands } from './commands';
import { getHooks } from './hooks';

if (process.env.NODE_ENV == 'dev') {
  const firebaseConfig = require('../developers-discord-firebase-adminsdk.json');
  admin.initializeApp(firebaseConfig);
} else {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.GOOG_PROJECT_ID,
      clientEmail: process.env.GOOG_CLIENT_EMAIL,
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCgnDf2cRgO8oO9\n3GeSpzzF8AVa3V8SJ+WTSFmZEyp5ZPNO7ashpjJR9cw8zl9UupcNnrusOt/BkXJZ\nrK56UbOJLzENjTr5HxEN8mY5yOLWVcrDSCDkSV4H/AZQ58J5XFSvpgV0EK9RyBXk\nyM3vH2hYh9xN9dYaaCg/X699lP+AE22cUJgKXzFScziV4dhbu3y6LGoJQbspQpLm\noz7JMeYP52fJkRg++UxWovXya0MjnvxZ751y0a29R20CKOwV8k8Ns7HjRlgyC2Tj\nvZMsRDb7G3NyecjKLO8s6ZIn2madhV/i8im808WBILY0AVnByUkCBBysNTcH8Iky\nO39QavgfAgMBAAECggEAOZ1AkAWq2TXS34lQmDGo4eKDsUBHKfao6qgiCADxlCGM\nDGzCnmwFkhQoA0oOtZDHvgmKjjKCcOgxioyg/F0Rl+0XXiKjHJmx3vxtAl6XTMby\n2RGnRu0wr5GPXHd+8lUWRfo665NOqPorLGqCQTzVjCiUdVzyRH/HrFAxXk3UR8de\nbORzi1qaMvQnNOiHySaAqnbwpRuurGNgKeYb9CiL3npMDmqw6MWJqt9OdYsRzXs0\nDSQpmgaEQnCYQt7LhPPFQbgjNHsjJnK3GJdlw1jYzLGqEoMBJgHlHn8cfYl2qezL\nVwGtwJcRLGjZiLtIEGtPvAVgXGcwapwMfHKbQVPMeQKBgQDb+qzVYr+htc76Cy4h\nNpp0gARDfAXPsE62MgQ3fHra8GRnUmQHIRPWc9oCsO3cI3OHMz7nrxX4ph9SXe6A\nr5xP69DL2Suj3Uzxik7J/UZo5A4XRQieS2K5EwyxlRvWSZH9f2hsAJoI4lD6YANV\nrpdnXoPgH2ls8d1W4y/ZUYZMFwKBgQC66NnenAkap9kjDSLJ6oPC3mGiMVjoxtC9\nCAIB9KHUucszz7EYVM+r/WuWgjF5OSReTqgkm/sZ7jWX90NngnWpARVuSht+EbNV\nC/ju+M+ZupNvonZQmhl9J4KKWzLyDe2WoGXNzggHtQqiUx1tltuSYiMfxxMYDLzk\nm9tlZs2ROQKBgFvQwzbFYqrCUcN3yyc9vTYHAMCSEXLgadoOAkiOglDDqYSelPWM\nztThwgsBgiYx/dRehVD6eTcxTz13y0aXBa0uBhYvbNGWWrkuOzh/qFW7ak44GCLJ\n4EjTNKciT14fkvm1pgX+Mkym+ZmnXXzzxGn2vyBavAwm33WWmbAhIOa9AoGAeRMf\nFqGzEA5MjPUUZQHCCnhtfFhFBLzNOLY4PrYOIrOb2tseF+nQgNPvXpbFn4YRdfmz\n18sm1HxHQUKN6j5LI4gtLr1Yo8iph1zzCzInoKiImxb9V2cLPdRbLm63SK8XCayr\nZa6h6wQueEoo1PWVFHT31bzqNHkD337KlxwJ65kCgYA9C4QXum6QJEqWrYKm5Za7\nsWBU96OyIu6hXYtAHJ5CgHHI62Dds3ogfbvWLuDoFlAqnhpQeD0GG53srcsEONOv\nrY58ifHNmGXubUCwZEKaXqvzWPR5UjzH+vHAbbRAeKbNNlcQlHjDpdnGdSCWiEm7\noHZAl4FWBo1SCySxyW/dYA==\n-----END PRIVATE KEY-----\n"
    }),
    databaseURL: `${process.env.GOOG_PROJECT_ID}.firebaseio.com`
  });
}

const config = {
  token: process.env.BOT_TOKEN,
  prefix: "!"
};

const bot = new GBot(
  config.prefix,
  config.token,
  getHooks(),
  getCommands()
);

// HTTP server because now.sh will freeze the instance if no activity has happened in a while.
// This will 'hopefully' prevent now.sh from freezing the instance.
http.createServer((req, res) => {
  res.end('.');
}).listen(3000, (err) => {
  if (err) return console.log("something bad happened", err);
  console.log("http server is listening on port 3000");
});

setInterval(() => {
  console.log("running get request")
  http.get('http://google-developers-discord-gbot.now.sh', (res) => {
    res.on('data', (body) => {
      console.log(body);
    })
  });
}, 300000);