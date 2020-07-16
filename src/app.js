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


app.post("/form", (req, res) => {
  let allProducts = productsJson()
  let newProduct = req.body

  let valid = true;
  Object.keys(newProduct).forEach(key => {
    newProduct[key] = newProduct[key].trim()
    if (!newProduct[key]) {valid = false;}
  });

  if (newProduct.featured === "true") {
    newProduct.featured = true
  } else {
    newProduct.featured = false
  }
  if(valid){
    allProducts.push(newProduct)
    fs.writeFileSync(productsPath, JSON.stringify(allProducts))
    res.redirect("/")
  } else {

    let products = productsJson().filter(product => product.featured)
    res.render('index', {products: products, error: "Please fill out the form correctly :P", product: newProduct})
  }
})

app.get("/", (req, res) => {
  let products = productsJson().filter(product => product.featured)
  res.render('index', { products : products  })
})
app.get("/:productName", (req, res) => {
  res.render("show", {product : productsJson().find(product => product.name === req.params.productName)})
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
