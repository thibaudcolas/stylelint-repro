"use strict"

const { inspect } = require("util")
const { join } = require("path")
const { lint } = require("stylelint")

;(async () => {
  const result = await lint({
    config: { rules: {} },
    files: join(__dirname, "style.css"),
  })

  console.log(inspect(result, { colors: true, depth: Infinity }))
})()
