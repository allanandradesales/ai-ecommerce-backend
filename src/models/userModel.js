import mongoose from 'mongoose'
//Importando o Schema para criação de uma especificação do modelo que será criado no banco
const Schema = mongoose.Schema

//Definindo o esquema (Muito semelhante as definições de schemas em bancos SQL como postgres e MySQL)
const userSchema = new Schema({
    name: {type: String, required: true},
    login: {type: String, required: true, unique: true},
    //O tipo será numérico e obrigatório
    email: {type: String, required: true, unique: true},
    //A senha será String e obrigatória
    password: {type: String, required: true}
})

/*O primeiro parametro será o nome da coleção no banco. A coleção é como se fosse a tabela nem bancos de dados SQL
O segundo será o Schema pra criar essa coleção. E o schema nada mais é do que o que você criou anteriormente */
export default mongoose.model("users", userSchema)