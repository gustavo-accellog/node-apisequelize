const express = require('express');
const authMiddleware = require('../../middlewares/auth');
const { Telefones } = require('../models');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const telefones = await Telefones.findAll();
        return res.send({ telefones });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível listar telefones.' });
    }
});

router.get('/:telefoneId', async (req, res) => {
    try {
        const telefone = await Telefones.findByPk(req.params.telefoneId, {include: [ 'cliente' ]});
        return res.send({ telefone });
    } catch (err) {
        res.status(400).send({ error: 'Telefone não encontrado.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const telefone = await Telefones.create(req.body);
        return res.send({ telefone });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível criar o telefone.' });
    }
});

router.put('/:telefoneId', async (req, res) => {
    try {
        const telefone = await Telefones.update(req.body, { where: { id: req.params.telefoneId } });
        return res.send({ telefone });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível alterar telefone.' });
    }
});

router.delete('/:telefoneId', async (req, res) => {
    try {
        const telefone = await Telefones.findByPk(req.params.telefoneId);
        await telefone.destroy();
        return res.send({ success: 'Telefone removido com sucesso.' });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao remover telefone.' });
    }
});

module.exports = app => app.use('/telefone', router);