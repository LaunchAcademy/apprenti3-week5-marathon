import express from "express"
import logger from "morgan"
import bodyParser from "body-parser"
import hbsMiddleware from "express-handlebars"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const productsPath = path.join(__dirname, '../products.json')

// read from the products.json file
const productsJson = () => {
  return JSON.parse(fs.readFileSync(productsPath))
}
function validateForm(jsonFormInput) {
  let errors = [];
  if (!jsonFormInput["featured"]) errors["featured"] = "You must select whether or not the product is featured";
  Object.keys(jsonFormInput).forEach(input => {
    if (!jsonFormInput[input].trim()) {
      errors[input] = `You must include a ${input}`;
    }
  })
  return errors;
}

// import createError from "http-errors"

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404))
// })

app.post("/form", (req, res) => {
  let errors = validateForm(req.body)
  let allProducts = productsJson()
  let newProduct = req.body
  req.body.featured = req.body.featured === "true" ? true : false;
  if(Object.keys(errors).length === 0){
    allProducts.push(req.body)
    fs.writeFileSync(productsPath, JSON.stringify(allProducts))
    res.redirect("/")
  } else {
    let products = productsJson().filter(product => product.featured)
    res.render('index', {products: products, errors: errors, product: req.body})
  }
})

app.get("/", (req, res) => {
  let products = productsJson().filter(product => product.featured)
  res.render('index', { products : products  })
})
app.get("/:productName", (req, res) => {
  res.render("show", {product : productsJson().find(product => product.name === req.params.productName)})
})
app.get("/delete/:productName", (req, res) => {
  fs.writeFileSync(productsPath, JSON.stringify(productsJson().filter(product => product.name !== req.params.productName)));
  res.redirect("/");
})
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
