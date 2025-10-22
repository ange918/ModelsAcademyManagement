# MODELS ACADEMY MANAGEMENT

## Overview

MODELS ACADEMY MANAGEMENT is a professional modeling agency website that showcases fashion models and their portfolios. The platform serves as a digital presence for a prestigious modeling agency, featuring model profiles, agency information, and training programs. The website is designed to attract both potential models and clients looking to work with professional talent in the fashion industry.

## Recent Updates

### ✍️ Système de Blog Complet (October 22, 2025 - Latest)
- ✅ **Nouveau Système de Blog Dynamique:**
  - Créé `data/articles.js` avec 15 articles complets et professionnels
  - Système de génération dynamique des cards d'articles depuis JavaScript
  - Modal élégante pour lire le contenu complet de chaque article
  - Design cohérent avec le reste du site (couleurs, polices, style)
  - Responsive sur mobile et desktop

- ✅ **15 Articles de Blog Professionnels:**
  1. Comment devenir mannequin professionnel (France, USA, Espagne, Afrique)
  2. Quelle formation suivre pour percer dans le mannequinat international
  3. Les étapes clés pour construire une carrière de mannequin à succès
  4. Les secrets des mannequins à succès : discipline, confiance et image
  5. Comment MODELS ACADEMY MANAGEMENT prépare les mannequins aux standards mondiaux
  6. Comment réussir un casting de mannequin : astuces et erreurs à éviter
  7. Comment créer un book de mannequin parfait sans se ruiner
  8. Les postures et attitudes à maîtriser pour séduire les recruteurs
  9. Comment se démarquer sur les réseaux sociaux
  10. Comment transformer un shooting photo en opportunité de carrière
  11. Alimentation et bien-être : comment garder la forme sans se priver
  12. Les meilleures routines beauté des mannequins professionnels
  13. Les exercices physiques pour améliorer sa démarche et sa prestance
  14. Comment gérer le stress avant un défilé ou un casting
  15. Les différences entre mannequin photo, défilé, publicité et e-commerce

- ✅ **Fonctionnalités du Blog:**
  - Cards avec image, catégorie, date, titre, et extrait
  - Clic sur une card ouvre le contenu complet dans une modal
  - Modal avec header coloré, fermeture au clic extérieur ou touche Escape
  - Contenu formaté avec titres, listes, citations et icônes
  - Navigation fluide sans rechargement de page
  - Catégories: Carrière, Formation, Conseils, Technique, Marketing, Santé, Beauté, Mental, Opportunités

- ✅ **Structure et Maintenance:**
  - Articles stockés dans un tableau d'objets facilement modifiable
  - Chaque article contient: id, title, date, category, image, excerpt, content
  - Contenu HTML formaté pour un affichage professionnel
  - Facilité d'ajout ou modification d'articles dans le futur

### 📦 Correction Photos Pascal (October 22, 2025)
- ✅ **Problème Résolu:**
  - Corrigé le nom du dossier portfolio de Pascal (était "porfofio" au lieu de "portfolio")
  - Déplacé toutes les photos vers le bon dossier
  - Ajouté tous les chemins d'images dans data/models-data.js
  - Pascal a maintenant: 21 photos shooting, 4 photos défilé, 6 photos portfolio

### 📦 Architecture Simplification (October 22, 2025)
- ✅ **Simplified Server Architecture:**
  - Replaced Flask server with lightweight `simple_server.py` (pure Python HTTP server)
  - Removed API dependency - all data now loads directly from `data/models.json`
  - Added cache-busting headers to prevent iframe caching issues
  - Implemented query parameter support for model profile pages
  - Port reuse enabled to prevent binding conflicts

- ✅ **Data Loading Optimization:**
  - Removed `/api/models` endpoint - no longer needed
  - All 24 mannequins load directly from JSON file
  - Faster page loads without API overhead
  - Simplified codebase maintenance

- ✅ **Gallery Display Verification:**
  - Confirmed all gallery categories (Portfolio, Fashion Show, Shooting) display correctly
  - Models show only their available photo categories
  - Empty categories display user-friendly messages
  - Tab system works smoothly across all model profiles

## Previous Updates (October 20, 2025)

### 🎯 Custom Model Ordering & Image Optimization (October 20, 2025 - Latest)
- ✅ **Fixed Display Order:**
  - Implemented custom ordering system for all 23 models
  - Models now display in specific order: Lucia → Rita → Olérie → Edjo... → Meshac
  - Order maintained across all pages (mannequins.html, model-profile.html, galleries)
  
- ✅ **Smart Image Fallback:**
  - Automatic fallback: if portfolio folder is empty, uses shooting or defile images
  - Example: Joana has no portfolio images → automatically uses shooting images
  - Priority order: portfolio → shooting → defile
  
