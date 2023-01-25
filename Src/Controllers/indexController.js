import User from "../Models/userModel.js"
import UsersDAO from "../DAO/UserDAO.js"
//CRUD - CREATE READ UPDATE DELETE
//estrutura app.verbo(caminho, açãoParaEsseCaminho)
//request == Entrada, response == saida
//caminho "/"(main/index) = caminho principal = localhost padrão
const indexController = (app, db) => {

  const dao = new UsersDAO(db)

  //READ = GET
  app.get("/", async (request, response) => {
    try{
      const retorno = await dao.selecionarDados()
      response.json(retorno)
    }
    catch(erro){
      console.log(erro)
    }
  });

  //CREATE = POST
  app.post("/", async (request, response) => {
    try{
      const usuario = new User(
        request.body.nome,
        request.body.email,
        request.body.senha
      );

      const retorno = await dao.criarUsuario(usuario)
      response.json(retorno)
    }
    catch(erro){
      console.log(erro)
    }  
  });

  //UPDATE = PUT
  app.put("/:id", (request, response) => {
    
    let SQL = "UPDATE user SET nome = ?, email = ?, senha = ? WHERE id = ?";

    new Promise((res, rej) => {
      db.run(
        SQL,
        [
            request.body.nome, 
            request.body.email, 
            request.body.senha,
            request.params.id
        ],
        (erro) => {
          if (!erro) {
            res("Usuario alterado com sucesso");
          } else {
            rej(erro);
          }
        }
      );
    })
      .then((resultado) => response.send(resultado))
      .catch((erro) => console.log(erro));
  });

  //DELETE = delete
  app.delete("/:id", async (request, response) => {
    
    try {
      const id = request.params.id
      let retorno = await dao.deletarUsuario(id)
      response.send(retorno)
    } 
    catch (error) {
      console.log(erro)
    }
    
  });
};

export default indexController;
