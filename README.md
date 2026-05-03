# BrewJourney

## What is BrewJourney?
BrewJourney is a mobile-first logging and AI-powered recommendation application designed for coffee hobbyists of all skill levels. Whether you're a casual sipper or a professional barista, BrewJourney helps you track every bean, grind, and brew method to discover your ultimate cup.

## Project Overview
BrewJourney was built during BeaverHacks 2026 at Oregon State University, specifically targeting the 'Google - Best Use of Gemini' track.

## The Problem: The "Entry Barrier" of Hobbyist Coffee
Getting into hobbyist coffee is rewarding, but the learning curve can be steep. Improving your brew requires tracking variables like grind size, water temperature, timing, and ratios. For those just starting out, this can feel overwhelming; for seasoned hobbyists, keeping track of these details across different beans and methods becomes a repetitive, tiresome chore. This "data fatigue" often leads to inconsistent brews and missed opportunities to learn from what’s actually in the cup.

### Key Features
- **Precise Brew Analytics:** Go beyond simple notes. Track the granular variables that make that perfect cup, including coffee-to-water ratios, grind sizes, roast levels, temperatures, and more. Our structured logging ensures every brew is a step towards success.
- **AI Barista ("Brewy"):** Your own digital barista. Brewy doesn't just chat; it analyzes your historical brew logs to provide evidence-backed adjustments. Whether your extraction is too sour or your body is too thin, Brewy leverages AI to diagnose your technique and suggest calibrated improvements. 
- XX: FIXME

## Tech Stack
- Frontend: React Native, Expo, Tamagui (styling)
- Backend: Node.js, Express.js
- Database: PostgresSQL hosted on Docker
- ORM: Prisma
- AI Integration: Gemini 2.5 Flash

## Future of BrewJourney
- AI-Generated Brew Briefs: Implement a 'My Data' page which synthesizes the user's historical brew logs into concise, actionable reports. Users can select a specific brew method (i.e. French Press, Espresso) or time period (i.e. 1 week, 1 month) to receive AI-generated insights on their average extraction values—allowing them to "re-dial" in a coffee they haven't brewed in months with instant, data-backed precision.
- Flavor Profile Mapping: A dynamic "Spider Graph" (Radar Chart) that visualizes a user's taste preferences over time. As the user logs more brews, the AI maps out whether they prefer an acidic, rich dark roast, or a vibrant, fruity light roast. 
- _X? maybe 2 is enuff?_

## The Team
### Built with ☕ by:
- Duncan Everson - AI-Related Route Handling, Microservice Development, Server Interactions.
- Dylan Knapp - Database Implementation, Server-Side Routing, X. 
- Dylan Keyhantaj - Frontend, UI/UX, Database Design, App Design. 
- Ethan Ossana - Frontend Architecture, Client-Side Routing, Navigation. 
