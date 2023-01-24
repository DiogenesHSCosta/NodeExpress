import User from "../Models/userModel.js"

//CRUD - CREATE READ UPDATE DELETE
//estrutura app.verbo(caminho, açãoParaEsseCaminho)
//request == Entrada, response == saida
//caminho "/"(main/index) = caminho principal = localhost padrão
const indexController = (app, db) => {
  //READ = GET
  app.get("/", (request, response) => {
    let SQL = "SELECT * FROM user";

    new Promise((res, rej) => {
      db.all(
        SQL, 

        (erro, linhas) => {
        if (!erro) {
          res(linhas);
        } 

        else {
          rej(erro);
        }
      });
    })
      .then((resultado) => response.json(resultado))
      .catch((erro) => console.log(erro));
  });

  //CREATE = POST
  app.post("/", (request, response) => {

    const usuario = new User(
      request.body.nome,
      request.body.email,
      request.body.senha
    );

    let SQL = "INSERT INTO user(id, nome, email, senha) VALUES (?,?,?,?)";

    new Promise((res, rej) => {
      db.all(
        SQL,
        [
            usuario.id, 
            usuario.nome, 
            usuario.email, 
            usuario.senha
        ],
        
        (erro) => {
          if (!erro) {
            res("Usuario cadastrado com sucesso");
          } else {
            rej(erro);
          }
        }
      );
    })
      .then((resultado) => response.send(resultado))
      .catch((erro) => console.log(erro));
  });

  //UPDATE = PUT
  app.put("/", (request, response) => {
    
    let SQL = "UPDATE user SET nome = ?, email = ?, senha = ? WHERE nome = Diogenes";

    new Promise((res, rej) => {
      db.run(
        SQL,
        [
            request.body.nome, 
            request.body.email, 
            request.body.senha
        ],
        (erro) => {
          if (!erro) {
            res("Usuario cadastrado com sucesso");
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
  app.delete("/:id", (request, response) => {});
};

export default indexController;
