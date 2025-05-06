import express from 'express';

const app = express();
const PORT = 3001;

const products = [
  { id: 1, name: 'Teclado', price: 99.99 },
  { id: 2, name: 'Mouse', price: 49.99 },
  { id: 3, name: 'Monitor', price: 900.99 },
  { id: 4, name: 'Headset', price: 80.99 },
  { id: 5, name: 'Gabinete', price: 200.99 },
  { id: 6, name: 'Fonte', price: 150.99 },
  { id: 7, name: 'Placa de video', price: 800.99 },
  { id: 8, name: 'Processador', price: 150.99 },
  { id: 9, name: 'Memória RAM', price: 200.99 },
  { id: 10, name: 'SSD', price: 300.99 }
];

app.get('/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ error: 'Produto não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Product service rodando na porta ${PORT}`);
});
