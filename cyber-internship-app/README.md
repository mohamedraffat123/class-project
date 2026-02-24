# Cybersecurity Internship Finder

Simple local web app to browse penetration-testing focused internship opportunities:
- Local in Egypt
- Remote global
- Roles with relocation support

## Run locally

```bash
cd cyber-internship-app
python3 -m http.server 8080
```

Then open http://localhost:8080

## Features

- Keyword search
- Location filter (Egypt / Remote / All)
- Relocation-only toggle
- Save internships in browser localStorage
- Uses many **real company domains** (not `example.com`)
- Includes a visible source domain for each internship card

## Current source domains

Examples included in the data: `egcert.eg`, `orangecyberdefense.com`, `itida.gov.eg`, `ibm.com`, `deloitte.com`, `nccgroup.com`, `crowdstrike.com`, `bugcrowd.com`, `bishopfox.com`, `cloud.google.com`, `jobs.cisco.com`, `careers.microsoft.com`, `jobs.paloaltonetworks.com`.

## Note

Some links point to general careers pages because internship postings can open/close frequently.
