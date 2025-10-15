# MODELS ACADEMY MANAGEMENT

## Overview

MODELS ACADEMY MANAGEMENT is a professional modeling agency website that showcases fashion models and their portfolios. The platform serves as a digital presence for a prestigious modeling agency, featuring model profiles, agency information, and training programs. The website is designed to attract both potential models and clients looking to work with professional talent in the fashion industry.

## Recent Updates (October 2025)

### Folder Structure
- ✅ All model folders now include three required subdirectories: `portfolio/`, `defile/`, and `shooting/`
- ✅ Empty folders contain `.gitkeep` files to ensure proper version control tracking

### New Models Added
- ✅ **VODOUNON Jédiel** (1.76m) - 36 shooting images
- ✅ **TOSSOU Rafiou Honel** (1.87m) - 6 portfolio images
- ✅ Total models in database: 19

### Model Profile Page Improvements
- ✅ Removed black "← Retour" button from profile pages
- ✅ Implemented gallery tabs system (Portfolio / Fashion Show / Shooting)
- ✅ Tab-based navigation prevents page flickering and provides smooth category switching
- ✅ **All 3 gallery buttons (Portfolio, Fashion Show, Shooting) now always visible**, even when no photos in category
- ✅ Updated Boxicons for characteristics:
  - `bx-ruler` for height
  - `bx-brush` for hair color
  - `bx-show` for eye color
  - `bx-map` for location
  - `bx-time` for experience

### Design & Typography Updates
- ✅ Enhanced font weights: 300 for headings (thin, elegant), 200 for paragraphs (light, readable)
- ✅ Added modern tab styling with rounded borders, hover effects, and active states
- ✅ Improved visual hierarchy and user experience across all pages

### Formation Pages Updates (October 15, 2025)
- ✅ **Header uniformization**: All formation pages now use "MAM" logo matching main site header
- ✅ **Color palette redesign**: Changed from blue/gold to **black and white** color scheme
  - Headings: #000000 (black)
  - Feature icons: solid black background
  - CTA section: solid black background
  - Buttons: white background with black text
- ✅ **Boxicons integration**: Replaced all emojis with professional Boxicons icons
  - Défilé page: `bx-walk`, `bx-face`, `bx-closet`, `bx-spa`
  - Photo page: `bx-camera`, `bx-palette`, `bx-bulb`, `bx-group`
  - Développement page: `bx-happy-heart-eyes`, `bx-microphone`, `bx-network-chart`, `bx-spa`
  - Footer: `bx-envelope`, `bx-phone`, `bx-map`
- ✅ **Desktop header optimization**: Added media query for screens >1200px with improved spacing (gap: 2.5rem)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a traditional multi-page website architecture built with vanilla HTML, CSS, and JavaScript. The structure emphasizes visual presentation and user experience with:

- **Static HTML Pages**: Multi-page structure with dedicated pages for different sections (home page and models showcase)
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox for layouts
- **Component-Based Styling**: Modular CSS architecture with CSS custom properties for theming
- **Interactive Navigation**: Mobile hamburger menu with smooth transitions and scroll effects

### Design System
The website implements a sophisticated design system featuring:

- **Typography**: Poppins font family (weight 200-300) for a thin, elegant, and professional appearance
- **Color Palette**: Elegant color scheme with primary black (#1a1a1a), accent gold (#d4af37), and navy blue (#1e3a8a)
- **Animation Framework**: Fade-in animations and smooth transitions for enhanced user experience
- **Visual Hierarchy**: Strategic use of typography scales and spacing for content organization

### Navigation and User Experience
- **Single Page Application Feel**: Smooth scrolling between sections on the homepage
- **Mobile-Responsive Navigation**: Collapsible hamburger menu for mobile devices
- **Dynamic Navbar**: Background opacity changes on scroll for better visual appeal
- **Cross-Page Navigation**: Seamless linking between homepage sections and dedicated model showcase page

### Content Structure
- **Hero Section**: Prominent branding and call-to-action placement
- **Model Gallery**: Grid-based layout for showcasing model portfolios with organized image folders (portfolio/shooting/defile)
- **Model Profile Pages**: Dynamic profile pages with complete galleries loaded from JSON data
- **Progressive Enhancement**: JavaScript-enhanced interactions with graceful degradation
- **Optimized Performance**: Removed embedded data duplications (~500 lines), improved page load times

## External Dependencies

### Font Services
- **Google Fonts**: Poppins font family (weight 200-300) for elegant, thin typography and excellent readability

### Media Assets
- **Image Dependencies**: Local image storage for model portfolios and hero backgrounds
- **Organized Structure**: Images organized in model-specific folders (images/{model-name}/{portfolio|shooting|defile})
- **Static Asset Management**: Direct file serving for images with proper fallback handling
- **Gallery Data**: Model galleries populated from organized folders via JSON configuration (data/models.json)

### Browser APIs
- **DOM Manipulation**: Native JavaScript for interactive features
- **Scroll Events**: Window scroll listeners for navigation effects
- **Intersection Observer**: Potential implementation for scroll-triggered animations

The architecture prioritizes performance, visual appeal, and user experience while maintaining simplicity in implementation. The design focuses on showcasing visual content effectively while providing intuitive navigation and professional presentation suitable for a high-end modeling agency.