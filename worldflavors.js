const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/worldflavors',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const usuarioSchema = new mongoose.Schema({
    email: {type: String, required: true,},
    senha: {type : String},
  });
  
const Usuario = mongoose.model('Usuario', usuarioSchema);

app.post("/cadastrarUsuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (email == null || senha == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }

    const emailExiste = await Usuario.findOne({ email: email });
    if (emailExiste) {
        return res.status(400).json({ error: "O e-mail cadastrado já existe!!!" });
    }

    const usuario = new Usuario({
        email: email,
        senha: senha,
    });

    try {
        const newUsuario = await usuario.save();
        res.json({ error: null, msg: "Cadastro ok", usuarioId: newUsuario._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/cadastrarUsuario", async(req, res)=>{
    res.sendFile(__dirname +"/form-user.html");
});

const worldflavorsSchema = new mongoose.Schema({
    id_produtoexotico: {type:String, required : true} ,
    descrição : {type : String},
    fornecedor : {type : String},
    data_fabricação : {type : Date},
    quantidade_estoque : {type : Number}
})

  const Alimentoexotico = mongoose.model('comidaExotica', worldflavorsSchema);
  
  app.post("/worldflavors", async (req, res)=>{
    const id_produtoexotico = req.body.id_produtoexotico;
    const descrição = req.body.descrição;
    const fornecedor = req.body.fornecedor;
    const data_fabricação = req.body.data_fabricação;
    const quantidade_estoque = req.body.quantidade_estoque;
   
    if(id_produtoexotico == null || descrição == null || fornecedor == null || data_fabricação == null || quantidade_estoque == null){
        return res.status(400).json({error : "Digite os campos!!!"});
    }

    if (quantidade_estoque <= 0 || quantidade_estoque > 15) {
        return res.status(400).json({ error: "A quantidade em estoque deve ser um valor menor ou igual a 15." });
    }

    const id_produtoexistente = await worldflavors.findOne({ id_produtoexotico: id_produtoexotico });
    if (id_produtoexotico) {
        return res.status(400).json({ error: "O produto já existe!!!" });
    }

    const comidaExotica = new worldflavors({
        id_produtoexotico: id_produtoexotico,
        descrição: descrição,
        fornecedor: fornecedor,
        data_fabricação: data_fabricação,
        quantidade_estoque: quantidade_estoque
    })

    try {
        const newcomidaExotica = await comidaExotica.save();
        res.json({ error: null, msg: "Cadastro ok", id_produtoexotico: comidaExotica._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/cadastroAlimentoExotico", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroAlimentoExotico.html");
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/cadastroAlimentoExotico.html");
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})  