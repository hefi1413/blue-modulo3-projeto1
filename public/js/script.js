const baseUrl = 'http://localhost:3000/paletas';

async function findAllPaletas() {
  let url = `${baseUrl}/find`;

  findPaletas(url);
}

const findPaletaById = async () => {
  const id = document.getElementById('idPaleta').value;

  let url = `${baseUrl}/find/${id}`;

  // se não informado algum id, retorna todas paletas
  if (!id) {
    url = `${baseUrl}/find`;
  }

  findPaletas(url);
};

async function findPaletas(url) {
  const response = await fetch(url);
  const paletas = await response.json();

  let html = '';
  paletas.forEach((paleta) => {
    html += `<div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.id} - ${
      paleta.sabor
    }</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco.toFixed(
              2,
            )}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
        </div>
      <img class="PaletaListaItem__foto" src=/images/${
        paleta.foto
      } alt=${`Paleta de ${paleta.sabor}`} 
      /> </div>`;
  });

  // atribui recordset à lista
  let list = document.getElementById('paletaList');
  list.innerHTML = html;
}

findAllPaletas();
