# BrewJourney

## What is BrewJourney?
BrewJourney is a mobile-first logging and AI-powered recommendation application designed for coffee hobbyists of all skill levels. Whether you're a casual sipper or a professional barista, BrewJourney helps you track every bean, grind, and brew method to discover your ultimate cup.

## Project Overview
BrewJourney was built during BeaverHacks 2026 at Oregon State University, specifically targeting the 'Google - Best Use of Gemini' track.

## The Problem: The "Entry Barrier" of Hobbyist Coffee
Getting into hobbyist coffee is rewarding, but the learning curve can be steep. Improving your brew requires tracking variables like grind size, water temperature, timing, and weight ratios. For those just starting out, this can feel overwhelming; for seasoned hobbyists, keeping track of these details across different beans and methods becomes a repetitive, tiresome chore. This "data fatigue" often leads to inconsistent brews and missed opportunities to learn from what’s actually in the cup.

## Our Solution
BrewJourney aims to bridge the gap between logging data and gaining actual insight. We built a tool that simplifies the workflow of coffee making, allowing the user to focus on the enjoyment of the craft rather than the tedium of the paperwork.
  - **Streamlined Workflow:** A clean, intuitive user interface, designed to capture essential data points quickly, ensuring the logging process never interrupts the ritual of brewing.
  - **Evidence-Backed Insights:** Leveraging Google Gemini, BrewJourney moves beyond static logs. By analyzing your unique brew history, the app provides grounded, data-driven suggestions to help you dial in your next cup with precision.
  - **Long-Term Learning:** Whether you are brewing your first pour-over or your thousandth, our goal is to maximize the learning and enjoyment of the hobby by making your data work for you.

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
