
const paperGrid = document.getElementById("paperGrid");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalSummary = document.getElementById("modalSummary");
const modalDetails = document.getElementById("modalDetails");
const closeBtn = document.querySelector(".close");

const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");

// Function to render papers dynamically
function renderPapers(filteredPapers) {
  paperGrid.innerHTML = ""; // clear existing papers

  if (filteredPapers.length === 0) {
    paperGrid.innerHTML = "<p>No papers found.</p>";
    return;
  }

  filteredPapers.forEach((paper) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${paper.title}</h3>
      ${paper.category ? 
        `<span class="category-tag" style="background-color:${paper.category.color}">
          ${paper.category.name}
        </span>` : ""}
      <p>${paper.summary}</p>
    `;

    card.addEventListener("click", () => openModal(paper));
    paperGrid.appendChild(card);
  });
}

// Open modal
function openModal(paper) {
  modalTitle.textContent = paper.title;
  modalSummary.textContent = paper.summary;
  modalDetails.innerHTML = paper.details.replace(/\n/g, "<br>");
  modal.style.display = "flex";
}

// Close modal
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// FILTERING LOGIC
function filterPapers() {
  const searchTerm = searchBar.value.toLowerCase();
  const categoryValue = categoryFilter.value;
  const dateValue = dateFilter.value;

  const filtered = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryValue === "" || (paper.category && paper.category.name === categoryValue);
    
    // Optional: if papers have year field in the future
    const matchesDate = true; // placeholder, adjust when you add dates

    return matchesSearch && matchesCategory && matchesDate;
  });

  renderPapers(filtered);
}

// Attach listeners
searchBar.addEventListener("input", filterPapers);
categoryFilter.addEventListener("change", filterPapers);
dateFilter.addEventListener("change", filterPapers);

// Initial render
renderPapers(papers);
