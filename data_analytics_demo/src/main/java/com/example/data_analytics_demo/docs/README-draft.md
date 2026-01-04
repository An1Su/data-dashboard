# Casino Marketing Analytics Demo

## Purpose

Demo app to show how a marketing/sales team at an online casino (like Paf) could monitor campaign performance and user activity using daily data, built only with technologies in the Paf Tech Radar “Adopt” ring.[web:7][web:21][web:22][web:54]

## Tech Stack

- Backend: Java, Spring Boot, Spring Data JPA, Spring Security, Maven.[web:22][web:61][web:67]
- Database: PostgreSQL (local), representing a stand‑in for Snowflake in production.[web:22][web:31][web:54]
- Frontend (planned): React + Next.js + TypeScript, Tailwind CSS, daisyUI.[web:22][web:37]
- DevOps (conceptual): GitHub, GitHub Actions, Docker; aligns with Paf Tech Radar tools and platforms.[web:22][web:32][web:43]

## Data Model (MVP)

- Campaign: id, name, channel, country, budget, startDate, endDate.[web:7][web:16][web:19]
- CampaignDailyKpi: date, campaign, impressions, clicks, spend, registrations, ftds, depositsAmount, withdrawalsAmount, bonusCost, ggr, ngr.[web:7][web:16][web:19][web:52]
- (Planned) EmailCampaign and EmailCampaignDailyKpi with typical email KPIs (sent, opens, clicks, conversions, revenue, unsubscribes).[web:8][web:11][web:20]

## Demo Data

- Loaded via a Spring Boot DataInitializer, simulating daily ETL into Snowflake.[web:54][web:102][web:105]
- 3 campaigns (FI, SE; channels: Google Ads, Facebook, Email).
- 14 days of daily KPIs per campaign with realistic ranges and noise, in a typical analytics “one row per date per campaign” format.[web:7][web:19][web:52][web:96]

## APIs (MVP)

- `GET /api/campaigns` – list all campaigns.[web:61][web:67]
- `GET /api/campaigns/{id}/daily?from=YYYY-MM-DD&to=YYYY-MM-DD` – daily KPIs for a campaign in a date range.[web:96][web:99][web:101]

## Security (MVP)

- Spring Security with HTTP Basic Auth and in‑memory users.[web:64][web:117]
- Roles:
    - `MARKETING` (user: `marketing` / `marketing123`)
    - `ADMIN` (user: `admin` / `admin123`)
- Access rules:
    - `/api/campaigns/**` requires role MARKETING or ADMIN.
- In documentation: note that in production, this would be replaced by SSO/JWT and Snowflake‑level role‑based access control.

## Future Improvements (Ideas)

- Replace PostgreSQL with real Snowflake connection for marketing data.[web:54][web:105]
- Add email performance entities and endpoints.
- Add frontend dashboards (filters, KPI cards, charts, export CSV).
- Replace Basic Auth with JWT or corporate SSO.
- Implement alerts and anomaly detection; integrate with AWS services or OpenAI API, all in line with Tech Radar “Adopt” items.[web:21][web:31][web:54]
