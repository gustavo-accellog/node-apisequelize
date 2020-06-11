const express = require('express');
const authMiddleware = require('../../middlewares/auth');
const { Produtos } = require('../models');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const produtos = await Produtos.findAll();
        return res.send({ produtos });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível listar produtos.' });
    }
    res.send({ success: 'Teste de rota.'});
});

router.get('/:produtoId', async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.produtoId);
        return res.send({ produto });
    } catch (err) {
        res.status(400).send({ error: 'Produto não encontrado.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const produto = await Produtos.create(req.body);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Não foi possível criar o produto.' });
    }
});

router.put('/:produtoId', async (req, res) => {
    try {
        const produto = await Produtos.update(req.body, { where: { id: req.params.produtoId } });
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Não foi possível alterar produto.' });
    }
});

router.delete('/:produtoId', async (req, res) => {
    try {
        const produto = await Produtos.findByPk(req.params.produtoId);
        await produto.destroy();
        return res.send({ success: 'Produto removido com sucesso.' });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao remover produto.' });
    }
});

module.exports = app => app.use('/produto', router);