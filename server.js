const express = require ('express')
const morgan = require ('morgan')

const app=express()
let products=[
    {
        "id" : 1,
        "name" : 'Laptop',
        "price" : 3000,
    }
]

app.set('appName', 'ExpressCourse')
app.set('port', 3000)

app.use(morgan('dev'))
app.use(express.json())

app.get('/products',(req,res)=>{
    //res.send ('obteniendo productos')
    res.json(products)
})

app.post('/products',(req,res)=>{
    const newProducts = {...req.body,id : products.length +1}
    products.push(newProducts)
    res.json(newProducts)
})

app.put('/products/:id',(req,res)=>{
    const productFound=products.find(
        (product)=>product.id===parseInt(req.params.id)
    )
    if (!productFound) return res.status(404).json({
            "message": "Product not found"
        })
    products=products.map((p)=> p.id===parseInt(req.params.id) ? {...p,...req.body} : p)
    res.json({
        "message" : "product updated succesfully"
    })
})

app.get('/products/:id',(req,res)=>{
    const productFound=products.find(
        (product)=>product.id===parseInt(req.params.id)
    )
    if (!productFound) return res.status(404).json({
            "message": "Product not found"
        })
    res.json(productFound)
})

app.delete('/products/:id',(req,res)=>{
    const productFound=products.find(
        (product)=>product.id===parseInt(req.params.id)
    )
    if (!productFound) return res.status(404).json({
            "message": "Product not found"
        })
    products=products.filter((p) => p.id ==! parseInt(req.params.id))

    res.sendStatus(204)
})

app.listen (app.get('port'))
console.log (`server ${app.get('appName')} on port ${app.get('port')}`)
