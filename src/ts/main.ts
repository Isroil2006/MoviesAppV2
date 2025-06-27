interface Movie {
  id: number;
  title: string;
  genre: string;
  stock: number;
  rate: number;
}

const movies: Movie[] = [
  { id: 1, title: "Avengers: Endgame", genre: "action", stock: 5, rate: 9.5 },
  { id: 2, title: "Jumanji", genre: "comedy", stock: 7, rate: 7.8 },
  { id: 3, title: "The Notebook", genre: "romance", stock: 4, rate: 8.2 },
  { id: 4, title: "Inception", genre: "thriller", stock: 3, rate: 9.0 },
  { id: 5, title: "Deadpool", genre: "comedy", stock: 6, rate: 8.1 },
  { id: 6, title: "Titanic", genre: "romance", stock: 5, rate: 9.1 },
  { id: 7, title: "Fast & Furious", genre: "action", stock: 9, rate: 7.9 },
  { id: 8, title: "Joker", genre: "thriller", stock: 2, rate: 8.9 },
  { id: 9, title: "Black Panther", genre: "action", stock: 5, rate: 8.0 },
  { id: 10, title: "La La Land", genre: "romance", stock: 3, rate: 8.5 },
  {
    id: 11,
    title: "Spider-Man: No Way Home",
    genre: "action",
    stock: 6,
    rate: 9.0,
  },
  { id: 12, title: "Shrek", genre: "comedy", stock: 8, rate: 7.7 },
  { id: 13, title: "A Quiet Place", genre: "thriller", stock: 2, rate: 7.8 },
  { id: 14, title: "Interstellar", genre: "thriller", stock: 4, rate: 9.3 },
  { id: 15, title: "The Godfather", genre: "thriller", stock: 3, rate: 9.2 },
];

const pageSize = 5;
let currentPage = 1;
let filteredMovies: Movie[] = [...movies];

// DOM elementlar
const moviesTableBody = document.querySelector(
  "#moviesTableBody"
) as HTMLElement;
const movieCount = document.querySelector("#movieCount") as HTMLElement;
const pagination = document.querySelector("#pagination") as HTMLElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const categoryList = document.querySelector("#categoryList") as HTMLElement;

function renderMovies() {
  moviesTableBody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const paginatedMovies = filteredMovies.slice(start, start + pageSize);

  paginatedMovies.forEach((movie) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${capitalize(movie.genre)}</td>
      <td>${movie.stock}</td>
      <td>${movie.rate}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteMovie(${
          movie.id
        })">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    moviesTableBody.appendChild(row);
  });

  movieCount.textContent = `${filteredMovies.length}`;
  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(filteredMovies.length / pageSize);

  const nav = document.createElement("nav");
  nav.className = "d-flex justify-content-center mt-3";

  const ul = document.createElement("ul");
  ul.className = "pagination mb-0 d-flex align-items-center gap-1 flex-wrap";

  for (let i = 1; i <= pageCount; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link text-center" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderMovies();
    });
    ul.appendChild(li);
  }

  nav.appendChild(ul);
  pagination.appendChild(nav);
}

categoryList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "BUTTON") {
    document
      .querySelectorAll("#categoryList button")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    const category = target.getAttribute("data-category")!;
    if (category === "all") {
      filteredMovies = [...movies];
    } else {
      filteredMovies = movies.filter((m) => m.genre === category);
    }
    currentPage = 1;
    renderMovies();
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(query));
  currentPage = 1;
  renderMovies();
});

(window as any).deleteMovie = function (id: number) {
  const index = movies.findIndex((m) => m.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
    filteredMovies = [...movies];
    renderMovies();
  }
};

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

renderMovies();

const loginBtn = document.querySelector(".login-btn") as HTMLButtonElement;

loginBtn.onclick = () => {
  const movieApp = document.querySelector(
    ".movie-app"
  ) as HTMLTableSectionElement;

  const loginSection = document.querySelector(
    ".login-section"
  ) as HTMLTableSectionElement;



  movieApp.style.display = "none";
  loginSection.style.display = "block";
};
