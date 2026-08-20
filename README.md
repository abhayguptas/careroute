<div align="center">
  <img src="public/brand/careroute-logo.svg" alt="CareRoute Logo" width="400" />
  
  <p><b>Local Healthcare Intelligence & Navigation</b></p>
  <p>CareRoute turns fragmented public healthcare information into clear, location-aware options you can act on.</p>

  <br />

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Bright Data](https://img.shields.io/badge/Bright_Data-Scraper_API-10B981?style=for-the-badge)](https://brightdata.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 🏆 Hackathon Tracks Targeted

- **Track 1: Best Use of Web Scraper API** (Core data ingestion)
- **Track 2: Spider-Sense (Clean Code)** (Enterprise Repository/Service pattern)
- **Track 3: Unbreakable Scraper (Self-Healing)** (Autonomous schema recovery)

## 💡 The Problem

When people need specific healthcare resources (e.g., a Level-1 Trauma Center, 24/7 dialysis, or specific blood groups), the answers are scattered across poorly maintained hospital websites, fragmented government portals, and static directories. **Finding life-saving care shouldn't require a research project.**

## 🚀 The Solution: CareRoute

CareRoute is a web intelligence layer that converts vague human requests into a verified, localized healthcare resource map. 

Instead of being a static directory, CareRoute acts as an autonomous intelligence engine. If a facility isn't in the system, users can submit its URL. CareRoute uses **Bright Data's Web Scraper API & AI Flow** to dynamically construct a scraper, parse the unstructured website, extract the exact 17 fields our schema requires, and instantly ingest it into the local database.

### Key Features

1. **Natural Language Search:** "Find me a government hospital with pediatric cardiology."
2. **Emergency Mode:** A high-contrast, distraction-free UI dedicated to urgent care resources.
3. **Autonomous Onboarding:** Paste any hospital URL to dynamically generate a Bright Data Collector.
4. **Self-Healing Infrastructure:** If a hospital updates their website and breaks the scraper, CareRoute's AI Flow detects the failure and re-maps the schema autonomously.
5. **Evidence-First UI:** Every medical fact displays its exact provenance, source URL, and timestamp of verification.

## 🏗️ Architecture

CareRoute was built with an enterprise-grade "Spider-Sense" architecture to ensure scalability and maintainability.

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS v4, Lucide Icons.
- **Backend:** Next.js API Routes.
- **Data Layer:** `better-sqlite3` strictly isolated behind a Repository Pattern (`src/lib/db/repositories`).
- **Orchestration:** A dedicated Service Layer (`src/lib/services/scraper.service.ts`) orchestrates Bright Data API calls and DB transactions.
- **Infrastructure:** Dockerized multi-stage build.

## 🛠️ Getting Started

### Prerequisites

- Docker OR Node.js 22+
- A Bright Data Account & API Key

### Local Development (Node.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/careroute.git
   cd careroute
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   BRIGHT_DATA_TOKEN=your_token_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Access the app at [http://localhost:3000](http://localhost:3000).

### Deployment (Docker)

CareRoute includes an optimized, multi-stage Dockerfile.

```bash
docker build -t careroute:latest .
docker run -d -p 3000:3000 --env-file .env --name careroute-app careroute:latest
```

## 🎨 Design System

CareRoute utilizes a highly polished, YC-startup inspired monochrome design system:
- **Pitch Black (`#000000`)** backgrounds for maximum contrast.
- **Emerald Green (`#10B981`)** semantic accents representing healthcare trust and technical precision.
- **Coral Red (`#E11D48`)** reserved exclusively for the Emergency Mode flows.
- Pure SVG iconography and custom fluid components.

---
*Built with ❤️ for the Bright Data Hackathon.*
