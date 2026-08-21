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

## Why It Exists

Finding the right healthcare facility can be confusing and slow. When a person needs a specific medical service, like a Level 1 Trauma Center, 24/7 dialysis availability, or a blood bank with a specific type of blood, they often have to search through many poorly updated websites and static lists. The information is scattered across the internet and very hard to verify.

We built CareRoute to solve this data bottleneck. CareRoute acts as an intelligent system that automatically reads, organizes, and validates medical capabilities directly from unstructured hospital websites in real time. Instead of relying on manual data entry, CareRoute finds the exact healthcare resources you need when every minute counts.

## How It Works and Features

CareRoute is a web platform that takes a public hospital link and automatically turns its website into structured, searchable data.

**Core features we are providing:**

- **Autonomous Web Scraper Generation:** Users just submit a link to a hospital website. CareRoute automatically builds a custom scraper to extract data using Bright Data AI Flow.
- **Smart Information Mapping:** The system automatically maps unstructured text from the target website into a strict 17 point healthcare checklist.
- **Medical Evidence Tracking:** Every piece of information extracted (like "Dialysis Available") is saved with a timestamp and a link to the exact page it was found on, ensuring total transparency.
- **Self-Healing Capabilities:** If a hospital updates the structure of its website, CareRoute detects the broken scraper and automatically asks the AI to fix the extraction logic.

**Real Life Example:**
Imagine an ambulance driver is looking for a nearby facility that has a specialized burn unit open at 2:00 AM. Instead of calling multiple hospitals or scrolling through out of date websites, they can simply open CareRoute, filter for "Burn Unit" and "24/7 Availability", and immediately see a verified list of facilities along with the exact source of that information.

## Future Development

We are planning several major improvements for the next phase of CareRoute:

- **Real Time Bed Availability:** Integrating with hospital management APIs to show live bed and intensive care unit availability.
- **Automated Phone Verification:** Adding a system that can automatically call clinics with AI voice agents to confirm their hours of operation if the website data is missing.
- **Geospatial Routing:** Providing live mapping and traffic routing to the best facility based on the patient's current location and medical needs.
- **Multi-Language Support:** Automatically translating scraped healthcare data to help non native speakers find the care they need.

## Technical and Architectural Details

**How We Use Bright Data Scraper Studio**
CareRoute relies heavily on the Bright Data Web Scraper API. When a new hospital link is added, the application sends an API request to Bright Data to programmatically create a brand new scraper in Scraper Studio. We then trigger the Bright Data AI Agent to automatically write the extraction logic based on the website's structure.

**How The Data Flow Works**

1. **Creation:** A user submits a hospital link.
2. **Provisioning:** The backend sends a request to Bright Data to create a new scraper and binds it to a secure webhook.
3. **AI Generation:** The system uses the Bright Data automate template API to generate the scraping rules.
4. **Execution:** Once the scraper is ready, CareRoute triggers a live run.
5. **Ingestion:** Bright Data extracts the data and sends the structured results back to our secure webhook. Our system validates the data and saves it to a local SQLite database.

**How Our Application Works**
CareRoute is built on Next.js 15 using TypeScript. The architecture follows a strict Repository and Service pattern. The presentation layer (React components) never touches the database directly. Instead, all complex logic, including API calls to Bright Data and database transactions, are handled securely on the server side. This clean architecture makes the system highly scalable and very easy for other developers to review and maintain.

## Local Development Setup

**Prerequisites**

- Docker OR Node.js 22 or higher
- A valid Bright Data API Token

**Environment Configuration**
Create a `.env` file in the root directory containing your authentication tokens:

```env
BRIGHT_DATA_TOKEN=your_token_here
```

**Option A: Standard Node.js Execution**

```bash
git clone https://github.com/yourusername/careroute.git
cd careroute
npm install
npm run dev
```

**Option B: Docker Deployment (Recommended)**
CareRoute includes an optimized Dockerfile utilizing Next.js standalone output for minimal image size.

```bash
docker build -t careroute:latest .
docker run -d -p 3000:3000 --env-file .env --name careroute-app careroute:latest
```

The application will be accessible at `http://localhost:3000`.
