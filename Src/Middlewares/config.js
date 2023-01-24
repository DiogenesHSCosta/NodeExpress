//middleware = Meio de campo
//Arquivos que entrarem na minha API são string. Middlewares são tratamentos com essas entradas

const middlewaresPadrao = (app, Express, cors) => {
  //Convertendo a entrada em json com o comando '.json()'
  app.use(Express.json());

  //Impedir gargalo. Garantir que as requisições vão ser realizadas sequencialmente
  app.use((request, response, next) => {
    next();
  });

  //Impedir que outros https, tirando o nosso, acessem a API
  const options ={
    origin: ["http://localhost"]
  }

  app.use(cors(options))
};

export default middlewaresPadrao;
