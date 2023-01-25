class UsersDAO {
    constructor(banco){
        this.db = banco
    }


    selecionarDados(){

        let SQL = "SELECT * FROM user";

        return new Promise((res, rej) => {
            this.db.all( SQL, (erro, linhas) => {
                if (!erro) {
                res(linhas);
                } 
                else {
                rej(erro);
                }
            })
        })
    }

    criarUsuario(usuario){
        let SQL = "INSERT INTO user(id, nome, email, senha) VALUES (?,?,?,?)";

        return new Promise((res, rej) => {
        this.db.all( SQL,
            [
                usuario.id, 
                usuario.nome, 
                usuario.email, 
                usuario.senha
            ],

            (erro) => {
                if (!erro) {
                    res(usuario);
                } 
                else {
                    rej(erro);
                }
            }
        );
        })

    }

    atualizarUsuario(){}

    deletarUsuario(id){
        let SQL = "DELETE FROM user WHERE id = ? "

        return new Promise((res, rej) =>{

            this.db.run(SQL, id, (erro)=>{
                if(!erro){
                    res("Usuário deletado")
                }
                else{
                    rej(erro)
                }
            })
            
        })
    }
}

export default UsersDAO