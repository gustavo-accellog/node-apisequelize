const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { User } = require('../models');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Auth:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *   Register:
 *     type: object
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: "string"
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 */

function generateToken(params = {}) {
    return jwt.sign(params,
        authConfig.secret, {
        expiresIn: 86400,
    });
}

/**
 * @swagger
 * /auth/register:
 *   post:
 *     description: Registrar novo usuário no sistema.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: user
 *         description: Informe o nome, e-mail e password do usuário.
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: "#/definitions/Register"
 *     responses:
 *       '200':
 *         description: Retorno de sucesso. Usuário registrado.
 *       '400':
 *         description: Erro ao efetuar registro.
 */
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        user.password = undefined;
        res.send({ user });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao se registrar.' });
    }
});

/**
 * @swagger
 * /auth/authenticate:
 *   post:
 *     description: Obter token de acesso ao sistema.
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: login
 *         description: Informe o e-mail e password de Login
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: "#/definitions/Auth"
 *     responses:
 *       '200':
 *         description: Retorno de sucesso. Seu token será gerado.
 *       '400':
 *         description: Erro ao efetuar Login. Usuário não encontrado ou senha inválida.
 */
router.post('/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne( { where: { email } });
        if (!user) {
            return res.status(400).send({ error: 'Usuário não encontrado.' });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Senha inválida.' });
        }

        const token = generateToken({
            id: user._id,
        });

        user.password = undefined;
        res.send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Erro ao efetuar login.' });
    }
});

module.exports = app => app.use('/auth', router);