import express from 'express';
import cartController from '../controllers/cartController.js'; // Assumindo que você criará esse controller

const cartRouter = express.Router();

// Rota para gerar o resumo do carrinho atual do usuário
cartRouter.route('/api/cart/summary')
  .post((req, res) => cartController.generateCartSummary(req, res));

// Rota para analisar o comportamento do carrinho (histórico + preferências)
cartRouter.route('/api/cart/analyze')
  .post((req, res) => cartController.analyzeCartBehavior(req, res));

export default cartRouter;
