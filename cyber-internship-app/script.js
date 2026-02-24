const internships = [
  {
    title: "Penetration Testing Intern",
    company: "EG-CERT",
    country: "Egypt",
    mode: "On-site",
    relocation: false,
    tags: ["Web Pentest", "Burp Suite", "OWASP"],
    link: "https://www.egcert.eg/"
  },
  {
    title: "Offensive Security Intern",
    company: "Orange Cyberdefense",
    country: "Egypt",
    mode: "Hybrid",
    relocation: false,
    tags: ["Network Pentest", "Nmap", "Report Writing"],
    link: "https://www.orangecyberdefense.com/global/careers"
  },
  {
    title: "Remote Penetration Tester Intern",
    company: "HackerOne",
    country: "Global",
    mode: "Remote",
    relocation: true,
    tags: ["Bug Bounty", "API Testing", "Recon"],
    link: "https://www.hackerone.com/careers"
  },
  {
    title: "Application Security Internship",
    company: "NCC Group",
    country: "United Kingdom",
    mode: "Remote",
    relocation: true,
    tags: ["SAST", "DAST", "Threat Modeling"],
    link: "https://www.nccgroup.com/us/careers/"
  }
];

const listEl = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const relocationFilter = document.getElementById("relocationFilter");
const clearBtn = document.getElementById("clearBtn");
const resultsCount = document.getElementById("resultsCount");
const template = document.getElementById("cardTemplate");

const savedKey = "savedInternships";
const savedSet = new Set(JSON.parse(localStorage.getItem(savedKey) || "[]"));

function matches(item, q, location, relocationOnly) {
  const text = `${item.title} ${item.company} ${item.country} ${item.tags.join(" ")}`.toLowerCase();
  const queryMatch = text.includes(q);

  const locationMatch =
    location === "all" ||
    (location === "egypt" && item.country.toLowerCase() === "egypt") ||
    (location === "remote" && item.mode.toLowerCase() === "remote");

  const relocationMatch = !relocationOnly || item.relocation;

  return queryMatch && locationMatch && relocationMatch;
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const location = locationFilter.value;
  const relocationOnly = relocationFilter.checked;

  const filtered = internships.filter((item) => matches(item, q, location, relocationOnly));

  listEl.innerHTML = "";
  resultsCount.textContent = `${filtered.length} internship(s) found`;

  filtered.forEach((item) => {
    const card = template.content.cloneNode(true);
    card.querySelector(".title").textContent = item.title;
    card.querySelector(".type").textContent = item.mode;
    card.querySelector(".company").textContent = item.company;
    card.querySelector(".details").textContent = `${item.country} • Relocation: ${item.relocation ? "Yes" : "No"}`;
    card.querySelector(".tags").textContent = `Skills: ${item.tags.join(", ")}`;

    const apply = card.querySelector(".apply");
    apply.href = item.link;

    const saveBtn = card.querySelector(".saveBtn");
    const id = `${item.company}:${item.title}`;
    saveBtn.textContent = savedSet.has(id) ? "Saved" : "Save";

    saveBtn.addEventListener("click", () => {
      if (savedSet.has(id)) {
        savedSet.delete(id);
      } else {
        savedSet.add(id);
      }
      localStorage.setItem(savedKey, JSON.stringify([...savedSet]));
      render();
    });

    listEl.appendChild(card);
  });
}

[searchInput, locationFilter, relocationFilter].forEach((el) =>
  el.addEventListener("input", render)
);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  locationFilter.value = "all";
  relocationFilter.checked = false;
  render();
});

render();
