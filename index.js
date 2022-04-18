const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// app configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// variáveis
let ID = 6;
let message = '';

function findPaleta(paletaId) {
  const chosenPaleta = paletas.find((paleta) => {
    return paleta.id == paletaId;
  });

  return chosenPaleta;
}

const paletas = [
  {
    id: 1, // type => integer , null=yes (gerada pelo servidor)
    sabor: 'Açaí', // type => string
    descricao: 'Sorvete de açaí.', // type => string , null=yes
    foto: 'acai-com-leite-condensado.png', // type => string , foto na pasta /images/
    preco: 10.0, // type => float  , null=yes
  },
  {
    id: 2,
    sabor: 'Banana com Nutella',
    descricao: 'Sorvete de Banana com Nutella.',
    foto: 'banana-com-nutella.png',
    preco: 10.0,
  },
  {
    id: 3,
    sabor: 'Chocolate Belga',
    descricao: 'Sorvete Chocolate Belga.',
    foto: 'chocolate-belga.png',
    preco: 7.0,
  },
  {
    id: 6,
    sabor: 'Chocolate Belga',
    descricao: 'Sorvete Chocolate Belga.',
    foto: 'chocolate-belga.png',
    preco: 7.0,
  },
];

//
// render index
app.get('/', (req, res) => {
  res.render('index');
});

//
// find todas paletas
app.get('/paletas/find', (req, res) => {
  res.send(paletas);
});

//
// find by id
app.get('/paletas/find/:id', (req, res) => {
  const idParam = req.params.id;
  let chosenPaleta = findPaleta(idParam);

  message = 'Paleta não localizada!';

  // peleta não localizada
  if (!chosenPaleta) {
    chosenPaleta = {};
    chosenPaleta.id = idParam;
    chosenPaleta.sabor = 'Não localizado';
    chosenPaleta.preco = 0;
    chosenPaleta.foto = 'notfound-ice.png';
    chosenPaleta.descricao = message;
  }

  // retorna array para ficar compativel com /paletas/find/
  let arr = [chosenPaleta];
  res.send(arr);
});

//
// create
app.post('/paletas/create/', (req, res) => {
  let paleta = req.body;

  // trata campos

  if (!paleta.preco) {
    paleta.preco = 0;
  }

  if (!paleta.descricao) {
    paleta.descricao = '';
  }

  ID++;
  paleta.id = ID;
  //
  paletas.push(paleta);

  res.send(paleta);

  // redirect() não funcionou no thunder client
  //res.redirect('/');
});

//
// rota configurada para receber request com dados para alteração (body)
//
// editar
app.put('/paletas/edit/', (req, res) => {
  const _paleta = req.body;

  const chosenPaleta = findPaleta(_paleta.id);
  if (!chosenPaleta) {
    message = 'Paleta não localizada!';
    res.send(message);
    return;
  }

  // peleta localizada
  chosenPaleta.sabor = _paleta.sabor;
  chosenPaleta.descricao = _paleta.descricao;
  chosenPaleta.foto = _paleta.foto;
  chosenPaleta.preco = _paleta.preco;

  message = 'Paleta alterada com sucesso!';

  res.send(chosenPaleta);
});

//
// deletar
app.delete('/paletas/delete/:id', (req, res) => {
  const idParam = req.params.id;

  let choosenPaleta = -1;
  // procura pela paleta
  for (var i = 0; i < paletas.length; i++) {
    if (paletas[i].id == idParam) {
      choosenPaleta = i;
      break;
    }
  }

  // peleta não localizada
  if (choosenPaleta == -1) {
    message = 'Erro! Paleta não localizada.';
    res.send(message);
    return;
  }

  paletas.splice(choosenPaleta, 1);

  message = 'Paleta deletada com sucesso!';

  res.send(message);
  // redirect() não funcionou no thunder client
  //res.redirect('/');
});

//
// servidor da app
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
