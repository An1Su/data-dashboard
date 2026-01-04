# Marketing Analytics Dashboard

A full-stack demo application for tracking marketing campaign and email marketing performance.

## Live Demo

- **Frontend**: [https://data-dashboard-five.vercel.app](https://data-dashboard-five.vercel.app)
- **Backend API**: [https://data-dashboard-hpjh.onrender.com](https://data-dashboard-hpjh.onrender.com)

## 📁 Project Structure

```
data-dashboard/
├── data_analytics_demo/     # Spring Boot Backend (Java)
└── marketing_dashboard_next/  # Next.js Frontend (TypeScript/React)
```

## 🛠️ Tech Stack

### Backend
- **Java 17** with **Spring Boot 4.0.1**
- **Spring Data JPA** for database operations
- **PostgreSQL** database
- **Spring Security** for authentication
- **Maven** for build management

### Frontend
- **Next.js 16** with **React 19**
- **TypeScript**
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **TanStack Query** for data fetching

## Running Locally

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (or use Docker)

### Backend Setup

```bash
cd data_analytics_demo
./mvnw spring-boot:run
```

The backend will run on `http://localhost:8084`

**Default credentials:**
- Username: `marketing` / Password: `marketing123`
- Username: `admin` / Password: `admin123`

### Frontend Setup

```bash
cd marketing_dashboard_next
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- **Campaign Analytics**: Track impressions, clicks, spend, registrations, FTDs, deposits, withdrawals, bonus costs, GGR, and NGR
- **Email Campaign Metrics**: Monitor sent emails, open rates, clicks, conversions, revenue, and unsubscribes
- **Daily KPI Tracking**: View performance metrics over time
- **Date Range Filtering**: Analyze data for specific time periods
- **Responsive Design**: Optimized for desktop viewing

## API Endpoints

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `GET /api/campaigns/{id}/daily?from=YYYY-MM-DD&to=YYYY-MM-DD` - Get daily KPIs for a campaign

### Email Campaigns
- `GET /api/email-campaigns` - List all email campaigns
- `GET /api/email-campaigns/{id}/daily?from=YYYY-MM-DD&to=YYYY-MM-DD` - Get daily KPIs for an email campaign

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render (Docker)
- **Database**: PostgreSQL on Render

## Notes

- This is a demo application for job application purposes
- Backend uses free tier (may have cold start delays)
- Authentication is enabled on the backend API

