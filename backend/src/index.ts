import express from 'express';
// import router from ''

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});