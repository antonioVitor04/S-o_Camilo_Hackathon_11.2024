const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Função para gerar código de doador único
function generateDonorCode() {
    return 'DOADOR-' + Math.floor(Math.random() * 100000);
}

// Simulação do estoque de sangue
const bloodStock = {
    "A+": 6,
    "A-": 3,
    "B+": 8,
    "B-": 2,
    "AB+": 15,
    "AB-": 4,
    "O+": 5,
    "O-": 1
};

// Endpoint para registrar doador com verificação de dados
app.post('/register', (req, res) => {
    const { name, age, bloodType } = req.body;

    // Validação dos dados
    if (!name || typeof age !== 'number' || !bloodType) {
        return res.status(400).json({ error: 'Dados inválidos. Verifique nome, idade e tipo sanguíneo.' });
    }

    const donorCode = generateDonorCode();
    console.log('Novo cadastro de doador:', req.body);
    
    // Verificação de estoque de sangue
    if (bloodStock[bloodType] <= 5) {
        console.log(`Atenção: estoque de sangue do tipo ${bloodType} está baixo!`);
    }

    res.json({ message: 'Cadastro realizado com sucesso!', donorCode });
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
