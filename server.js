const express = require("express")
const path = require("path")
const app = express()
const helmet = require("helmet")

app.use(helmet({
  frameguard: "deny"
}))

app.get("*.js", (req, res, next) => {
  console.log("Processing js files....")
  console.log("Gzipping....")
  if (/app.*.js/.test(req.url) || /vendor.*.js/.test(req.url)) {
    req.url += ".gz"
    res.set("Content-Encoding", "gzip")
    res.set("Content-type", "text/javascript")
  }
  const vendorUrlRegex = /vendor.*.js/
  if (vendorUrlRegex.test(req.url)) {
    console.log("Setting cache for vendor....")
    res.setHeader("Cache-Control", "private, max-age=31536000")
  }
  next()
})


app.use("/", express.static(path.join(__dirname, "./dist")))
app.use("/icons", express.static(path.join(__dirname, "./icons  ")))

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"))
})

app.listen(8080, () => {
  console.log("Server is listening on port 8080!")
})