const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function fetchItem(id) {
    const response = await fetch(
        `http://localhost:3000/cursos/${id}`
    );

    if (!response.ok) {
        throw new Error("Curso não encontrado");
    }

    return await response.json();
}

function renderItem(item) {

    const container =
        document.getElementById("details-container");

    container.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}">

        <h1>${item.nome}</h1>

        <p><strong>Categoria:</strong> ${item.categoria}</p>

        <p><strong>Preço:</strong> R$ ${item.preco}</p>

        <p>${item.descricaoCompleta}</p>

        <h3>Tags</h3>

        <div class="tags">
            ${item.tags.map(tag =>
                `<span class="tag">${tag}</span>`
            ).join("")}
        </div>

        <br>

        <a class="btn" href="index.html">
            Voltar
        </a>
    `;
}

async function init() {

    const container =
        document.getElementById("details-container");

    if (!id) {
        container.innerHTML =
            "<h2>ID não informado.</h2>";
        return;
    }

    try {
        const item = await fetchItem(id);
        renderItem(item);
    } catch (error) {
        container.innerHTML =
            "<h2>Curso não encontrado.</h2>";
    }
}

init();