# GeekSoft - Project Setup

## Project Overview
GeekSoft is a static website for a Discord bot development company and esports event organization platform.

## Project Structure
- `/` - Main landing page with server status check
- `/acceuil/` - Home page with company information
- `/contact/` - Members page with team cards
- `/devis/` - Quotes/proposals section
- `/ressources/` - Resources section
- `/nsi/` - NSI (Computer Science) Projects showcase
  - `/nsi/phantom-text/` - Phantom-Text project details page

## Recent Changes (Nov 29, 2025)
1. Created NSI Projects section with project showcase pages
2. Added Phantom-Text project page with details and download buttons
3. Updated main index.html with links to NSI section
4. Configured Python static server on port 5000

## Current Setup
- **Frontend**: Static HTML/CSS/JS website
- **Server**: Python HTTP server (`python3 -m http.server 5000 --bind 0.0.0.0`)
- **Port**: 5000 (Replit webview proxy)
- **Language**: French

## NSI Projects Pages
- **Main Projects Page** (`/nsi/`): Shows available NSI projects in card format
  - Phantom-Text project card with description
  - Hover effects showing project link
  
- **Project Detail Pages** (`/nsi/[project]/`): Individual project pages
  - Project description and features
  - Links to GitHub repository
  - Download button for ZIP archive

## Styling Notes
- Uses dark theme with GeekSoft branding colors
- Consistent with existing pages (contact, acceuil)
- Animations and hover effects for interactivity
- Responsive design for mobile devices
- Cyan accent color (#32c1ff) for highlights

## To Add More NSI Projects
1. Create new project directory in `/nsi/[project-name]/`
2. Create `index.html` with project details
3. Copy `GEEKSOFT.png` logo to project directory
4. Update `/nsi/index.html` JavaScript `projets` array with new project details

## Navigation
- Main page → Links to NSI Projects
- NSI Projects page → Individual project details
- Project pages → Back to projects list or home
