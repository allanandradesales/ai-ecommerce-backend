
import UserModel from '../models/userModel.js'
import jwtService from 'jsonwebtoken'

export default {
    login: async (req, res) => {
        try {
            const result = await UserModel.findOne({login: req.body.email, password: req.body.password})
            if(result) {
                const secret = 'joao sem braço'
                const tokenResult = await jwtService.sign(req.body, secret)
                res.status(200).json({
                    message: "Usuário logado",
                    user: {
                        token: tokenResult,
                        login: result.login,
                        name: result.name
                    }
                })

            } else {
                res.status(403).json({message: `Credenciais inválidas`})
            }
        } catch (err) {
            res.status(403).send({message: err.message})
        }
    },
    getUsers: (req, res) => {
       
        UserModel.find({}).select(["-__v", "-_id"]).then((result) => {
           
            res.status(200).json(result)
        }).catch(() => {

            
            res.status(500).json({message: "Não foi possível recuperar os usuários"})
        })
    },
    deleteUserById: async (req, res) => {
        
        try {
            await UserModel.deleteOne({cpf: req.params.id})
            res.status(200).send({message: "Usuário removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o usuário"})
        }
    },
    getUser: async (req, res) => {
       
        try {
            await UserModel.findById({mat: req.body.mat})
            res.status(200).send(result)
        } catch (err) {
           
            res.status(500).json({message: "Não foi possível recuperar o usuário no momento"})
        }
    },
    updateUser: async (req, res) => {
        //Atualiza os dados de um usuário específico
        try {
            await UserModel.updateOne({mat: req.body.mat}, req.body)
            res.status(200).send({message: "usuário atualizado com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível atualizar os dados"})
        }
    },
    //Criar um User
    createUser: async (req, res) => {
        try {
            const findResult = await UserModel.find({login: req.body.login, email: req.body.email, password: req.body.password})
            if(findResult.length) {
               
                res.status(500).json({message: `Usuário já existe`})
            } else {
                await UserModel.create(req.body)
                res.status(201).json({message: `O usuário ${req.body.name} foi criado com sucesso!`})
            }
        } catch (err) {
            res.status(403).send({message: "Não foi possível criar o usuário"})
        }
    }
}