- ✅ **Model Type Classification:**
  - Default type: "Fashion & Haute Couture" for all models
  - Special exceptions: Joana and Jédiel classified as "Model Photo"
  - Type displayed on each model card and profile page
  
- ✅ **Face-Focused Image Cropping:**
  - All images now use `object-fit: cover` with `object-position: center top`
  - Ensures faces are always visible and properly framed
  - Applied to: model cards, profile images, gallery images
  - Responsive on both desktop and mobile

### 🚀 Automatic Model Detection System (October 20, 2025)
- ✅ **Flask API Backend:**
  - Automatic scanning of `/images/` directory to detect all models
  - Real-time detection of 23+ models without manual configuration
  - REST API endpoint: `/api/models` returns complete model data with images
  - Auto-creation of missing subdirectories (portfolio, shooting, defile) with `.gitkeep` files
  
- ✅ **Intelligent Data Fusion:**
  - JavaScript merges API-detected folders with existing JSON metadata
  - Models with detailed info in `data/models.json` retain all their data
  - New models automatically get basic profiles with detected images
  - Gallery images loaded dynamically from actual folder contents
  
- ✅ **Zero-Configuration Workflow:**
  - Add new model folder to `/images/{model-name}/` → automatically appears on site
  - Add images to portfolio/shooting/defile folders → instantly visible
  - No need to edit JSON files or update code manually
  - System handles missing images gracefully with fallback messages

### Latest Enhancements (October 20, 2025 - Afternoon)
- ✅ **Dropdown Navigation Menu:**
  - Added "Détails" dropdown menu in navigation across all pages
  - Dropdown contains links to "À Propos" (about.html) and "Blog" (blog.html)
  - Desktop: Hover effect with smooth animation and chevron rotation
  - Mobile: Responsive styles with tap-friendly layout
  - Implemented on all pages: index, mannequins, model-profile, blog, about, dashboard, and all 3 formation pages

- ✅ **Profile Images Migration:**
  - All model profile images now use their dedicated folders instead of shared gallery
  - Example: Rita's image changed from `images/gallery/rita.jpg` to `images/rita/portfolio/WhatsApp Image 2025-10-16 at 15.36.19 (1).jpeg`
  - Mathieu's image uses `images/mathieu/portfolio/IMG-20240802-WA0021.jpg`
  - New models (Joana, Paula, Pascal, Danielle) configured with their folder paths
  - Fallback to default logo handled via `onerror` attribute in case images are missing

### Major Website Expansion
- ✅ **New Pages Created:**
  - `blog.html` - Blog avec 7 articles de démonstration
  - `about.html` - Page À Propos avec histoire de l'agence et présentation du staff
  - `login.html` - Page de connexion administrateur
  - `dashboard.html` - Tableau de bord administrateur avec gestion du mot de passe

- ✅ **5 Nouveaux Mannequins Ajoutés** (Total: 24 mannequins)
  - **AKPO Mathieu** (1.88m) - ID 20
  - **AGBOGNON Joana** (1.60m) - ID 21
  - **SENOU Paula** (1.70m) - ID 22
  - **ADANTOLANKPE Pascal** (1.89m) - ID 23
  - **GBAGUIDI Danielle** (1.76m) - ID 24

- ✅ **Améliorations Navigation:**
  - Logo du header maintenant cliquable sur toutes les pages (redirige vers index.html)
  - Liens vers blog et about ajoutés dans les menus de navigation

- ✅ **Pages de Formation Améliorées:**
  - Espacement ajouté entre le bouton "Retour à l'accueil" et le header (top: 90px au lieu de 20px)
  - Images de fond différentes pour chaque page de formation confirmées:
    - defile-runway.html: `defile.jpg`
    - photo-shooting.html: `shoot.jpg`
    - developpement-personnel.html: `about.jpg`

- ✅ **Système d'Administration:**
  - Authentification avec identifiants: ROYALFASHIONEVENT / 91RERDMODEL
  - Fonction de changement de mot de passe dans le dashboard
  - Utilisation de sessionStorage pour la session et localStorage pour le mot de passe (environnement de test)

### Folder Structure
- ✅ All model folders now include three required subdirectories: `portfolio/`, `defile/`, and `shooting/`
- ✅ Empty folders contain `.gitkeep` files to ensure proper version control tracking

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
- **Blog System**: 7 demo articles with images, dates, excerpts, and "read more" links
- **About Page**: Complete agency history, mission, values, and team presentation
- **Admin Dashboard**: Secure admin area with statistics, password management, and quick actions
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
- **Storage APIs**: 
  - sessionStorage for admin authentication state
  - localStorage for password storage (test environment only - NOT for production)

The architecture prioritizes performance, visual appeal, and user experience while maintaining simplicity in implementation. The design focuses on showcasing visual content effectively while providing intuitive navigation and professional presentation suitable for a high-end modeling agency.