const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/worldflavors", { 
    useNewUrlParser: true, 
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000
});

const UserSchema = new mongoose.Schema({
    email: {type:String, required : true} ,
    password : {type : String}
})

const User = mongoose.model('User', UserSchema);

const worldflavorsSchema = new mongoose.Schema({
    id_produtoexotico: {type:String, required : true} ,
    descrição : {type : String},
    fornecedor : {type : String},
    data_fabricação : {type : Date},
    quantidade_estoque : {type : Number}
})

const worldflavors = mongoose.model('worldflavors', worldflavorsSchema);

app.post("/cadastrousuario", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    if(email == null || password == null){
        return res.status(400).json({error : "Digite os campos!!!"});
    }

    const user = new User({
        email :email,
        password: password
    })
   try {
      const newUser = await user.save();
      res.json({error : null, msg: "Cadastro ok!!!", userId : newUser._id})

    }
    catch (error){
        res.status(400).json({error});
    }
});

app.post("/worldflavors", async (req, res)=>{
    const id_produtoexotico = req.body.id_produtoexotico;
    const descrição = req.body.descrição;
    const fornecedor = req.body.fornecedor;
    const data_fabricação = req.body.data_fabricação;
    const quantidade_estoque = req.body.quantidade_estoque;
   
    if(id_produtoexotico == null || descrição == null || fornecedor == null || data_fabricação == null || quantidade_estoque == null){
        return res.status(400).json({error : "Digite os campos!!!"});
    }

    const user = new worldflavors({
        id_produtoexotico: id_produtoexotico,
        descrição: descrição,
        fornecedor: fornecedor,
        data_fabricação: data_fabricação,
        quantidade_estoque: quantidade_estoque
    })
   try {
      const newUser = await user.save();
      res.json({error : null, msg: "Cadastro ok!!!", userId : newUser._id})

    }
    catch (error){
        res.status(400).json({error});
    }
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, ()=>{
    console.log("rodando na porta 3000");
});
