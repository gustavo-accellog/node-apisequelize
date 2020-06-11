const express = require('express');
const authMiddleware = require('../../middlewares/auth');
const { Clientes, Telefones } = require('../models');

const router = express.Router();

router.use(authMiddleware);


/**
 * @swagger
 * definitions:
 *   Cliente:
 *     type: object
 *     required:
 *       - nome
 *       - cpf
 *       - aniversario
 *       - status
 *     properties:
 *       nome:
 *         type: "string"
 *       cpf:
 *         type: "string"
 *       aniversario:
 *         type: "string"
 *         format: date-time
 *       status:
 *         type: "string"
 *         format: boolean
 */


/**
 * @swagger
 * /cliente:
 *   get:
 *     description: Lista todos os clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       '200':
 *         description: Retorno de sucesso listando todos os clientes
 *       '400':
 *         description: Erro ao listar todos os clientes
 */
router.get('/', async (req, res) => {
    try {
        // const clientes = await Clientes.findAll();
        const clientes = await Clientes.findAll({ include: [ { model: Telefones, as: 'telefones' } ]});
        return res.send({ clientes });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível listar clientes.' });
    }
});

/**
 * @swagger
 * /cliente/{clienteId}:
 *   get:
 *     description: Obtém cliente pelo ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: clienteId
 *         description: Informe o ID do cliente
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Retorno de sucesso listando o cliente informado
 *       '400':
 *         description: Erro ao obter cliente, verificar
 */
router.get('/:clienteId', async (req, res) => {
    try {
        const id = req.params.clienteId;
        const cliente = await Clientes.findByPk(id, { include: ['telefones']});
        // const cliente = await Clientes.findByPk(id, { include: [ { model: Telefones, as: 'telefones' } ]});
        // const cliente = await Clientes.findOne({ where: { id } }, { include: ['telefones']});
        return res.send({ cliente });
    } catch (err) {
        res.status(400).send({ error: 'Cliente não encontrado.' });
    }
});

/**
 * @swagger
 * /cliente:
 *   post:
 *     description: Salvar um novo cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: cliente
 *         description: Informe o nome do cliente
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: "#/definitions/Cliente"
 *     responses:
 *       '200':
 *         description: Retorno de sucesso. Cliente inserido.
 *       '400':
 *         description: Erro ao salvar cliente.
 */
router.post('/', async (req, res) => {
    try {
        const cliente = await Clientes.create(req.body);
        return res.send({ cliente });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Não foi possível criar o cliente.' });
    }
});

/**
 * @swagger
 * /cliente/{clienteId}:
 *   put:
 *     description: Salvar um novo cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: clienteId
 *         description: Informe o ID do cliente
 *         in: path
 *         required: true
 *         type: integer
 *       - name: cliente
 *         description: Informe os dados a serem alterados do cliente
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: "#/definitions/Cliente"
 *     responses:
 *       '200':
 *         description: Retorno de sucesso. Cliente alterado.
 *       '400':
 *         description: Erro ao alterar cliente.
 */
router.put('/:clienteId', async (req, res) => {
    try {
        const cliente = await Clientes.update(req.body, { where: { id: req.params.clienteId } });
        return res.send({ cliente });
    } catch (err) {
        res.status(400).send({ error: 'Não foi possível alterar cliente.' });
    }
});

/**
 * @swagger
 * /cliente/{clienteId}:
 *   delete:
 *     description: Salvar um novo cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - name: clienteId
 *         description: Informe o ID do cliente
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Retorno de sucesso. Cliente deletado.
 *       '400':
 *         description: Erro ao deletar cliente.
 */
router.delete('/:clienteId', async (req, res) => {
    try {
        const cliente = await Clientes.findByPk(req.params.clienteId);
        await cliente.destroy();
        return res.send({ success: 'Cliente removido com sucesso.' });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao remover cliente.' });
    }
});

module.exports = app => app.use('/cliente', router);