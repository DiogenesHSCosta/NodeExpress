//CRUD - CREATE READ UPDATE DELETE
//estrutura app.verbo(caminho, açãoParaEsseCaminho)
//request == Entrada, response == saida
//caminho "/"(main/index) = caminho principal = localhost padrão


const indexController = (app, dbUsuarios) => { 

    //READ = GET
    app.get("/", (request, response) => {
        response.json(dbUsuarios);
    });

    //CREATE = POST
    app.post("/", (request, response) => {
        dbUsuarios.push(request.body);
        response.send(`Usuario ${request.body.nome} criado com sucesso`);
    });

    //UPDATE = PUT
    app.put("/:id", (request, response) => {
        let id = Number(request.params.id);

        dbUsuarios.map((elemento, index) => {
            if (elemento.id === id) {
                dbUsuarios.splice(index, 1, request.body);
            }
        });

        response.send("Usuario atualizado");
    });
    
    //DELETE = delete
    app.delete("/:id", (request, response) => {
        let id = Number(request.params.id);

        dbUsuarios.map((elemento, index) => {
            if (elemento.id === id) {
                dbUsuarios.splice(index, 1);
            }
        });
        response.send("Usuario deletado");
    });
};

export default indexController





//Didi tentando fazer o put sozinho dps da 2 aula de node
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