// script.js

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const generoButtons = document.querySelectorAll(".genero-btn");
  const livrosContainer = document.getElementById("livrosContainer");
  const fraseEl = document.getElementById("frase-literaria");
  const frases = [
    '"Ler é sonhar pela mão de outrem." – Fernando Pessoa',
    '"A leitura é para o espírito o que o exercício é para o corpo." – Joseph Addison',
    '"Os livros são os aviões, os trens e as estradas. Eles são o destino e a viagem." – Anna Quindlen',
    '"Um livro é um sonho que você segura com as mãos." – Neil Gaiman',
    '"A leitura engrandece a alma." – Voltaire'
  ];

  fraseEl.textContent = frases[Math.floor(Math.random() * frases.length)];

  const livrosData = [
    {
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
      genero: "romance",
      imagem: "dom-casmurro.jpg",
      pdf: "dom-casmurro.pdf",
      epub: "dom-casmurro.epub"
    },
    {
      titulo: "A República",
      autor: "Platão",
      genero: "filosofia",
      imagem: "republica.jpg",
      pdf: "republica.pdf",
      epub: "republica.epub"
    },
    {
      titulo: "Os Lusíadas",
      autor: "Luís de Camões",
      genero: "poesia",
      imagem: "lusíadas.jpg",
      pdf: "lusíadas.pdf",
      epub: "lusíadas.epub"
    },
    // Adicione mais livros conforme necessário
  ];

  const estante = JSON.parse(localStorage.getItem("estante")) || [];

  function renderLivros(lista) {
    livrosContainer.innerHTML = "";
    lista.forEach(livro => {
      const isLiked = estante.includes(livro.titulo);

      const div = document.createElement("div");
      div.className = "livro";
      div.setAttribute("data-genero", livro.genero);
      div.innerHTML = `
        <img src="${livro.imagem}" alt="Capa do livro">
        <h3>${livro.titulo}</h3>
        <p>${livro.autor}</p>
        <div class="livro-acoes">
          <button class="like-btn ${isLiked ? 'liked' : ''}">${isLiked ? '💖' : '❤️'}</button>
          <a href="${livro.pdf}" download class="baixar-btn">📥 PDF</a>
          <a href="${livro.epub}" download class="baixar-btn">📘 EPUB</a>
          <a href="leitor.html?livro=${livro.epub}" class="ler-online-btn">📖 Ler online</a>
        </div>
      `;
      livrosContainer.appendChild(div);
    });

    atualizarBotoesLike();
  }

  function atualizarBotoesLike() {
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const livroEl = button.closest(".livro");
        const titulo = livroEl.querySelector("h3").textContent;
        const index = estante.indexOf(titulo);

        if (index >= 0) {
          estante.splice(index, 1);
          button.classList.remove("liked");
          button.textContent = "❤️";
        } else {
          estante.push(titulo);
          button.classList.add("liked");
          button.textContent = "💖";
        }

        localStorage.setItem("estante", JSON.stringify(estante));
      });
    });
  }

  function filtrarLivrosPorBusca() {
    const termo = searchInput.value.toLowerCase();
    const livros = document.querySelectorAll(".livro");
    livros.forEach(livro => {
      const titulo = livro.querySelector("h3").textContent.toLowerCase();
      livro.style.display = titulo.includes(termo) ? "flex" : "none";
    });
  }

  searchButton.addEventListener("click", filtrarLivrosPorBusca);
  searchInput.addEventListener("input", filtrarLivrosPorBusca);

  generoButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      generoButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const generoSelecionado = btn.dataset.genero;

      const livros = document.querySelectorAll(".livro");
      livros.forEach(livro => {
        livro.style.display = livro.dataset.genero === generoSelecionado ? "flex" : "none";
      });
    });
  });

  renderLivros(livrosData);
});
