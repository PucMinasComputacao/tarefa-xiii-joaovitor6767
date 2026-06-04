const API_URL = "http://localhost:3000/cursos";

async function fetchItems() {
    const response = await fetch(API_URL);
    return await response.json();
}

function createCard(item) {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">
        <h2>${item.nome}</h2>
        <p>${item.descricaoCurta}</p>
        <p><strong>Categoria:</strong> ${item.categoria}</p>
        <p><strong>Preço:</strong> R$ ${item.preco}</p>

        <a class="btn" href="details.html?id=${item.id}">
            Ver detalhes
        </a>
    `;

    return card;
}

function renderCards(items) {
    const container = document.getElementById("cards-container");

    container.innerHTML = "";

    items.forEach(item => {
        container.appendChild(createCard(item));
    });
}

async function init() {
    try {
        const items = await fetchItems();
        renderCards(items);
    } catch (error) {
        console.error(error);
    }
}

init();


  