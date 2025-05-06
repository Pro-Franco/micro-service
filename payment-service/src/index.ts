import express from 'express';

const app = express();
const PORT = 3002;

app.use(express.json());

app.post('/pay', (req: any, res: any) => {
  //o any aqui não esta certo mas resolveu o erro temporario pra demonstrar
  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ error: 'Dados de pagamento inválidos' });
  }

  // Simulação de processamento
  // 80% de chance de sucesso
  const approved = Math.random() > 0.2;

  if (approved) {
    res.status(200).json({
      status: 'success',
      transactionId: `txn_${Date.now()}`,
      amount
    });
  } else {
    res.status(402).json({
      status: 'failed',
      error: 'Pagamento recusado'
    });
  }
});

app.listen(PORT, () => {
  console.log(`* Payment-service * rodando na porta ${PORT}`);
});

//npx ts-node-dev src/index.ts
