var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: "https://mail.google.com/mail/*",
  contentScriptFile: [
    self.data.url("jquery.min.js"),
    self.data.url("moment.min.js"),
    self.data.url("timestamp.js")
  ]
});
