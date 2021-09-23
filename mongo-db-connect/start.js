
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/web11");

}


const ProductSchema = new mongoose.Schema({
    Product_name : {type:String,required :true},
    price :{type:Number,required:true},
    size:{type:Number,required:false}
});


const Products = mongoose.model("product",ProductSchema);
app.use(express.json());



app.post('/products', async (req,res)=>{
    const product = await Products.create(req.body)

    return res.status(201).send({product});
});


app.get("/products/show",async (req,res)=> {
    const products = await Products.find().lean().exec()
    return res.status(200).send({products});
})


app.get("/products/:id", async (req,res)=>{
    const product = await  Products.findById(req.params.id).lean().exec()
    return res.status(200).send({product})
})


app.patch('/update/:id',async (req,res) =>{
    const product = await Products.findByIdAndUpdate(req.params.id,req.body, {new:true})

    return res.status(200).send({product})

})

app.delete("/products/delete/:id",async(req,res)=>{
    const product = await Products.findByIdAndDelete(req.params.id)

    return res.status(200).send({product})
})

app.listen(1234, async () =>{
    await connect();
    console.log("listening on port number 1234");
})