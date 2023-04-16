const fs = require("fs");

const alunos = [
    { matricula: 1 , nome: "Anderson Zamboni", media: 7 },
    { matricula: 2 , nome: "Leticia Zamboni", media: 8 },
    { matricula: 3 , nome: "Priscila Zamboni", media: 5 },
    { matricula: 4 , nome: "Mayara Zamboni", media: 10 },
    { matricula: 5 , nome: "Lucy Zamboni", media: 10 },
]

const filtrarNome = (nome)=> {
    return alunos.filter((aluno) => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
}

const filtrarMedia = (media) =>{
    return alunos.filter((aluno) => aluno.media >= media);
}

const adicionarAluno = (req, res) => {
    const { nome, matricula, media } = req.body;

    if (!nome || !matricula || !media) {
        return res.status(400).json({ error: 'Preencha todos os campos: nome, matricula e media' });
    }

    const novoAluno = { matricula: matricula, nome: nome, media: media };
    alunos.push(novoAluno);

    res.json({ message: 'Aluno cadastrado com sucesso', aluno: novoAluno });
    fs.writeFileSync("./db.json", JSON.stringify(alunos));
};

const deletarAluno = (req, res) => {
    const { index } = req.params;

    if (!alunos[index]) {
        res.status(404).json({ mensagem: 'Aluno não encontrado.' });
        return;
    }
    alunos.splice(index, 1);
    res.json(alunos);
    fs.writeFileSync("./db.json", JSON.stringify(alunos));
};

const atualizarAluno = (req, res) =>{
    const { index } = req.params;
    const { nome, media } = req.body;

    if (!alunos[index]) {
        res.status(404).json({ mensagem: 'Aluno não encontrado.' });
        return;
    }

    alunos[index].nome = nome || alunos[index].nome;
    alunos[index].media = media || alunos[index].media;
    res.json(alunos);
    fs.writeFileSync("./db.json", JSON.stringify(alunos));
};


module.exports = {alunos, filtrarNome, filtrarMedia, adicionarAluno, deletarAluno, atualizarAluno };