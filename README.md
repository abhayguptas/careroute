<div align="center">
  <img src="public/brand/careroute-logo.svg" alt="CareRoute Logo" width="400" />
</div>

<br />

<div align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="https://brightdata.com/"><img src="https://img.shields.io/badge/Bright_Data-AI_Flow-10B981?style=flat-square" alt="Bright Data" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://sqlite.org/"><img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite" /></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" /></a>
</div>

<br />

**CareRoute** is an autonomous web intelligence layer designed to eliminate fragmentation in public healthcare data. By leveraging Bright Data's Web Scraper API and AI Flow, CareRoute dynamically extracts, structures, and validates healthcare capabilities from unstructured hospital websites in real-time.

---

## Executive Summary

When individuals require specific healthcare resources—such as a Level-1 Trauma Center, 24/7 dialysis availability, or specific blood bank inventory—the answers are heavily fragmented across poorly maintained static directories and unstructured facility websites.

CareRoute solves this data ingestion bottleneck. Rather than relying on manual data entry, CareRoute acts as a self-healing intelligence engine. Users simply submit a facility's public URL, and the system autonomously provisions a dedicated Bright Data collector, maps the target website to a strict 17-point healthcare schema, and ingests verified intelligence into a localized routing database.

## System Architecture & Data Flow

CareRoute is engineered with a strict adherence to clean code principles, utilizing a decoupled Repository and Service pattern to manage the complexity of autonomous web scraping.

### 1. Autonomous Ingestion (Spider-Sense Architecture)

When a new facility URL is submitted via the onboarding interface, the application triggers the `ScraperService`.

- **Collector Provisioning**: A `POST /dca/collector` request is dispatched to Bright Data to provision a dedicated entity.
- **AI Schema Mapping**: A `POST /automate_template` request is executed, triggering the AI Agent to autonomously analyze the target DOM structure against CareRoute's predefined healthcare schema.
- **Asynchronous Polling**: The frontend dashboard polls the status endpoint while the AI generates the necessary extraction logic.
- **Execution & Ingestion**: Upon completion, the collector is triggered, and the structured JSON output is normalized and ingested into the local SQLite database.

### 2. Self-Healing Infrastructure (Unbreakable Scraper)

Hospital websites undergo frequent structural changes. CareRoute implements a resilient self-healing pipeline.

- If a scheduled collector run returns a schema validation error (e.g., missing critical fields like `emergency_hours`), the system catches the exception.
- The `HealingService` is invoked to automatically dispatch a re-mapping request to the Bright Data AI Flow.
- The collector rebuilds its extraction logic autonomously, preventing data staleness without human intervention.

### 3. Data Provenance & Evidence

To establish medical trust, CareRoute treats data provenance as a first-class citizen.
Every extracted fact (e.g., "Dialysis Available") is stored alongside its source URL and the specific extraction timestamp. The frontend interface surfaces this metadata through specialized "Evidence Panels," allowing users to verify exactly where the AI obtained the information.

## Technical Implementation Highlights

- **Clean Architecture**: The application strictly separates concerns. The database layer (`better-sqlite3`) is entirely isolated behind the Repository Pattern (`src/lib/db/repositories`), ensuring the presentation layer never interacts directly with data models.
- **Orchestration Layer**: Complex Bright Data API sequences (Creation → AI Flow Trigger → Polling → Execution) are encapsulated within dedicated Service classes (`src/lib/services`).
- **High-Performance UI**: Built on Next.js 15 (Turbopack) and React, featuring a highly technical, monochrome design system implemented entirely in standard CSS (Tailwind v4) with zero reliance on heavy component libraries.

## Hackathon Tracks Targeted

This project was specifically architected to demonstrate excellence in the following Bright Data hackathon tracks:

1. **Best Use of Web Scraper API**: Serving as the core ingestion engine for the entire product.
2. **Spider-Sense (Clean Code)**: Demonstrating enterprise-grade architectural patterns (Repositories, Services, DTOs).
3. **Unbreakable Scraper (Self-Healing)**: Utilizing AI Flow to recover from DOM structural mutations autonomously.

## Local Development Setup

### Prerequisites

- Docker OR Node.js 22+
- A valid Bright Data API Token

### Environment Configuration

Create a `.env` file in the root directory containing your authentication tokens:

```env
BRIGHT_DATA_TOKEN=your_token_here
```

### Option A: Standard Node.js Execution

```bash
git clone https://github.com/yourusername/careroute.git
cd careroute
npm install
npm run dev
```

### Option B: Docker Deployment (Recommended)

CareRoute includes an optimized, multi-stage Dockerfile utilizing Next.js standalone output for minimal image size.

```bash
docker build -t careroute:latest .
docker run -d -p 3000:3000 --env-file .env --name careroute-app careroute:latest
```

The application will be accessible at `http://localhost:3000`.
