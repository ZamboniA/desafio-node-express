const express = require('express');
const app = express();
const { alunos, filtrarMedia, filtrarNome, adicionarAluno, deletarAluno, atualizarAluno } = require("./alunos");
app.use(express.json());
const fs = require("fs");

//FILTRAR ALUNO POR NOME OU MEDIA
app.get('/alunos', (req, res) => {
    const { nome, media } = req.query;

    if (nome) { return res.json(filtrarNome(nome)) };
    if (media) { return res.json(filtrarMedia(media)) };

    res.json(alunos);
});


//ADICIONAR NOVO ALUNO
app.post('/alunos/novo', (req, res) => {
    adicionarAluno(req, res);
});


//DELETAR ALUNO
app.delete('/alunos/:index', (req, res) => {
    deletarAluno(req, res);
});


//ATUALIZAR ALUNOS
app.put('/alunos/:index', (req, res) => {
    atualizarAluno(req, res);
});




app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});