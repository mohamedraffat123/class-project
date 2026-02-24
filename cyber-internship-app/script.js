const internships = [
  {
    title: "Penetration Testing Intern",
    company: "EG-CERT",
    country: "Egypt",
    mode: "On-site",
    relocation: false,
    tags: ["Web Pentest", "Burp Suite", "OWASP"],
    source: "egcert.eg",
    link: "https://www.egcert.eg/"
  },
  {
    title: "Offensive Security Intern",
    company: "Orange Cyberdefense",
    country: "Egypt",
    mode: "Hybrid",
    relocation: false,
    tags: ["Network Pentest", "Nmap", "Report Writing"],
    source: "orangecyberdefense.com",
    link: "https://www.orangecyberdefense.com/global/careers"
  },
  {
    title: "SOC & Pentest Intern",
    company: "ITIDA",
    country: "Egypt",
    mode: "On-site",
    relocation: false,
    tags: ["SIEM", "Vulnerability Assessment", "Linux"],
    source: "itida.gov.eg",
    link: "https://itida.gov.eg/English/Careers/Pages/default.aspx"
  },
  {
    title: "Cybersecurity Intern",
    company: "IBM",
    country: "Global",
    mode: "Remote",
    relocation: true,
    tags: ["AppSec", "Threat Hunting", "Python"],
    source: "ibm.com",
    link: "https://www.ibm.com/careers"
  },
  {
    title: "Security Consulting Intern",
    company: "Deloitte",
    country: "Global",
    mode: "Hybrid",
    relocation: true,
    tags: ["Red Team", "Risk Assessment", "Client Reports"],
    source: "deloitte.com",
    link: "https://www2.deloitte.com/global/en/careers.html"
  },
  {
    title: "Application Security Internship",
    company: "NCC Group",
    country: "United Kingdom",
    mode: "Remote",
    relocation: true,
    tags: ["SAST", "DAST", "Threat Modeling"],
    source: "nccgroup.com",
    link: "https://www.nccgroup.com/us/careers/"
  },
  {
    title: "Red Team Intern",
    company: "CrowdStrike",
    country: "Global",
    mode: "Remote",
    relocation: true,
    tags: ["Endpoint Security", "Detection Evasion", "Scripting"],
    source: "crowdstrike.com",
    link: "https://www.crowdstrike.com/careers/"
  },
  {
    title: "Ethical Hacking Intern",
    company: "Bugcrowd",
    country: "Global",
    mode: "Remote",
    relocation: false,
    tags: ["Bug Bounty", "Recon", "Responsible Disclosure"],
    source: "bugcrowd.com",
    link: "https://www.bugcrowd.com/careers/"
  },
  {
    title: "Offensive Security Internship",
    company: "Bishop Fox",
    country: "United States",
    mode: "Remote",
    relocation: true,
    tags: ["Cloud Pentest", "Internal Pentest", "Social Engineering"],
    source: "bishopfox.com",
    link: "https://bishopfox.com/careers"
  },
  {
    title: "Penetration Testing Intern",
    company: "Mandiant (Google Cloud)",
    country: "Global",
    mode: "Remote",
    relocation: true,
    tags: ["Incident Response", "Malware Analysis", "Pentest"],
    source: "cloud.google.com",
    link: "https://cloud.google.com/careers"
  },
  {
    title: "Cybersecurity Internship Program",
    company: "Cisco",
    country: "Global",
    mode: "Hybrid",
    relocation: true,
    tags: ["Network Security", "Zero Trust", "Automation"],
    source: "jobs.cisco.com",
    link: "https://jobs.cisco.com/"
  },
  {
    title: "Security Engineering Intern",
    company: "Microsoft",
    country: "Global",
    mode: "Hybrid",
    relocation: true,
    tags: ["Cloud Security", "Identity", "Secure Coding"],
    source: "careers.microsoft.com",
    link: "https://careers.microsoft.com/students/us/en"
  },
  {
    title: "Cyber Defense Intern",
    company: "Palo Alto Networks",
    country: "Global",
    mode: "Remote",
    relocation: true,
    tags: ["Threat Intel", "SOC", "EDR"],
    source: "jobs.paloaltonetworks.com",
    link: "https://jobs.paloaltonetworks.com/en/"
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
  const text = `${item.title} ${item.company} ${item.country} ${item.tags.join(" ")} ${item.source}`.toLowerCase();
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
  resultsCount.textContent = `${filtered.length} internship(s) found from real domains`;

  filtered.forEach((item) => {
    const card = template.content.cloneNode(true);
    card.querySelector(".title").textContent = item.title;
    card.querySelector(".type").textContent = item.mode;
    card.querySelector(".company").textContent = `${item.company} (${item.source})`;
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
