import express from 'express';
import productController from '../controllers/productController.js';

const productRouter = express.Router();

// Rota para múltiplos produtos
productRouter.route('/api/product')
  .get(productController.getProducts)
  .post(productController.createProduct)
  .put(productController.updateProduct); // Se esse PUT for para atualizar em massa (ex: /api/product)

// Rota para um produto específico por ID
productRouter.route('/api/product/:id')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProductById);

export default productRouter;
