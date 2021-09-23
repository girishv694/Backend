
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment");

}


const MovieSchema = new mongoose.Schema({
    id : {type:Number,required :true},
    movie_name :{type:String,required:true},
    movie_genre:{type:String,required:false},
    production_year:{type:Number,required:true},
    budget:{type:Number,required:true}
});


const movies = mongoose.model("movie",MovieSchema);
app.use(express.json());



app.post('/movies', async (req,res)=>{
    const moviess = await movies.create(req.body)

    return res.status(201).send({moviess});
});


app.get("/movies/show",async (req,res)=> {
    const moviess = await movies.find().lean().exec()
    return res.status(200).send({moviess});
})


app.get("/movies/:id", async (req,res)=>{
    const moviess = await  movies.findById(req.params.id).lean().exec()
    return res.status(200).send({moviess})
})


app.patch('/update/:id',async (req,res) =>{
    const moviess = await movies.findByIdAndUpdate(req.params.id,req.body, {new:true})

    return res.status(200).send({moviess})

})

app.delete("/movies/delete/:id",async(req,res)=>{
    const moviess = await movies.findByIdAndDelete(req.params.id)

    return res.status(200).send({moviess})
})

app.listen(5000, async () =>{
    await connect();
    console.log("listening on port number 5000");
})