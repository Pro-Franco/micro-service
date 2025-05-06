import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/orders', async (req: any, res: any) => {
  //o any aqui não esta certo mas resolveu o erro temporario pra demonstrar
  const { productId, quantity, paymentMethod } = req.body;

  try {
    const productRes = await axios.get(
      `http://localhost:3001/products/${productId}`
    );
    const product = productRes.data;
    const total = product.price * quantity;

    const paymentRes = await axios.post('http://localhost:3002/pay', {
      amount: total,
      method: paymentMethod
    });

    const order = {
      id: Date.now(),
      product,
      quantity,
      total,
      payment: paymentRes.data
    };

    return res.status(201).json(order);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      return res
        .status(err.response.status)
        .json({ error: err.response.data.error });
    }

    return res.status(500).json({ error: 'Erro ao processar pedido' });
  }
});

app.listen(PORT, () => {
  console.log(`* Order-service * rodando na porta ${PORT}`);
});
