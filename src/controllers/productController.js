
import ProductModel from '../models/productModel.js'
export default{
    getProducts: (req, res) => {
        
        ProductModel.find({}).select(["-__v", "-_id"]).then((result) => {
            
            res.status(200).json(result)
        }).catch(() => {

        
            res.status(500).json({message: "Não foi possível recuperar os produtos"})
        })
    },
    deleteProductById: async (req, res) => {
        
        try {
            const result = await ProductModel.deleteOne({mat: req.params.id})
            res.status(200).send({message: "Estudante removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o produto"})
        }
    },
    getProduct: async (req, res) => {
    
        try {
            const result = await ProductModel.findById({mat: req.body.mat})
            res.status(200).send(result)
        } catch (err) {
            
            res.status(500).json({message: "Não foi possível recuperar o produto no momento"})
        }
    },
    updateProduct: async (req, res) => {
        
        try {
            const result = await ProductModel.updateOne({mat: req.body.mat}, req.body)
            res.status(200).send({message: "Estudante atualizado com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível atualizar os dados"})
        }
    },
    
    createProduct: async (req, res) => {
        
        try {
           
            const result = await ProductModel.create(req.body)

    
            res.status(201).json({message: `O produto ${result._doc.name} foi criado com sucesso!`})
        } catch (err) {

           
            res.status(500).json({message: `Não foi possível criar o produto ${req.body.name}`})

        }
    }
}