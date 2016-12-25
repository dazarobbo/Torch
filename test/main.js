const BungieNet = require("bungienetplatformjs").default;
const Torch = require("../lib/index.js").default;

const p = new BungieNet.Platform({
  apiKey: ""
});

const t = new Torch(p);

t.ok().then(() => console.log("Platform is working!"));



//t.OAuth.getAccessToken("").then(r => r).catch(r => console.log(r));
