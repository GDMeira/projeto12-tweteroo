import express from 'express';

const app = express();
const PORT = 5000;

app.listen(PORT, () => `Rodando servidor na porta ${PORT}`);

app.get('/', (req, res) => {
    res.send('aoba');
})