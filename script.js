// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initImageLoading();
    
    // Load models data if on models page
    if (window.location.pathname.includes('mannequins.html') || document.getElementById('models-grid')) {
        console.log('Page des mannequins detectee, chargement des donnees...');
        setTimeout(() => {
            loadModelsData();
        }, 100);
    } else if (window.location.pathname.includes('model-profile.html') || document.getElementById('model-profile-content')) {
        console.log('Page de profil de mannequin détectée');
        // Load data first, then create profile page
        setTimeout(() => {
            loadModelsData().then(() => {
                createModelProfilePage();
            });
        }, 100);
    } else {
        console.log('Page des mannequins non detectee');
    }
    
    // Initialize inscription form
    initInscriptionForm();
    
    // Initialize formation carousels
    initFormationCarousels();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Resizable Navbar scroll effect (Aceternity UI inspired)
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollThreshold = 100;
        
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                const gridItems = entry.target.querySelectorAll('.valeur-card, .formation-card, .model-card');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Counter animation for statistics
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation for statistics
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const suffix = element.textContent.replace(/[\d]/g, '');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Image loading optimization
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading placeholder
        img.style.backgroundColor = '#f0f0f0';
        
        // Handle image load
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.backgroundColor = 'transparent';
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image non disponible';
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax effect
window.addEventListener('load', initParallax);

// Model card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #d4af37, #1e3a8a);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();

// Page transition effects
function initPageTransitions() {
    // Fade in page content on load
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // Fade out when navigating to another page
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname) {
                e.preventDefault();
                const href = this.href;
                
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Initialize page transitions
initPageTransitions();

// Function to load models data from JSON
async function loadModelsData() {
    try {
        console.log('Tentative de chargement des données des mannequins...');
        
        // Try to fetch from JSON file first
        let data;
        try {
            const response = await fetch('data/models.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            data = await response.json();
            console.log('✅ Données chargées depuis le fichier JSON');
            
            // Vérifier que Lucia Padanou est présente
            const lucia = data.models.find(m => m.name.includes('Lucia') || m.name.includes('Padanou'));
            if (lucia) {
                console.log('✅ Lucia Padanou trouvée dans le JSON:', lucia.name);
            } else {
                console.log('⚠️ Lucia Padanou non trouvée dans le JSON, utilisation des données intégrées');
                data = getEmbeddedModelsData();
            }
            
        } catch (fetchError) {
            console.error('❌ Impossible de charger le fichier JSON, utilisation des données intégrées...', fetchError);
            // Fallback: use embedded data
            data = getEmbeddedModelsData();
        }
        
        if (!data.models || !Array.isArray(data.models)) {
            throw new Error('Structure de données invalide');
        }
        
        // Store data globally for gallery access
        window.modelsData = data.models;
        
        console.log('Mannequins chargés:', data.models.length);
        console.log('Premier mannequin:', data.models[0]);
        console.log('Structure des données:', JSON.stringify(data.models[0], null, 2));
        
        // Vérifier que Lucia est bien en première position
        const luciaIndex = data.models.findIndex(m => m.name.includes('Lucia') || m.name.includes('Padanou'));
        if (luciaIndex > 0) {
            console.log('🔄 Réorganisation: Lucia Padanou placée en première position');
            const lucia = data.models.splice(luciaIndex, 1)[0];
            data.models.unshift(lucia);
        }
        
        renderModels(data.models);
    } catch (error) {
        console.error('Erreur détaillée lors du chargement des données des mannequins:', error);
        // Fallback: use embedded data if everything else fails
        try {
            console.log('Utilisation des données intégrées comme fallback...');
            const fallbackData = getEmbeddedModelsData();
            window.modelsData = fallbackData.models;
            renderModels(fallbackData.models);
        } catch (fallbackError) {
            console.error('Erreur avec les données intégrées:', fallbackError);
            // Show error message
            const modelsGrid = document.getElementById('models-grid');
            if (modelsGrid) {
                modelsGrid.innerHTML = `
                    <div class="error-message">
                        <h3>Erreur lors du chargement des mannequins</h3>
                        <p>Détails: ${error.message}</p>
                        <p>Veuillez réessayer plus tard ou contacter l'administrateur.</p>
                    </div>
                `;
            }
        }
    }
}

// Embedded models data as fallback
function getEmbeddedModelsData() {
    return {
        "models": [
            {
                "id": 1,
                "name": "Lucia Padanou",
                "gender": "Femme",
                "specialty": "Fashion & Haute Couture",
                "height": "1.80m",
                "bust": "85cm",
                "waist": "60cm",
                "hips": "88cm",
                "shoeSize": "38 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "3 ans",
                "languages": ["Francais", "Anglais"],
                "image": "images/gallery/luciapola.jpg",
                "description": "Mannequin talentueuse de Cotonou, spécialisée dans la haute couture avec une élégance naturelle et une présence scénique remarquable",
                "gallery": [
                    "images/gallery/lucia.jpg",
                    "images/gallery/lucia2.jpg",
                    "images/gallery/lucia3.jpg",
                    "images/gallery/lucia4.jpg",
                    "images/gallery/lucua1.jpg",
                    "images/gallery/lucia7.jpg",
                    "images/gallery/lucia8.jpg",
                    "images/gallery/lucia9.jpg",
                    "images/gallery/lucia10.jpg",
                    "images/gallery/lucia11.jpg"
                ]
            },
            {
                "id": 2,
                "name": "AZONWANOU Rita",
                "gender": "Femme",
                "specialty": "Fashion & Haute Couture",
                "height": "1.80m",
                "bust": "82cm",
                "waist": "62cm",
                "hips": "96cm",
                "shoeSize": "41 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "2 ans",
                "languages": ["Francais"],
                "image": "images/gallery/rita.jpg",
                "description": "Specialisee dans la haute couture  avec une elegance naturelle",
                "gallery": [
                    "images/gallery/rita2.jpg",
                    "images/gallery/rita (2).jpg",
                    "images/gallery/rita3.jpg",
                    "images/gallery/rita4.jpg",
                    "images/gallery/rita5.jpg",
                    "images/gallery/rita6.jpg",
                    "images/gallery/rita7.jpg",
                    "images/gallery/rita8.jpg",
                    "images/gallery/rita9.jpg",
                    "images/gallery/rita10.jpg",
                    "images/gallery/rita12.jpg",
                    "images/gallery/rita17.jpg",
                  
                ]
            },
            {
                "id": 3,
                "name": "TOUNDO Olerie",
                "gender": "Femme",
                "specialty": "Fashion & Haute Couture",
                "height": "1.78m",
                "bust": "84cm",
                "waist": "69cm",
                "hips": "102cm",
                "shoeSize": "42 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": " 3ans",
                "languages": ["Francais"],
                "image": "images/gallery/olerie1.jpg",
                "description": "Experte en beaute et mode commerciale, visage photogenique",
                "gallery": [
                    "images/gallery/olerie.jpg",
                    "images/gallery/olerie2.jpg",
                    "images/gallery/olerie3.jpg",
                   
                ]
            },
            {
                "id": 4,
                "name": "EDJO Aurelle",
                "gender": "Femme",
                "specialty": "Runway & Editorial",
                "height": "1.75m",
                "bust": "36cm",
                "waist": "28cm",
                "hips": "100cm",
                "shoeSize": "41 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "2 ans",
                "languages": [ "Francais"],
                "image": "images/gallery/shoot2.jpg",
                "description": "Star des podiums internationaux avec une presence scenique exceptionnelle",
                "gallery": [
                    "images/gallery/amara-1.jpg",
                    "images/gallery/amara-2.jpg",
                    "images/gallery/amara-3.jpg"
                ]
            },
            {
                "id": 5,
                "name": "YEHOUN Barnard",
                "gender": "Homme",
                "specialty": "Men's Fashion & Luxury",
                "height": "1.87m",
                "chest": "98cm",
                "waist": "80cm",
                "shoeSize": "45 EU",
                "hairColor": "Chataign",
                "eyeColor": "Bleu",
                "city": "Cotonou",
                "experience": "7 ans",
                "languages": [ "Francais"],
                "image": "images/gallery/shoot7.jpg",
                "description": "Reference en mode masculine de luxe, charisme et sophistication",
                "gallery": [
                    "images/gallery/barnard.jpg",
                    "images/gallery/barnard1.jpg",
                    "images/gallery/barnard2.jpg",
                    "images/gallery/barnard3.jpg",
                    "images/gallery/barnard4.jpg",
                    "images/gallery/barnard5.jpg",
                    "images/gallery/barnard6.jpg",
                ]
            },
            {
                "id": 6,
                "name": "AGBEWANOU Méyèvi Prisca",
                "gender": "Femme",
                "specialty": "Beauty & Cosmetics",
                "height": "1.75m",
                "bust": "80cm",
                "waist": "78cm",
                "hips": "90cm",
                "shoeSize": "39 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "2 ans",
                "languages": [ "Francais"],
                "image": "images/gallery/shoot5.jpg",
                "description": "Ambassadrice beaute internationale, specialiste des campagnes cosmetiques",
                "gallery": [
                    "images/gallery/maya-1.jpg",
                    "images/gallery/maya-2.jpg",
                    "images/gallery/maya-3.jpg"
                ]
            },
            {
                "id": 7,
                "name": "TRAORE Khady",
                "gender": "Femme",
                "specialty": "High Fashion & Couture",
                "height": "1.79m",
                "bust": "85cm",
                "waist": "61cm",
                "hips": "89cm",
                "shoeSize": "38 EU",
                "hairColor": "Blond",
                "eyeColor": "Bleu",
                "city": "London",
                "experience": "9 ans",
                "languages": ["Francais"],
                "image": "images/gallery/creativie.jpg",
                "description": "Elegance britannique, specialiste de la haute couture europeenne",
                "gallery": [
                    "images/gallery/emma-1.jpg",
                    "images/gallery/emma-2.jpg",
                    "images/gallery/emma-3.jpg"
                ]
            },
            {
                "id": 8,
                "name": "AMAH Rodéric",
                "gender": "Homme",
                "specialty": "Luxury & Editorial",
                "height": "1.85m",
                "chest": "100cm",
                "waist": "82cm",
                "shoeSize": "45 EU",
                "hairColor": "Brun",
                "eyeColor": "Vert",
                "city": "Cotonou",
                "experience": "2 ans",
                "languages": ["Francais"],
                "image": "images/gallery/defile5.jpg",
                "description": "Modele de luxe parisien, charisme et elegance francaise",
                "gallery": [
                    "images/gallery/alexandre-1.jpg",
                    "images/gallery/alexandre-2.jpg",
                    "images/gallery/alexandre-3.jpg"
                ]
            },
            {
                "id": 9,
                "name": "HESSOU Cyr-God",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.90m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "45 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 9,
                "name": "FAMIWA Dalil",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.89m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "44 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 10,
                "name": "HOUNDJREBO Rose",
                "gender": "Femme",
                "specialty": "High Fashion & Couture",
                "height": "1.72m",
                "bust": "85cm",
                "waist": "61cm",
                "hips": "89cm",
                "shoeSize": "42 EU",
                "hairColor": "Blond",
                "eyeColor": "Bleu",
                "city": "London",
                "experience": "9 ans",
                "languages": ["Francais"],
                "image": "images/gallery/creativie.jpg",
                "description": "Elegance britannique, specialiste de la haute couture europeenne",
                "gallery": [
                    "images/gallery/emma-1.jpg",
                    "images/gallery/emma-2.jpg",
                    "images/gallery/emma-3.jpg"
                ]
            },
            {
                "id": 11,
                "name": "SAGBO Amen",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.84m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "44 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 12,
                "name": "MIDJNDOU Gildas",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.87m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "44 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 13,
                "name": "HOUNGBEDJI Abou-Bacar",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.86m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "44 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 14,
                "name": "GBEDEGLA Geordys",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.87m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "43 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Cotonou",
                "experience": "1 ans",
                "languages": ["Anglais", "Francais"],
                "image": "images/gallery/shoot11.jpg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            },
            {
                "id": 15,
                "name": "MISSIHOUN Merveille",
                "gender": "Femme",
                "specialty": "High Fashion & Couture",
                "height": "1.71m",
                "bust": "85cm",
                "waist": "61cm",
                "hips": "89cm",
                "shoeSize": "39 EU",
                "hairColor": "Blond",
                "eyeColor": "Bleu",
                "city": "London",
                "experience": "9 ans",
                "languages": ["Francais"],
                "image": "images/gallery/creativie.jpg",
                "description": "Elegance britannique, specialiste de la haute couture europeenne",
                "gallery": [
                    "images/gallery/emma-1.jpg",
                    "images/gallery/emma-2.jpg",
                    "images/gallery/emma-3.jpg"
                ]
            },
            {
                "id": 16,
                "name": "DATO Marie-Michelle",
                "gender": "Femme",
                "specialty": "High Fashion & Couture",
                "height": "1.75m",
                "bust": "85cm",
                "waist": "61cm",
                "hips": "89cm",
                "shoeSize": "39 EU",
                "hairColor": "Blond",
                "eyeColor": "Bleu",
                "city": "London",
                "experience": "9 ans",
                "languages": ["Francais"],
                "image": "images/gallery/creativie.jpg",
                "description": "Elegance britannique, specialiste de la haute couture europeenne",
                "gallery": [
                    "images/gallery/emma-1.jpg",
                    "images/gallery/emma-2.jpg",
                    "images/gallery/emma-3.jpg"
                ]
            },
        ]
    };
}

// Function to render models from JSON data
function renderModels(models) {
    console.log('renderModels appelée avec', models.length, 'mannequins');
    const modelsGrid = document.getElementById('models-grid');
    if (!modelsGrid) {
        console.error('models-grid non trouvé');
        return;
    }
    
    modelsGrid.innerHTML = '';
    
    models.forEach((model, index) => {
        console.log(`Rendu mannequin ${index + 1}:`, model.name, 'ID:', model.id);
        const modelCard = document.createElement('div');
        modelCard.className = 'model-card fade-in';
        
        // Determine measurements based on gender
        const measurements = model.gender === 'Femme' 
            ? `<div class="measurement">
                 <span class="label">Buste:</span>
                 <span class="value">${model.bust}</span>
               </div>
               <div class="measurement">
                 <span class="label">Taille:</span>
                 <span class="value">${model.waist}</span>
               </div>
               <div class="measurement">
                 <span class="label">Hanche:</span>
                 <span class="value">${model.hips}</span>
               </div>`
            : `<div class="measurement">
                 <span class="label">Poitrine:</span>
                 <span class="value">${model.chest}</span>
               </div>
               <div class="measurement">
                 <span class="label">Taille:</span>
                 <span class="value">${model.waist}</span>
               </div>`;
        
        modelCard.innerHTML = `
            <div class="model-image">
                <img src="${model.image}" alt="${model.name} - Mannequin" loading="lazy" onerror="this.src='images/model-1.svg'" onload="console.log('Image loaded:', this.src)">
                <div class="model-overlay">
                    <div class="model-info">
                        <h3>${model.name}</h3>
                        <p class="model-specialty">${model.specialty}</p>
                        <div class="model-gender">${model.gender}</div>
                    </div>
                </div>
            </div>
            <div class="model-details">
                <div class="model-basic-info">
                    <div class="model-name">${model.name}</div>
                    <div class="model-specialty">${model.specialty}</div>
                    <div class="model-location">📍 ${model.city}</div>
                </div>
                
                <div class="model-measurements" id="measurements-${model.id}">
                    <div class="measurement">
                        <span class="label">Taille:</span>
                        <span class="value">${model.height}</span>
                    </div>
                    ${measurements}
                    <div class="measurement">
                        <span class="label">Chaussure:</span>
                        <span class="value">${model.shoeSize}</span>
                    </div>
                </div>
                
                <div class="model-characteristics">
                    <div class="characteristic">
                        <span class="label">Cheveux:</span>
                        <span class="value">${model.hairColor}</span>
                    </div>
                    <div class="characteristic">
                        <span class="label">Yeux:</span>
                        <span class="value">${model.eyeColor}</span>
                    </div>
                    <div class="characteristic">
                        <span class="label">Expérience:</span>
                        <span class="value">${model.experience}</span>
                    </div>
                </div>
                
                <div class="model-languages">
                    <span class="label">Langues:</span>
                    <div class="languages-list">
                        ${model.languages.map(lang => `<span class="language">${lang}</span>`).join('')}
                    </div>
                </div>
                
                <div class="model-description">
                    ${model.description}
                </div>
                
                <div class="model-buttons">
                    <button class="btn btn-mensurations" onclick="toggleMeasurements(${model.id})">
                        📏 MENSURATIONS
                    </button>
                    <button class="btn btn-savoir-plus" onclick="navigateToModelPage(${model.id})">
                        👁️ EN SAVOIR PLUS
                    </button>
                </div>
            </div>
        `;
        
        modelsGrid.appendChild(modelCard);
    });
    
    // Re-initialize animations for new elements
    initScrollAnimations();
}

// Function to open model gallery
function openGallery(modelId) {
    // Find the model data
    const model = window.modelsData.find(m => m.id === modelId);
    if (!model) return;
    
    // Create gallery modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-overlay">
            <div class="gallery-container">
                <div class="gallery-header">
                    <h2>${model.name} - Galerie</h2>
                    <button class="close-gallery" onclick="closeGallery()">×</button>
                </div>
                <div class="gallery-grid">
                    ${model.gallery.slice(0, 18).map((image, index) => `
                        <div class="gallery-item" onclick="openFullscreenImage('${image}', '${model.name} - Photo ${index + 1}')">
                            <img src="${image}" alt="${model.name} - Photo ${index + 1}" loading="lazy" onerror="this.style.display='none'">
                        </div>
                    `).join('')}
                </div>
                <div class="gallery-info">
                    <p><strong>${model.name}</strong> - ${model.specialty}</p>
                    <p>${model.description}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGallery();
        }
    });
}

// Function to close gallery
function closeGallery() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Function to open fullscreen image
function openFullscreenImage(imageSrc, imageAlt) {
    const fullscreenModal = document.createElement('div');
    fullscreenModal.className = 'fullscreen-modal';
    fullscreenModal.innerHTML = `
        <div class="fullscreen-overlay">
            <div class="fullscreen-container">
                <button class="close-fullscreen" onclick="closeFullscreenImage()">×</button>
                <img src="${imageSrc}" alt="${imageAlt}" class="fullscreen-image">
                <div class="fullscreen-caption">${imageAlt}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(fullscreenModal);
    document.body.style.overflow = 'hidden';
    
    // Add click outside to close
    fullscreenModal.addEventListener('click', function(e) {
        if (e.target === fullscreenModal) {
            closeFullscreenImage();
        }
    });
    
    // Add keyboard support (ESC key)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreenImage();
        }
    });
}

// Function to close fullscreen image
function closeFullscreenImage() {
    const fullscreenModal = document.querySelector('.fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Form handling (for future contact forms)
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé !';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);
        });
    });
}

// Multi-Step Form handling
function initMultiStepForm() {
    const form = document.getElementById('multiStepForm');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    
    let currentStep = 1;
    const totalSteps = 4;
    
    if (!form) return;
    
    // Initialize file upload handlers
    initFileUploads();
    
    // Next button handler
    nextBtn.addEventListener('click', function() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateFormDisplay();
            }
        }
    });
    
    // Previous button handler
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateFormDisplay();
        }
    });
    
    // Submit button handler
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            submitForm();
        }
    });
    
    // Form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateCurrentStep()) {
            submitForm();
        }
    });
    
    function updateFormDisplay() {
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update form steps
        formSteps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        } else if (currentStep === totalSteps) {
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'inline-block';
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }
    
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
                field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                
                // Show error message
                showFieldError(field, 'Ce champ est obligatoire');
            } else {
                field.style.borderColor = '#e9ecef';
                field.style.boxShadow = 'none';
                clearFieldError(field);
            }
        });
        
        // Additional validation for specific steps
        if (currentStep === 1) {
            // Age validation
            const birthDate = document.getElementById('birthDate');
            if (birthDate.value) {
                const age = calculateAge(birthDate.value);
                if (age < 16 || age > 25) {
                    isValid = false;
                    showFieldError(birthDate, 'L\'âge doit être entre 16 et 25 ans');
                }
            }
        }
        
        if (!isValid) {
            alert('Veuillez corriger les erreurs avant de continuer.');
        }
        
        return isValid;
    }
    
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function submitForm() {
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Add hidden fields for better email formatting
        const formData = new FormData(form);
        
        // Add a subject field for Formspree
        const subjectField = document.createElement('input');
        subjectField.type = 'hidden';
        subjectField.name = '_subject';
        subjectField.value = `Nouvelle candidature - ${formData.get('firstName')} ${formData.get('lastName')}`;
        form.appendChild(subjectField);
        
        // Add recipient email
        const recipientField = document.createElement('input');
        recipientField.type = 'hidden';
        recipientField.name = '_replyto';
        recipientField.value = formData.get('email');
        form.appendChild(recipientField);
        
        // Submit the form to Formspree
        form.submit();
        
        // Show success message (Formspree will redirect to a success page)
        submitBtn.textContent = 'Candidature envoyée !';
        submitBtn.style.background = '#28a745';
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <h3>🎉 Candidature envoyée avec succès !</h3>
                <p>Nous avons bien reçu votre candidature. Notre équipe vous contactera dans les plus brefs délais.</p>
            </div>
        `;
        
        form.parentNode.insertBefore(successMessage, form);
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
            successMessage.remove();
            // Reset to first step
            currentStep = 1;
            updateFormDisplay();
        }, 3000);
    }
}

// File upload handling
function initFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Aucun fichier sélectionné';
            const label = this.parentNode.querySelector('.file-name');
            if (label) {
                label.textContent = fileName;
            }
        });
    });
}

// Inscription form handling (legacy - keeping for compatibility)
function initInscriptionForm() {
    // Initialize multi-step form instead
    initMultiStepForm();
}

// Initialize form handling
initFormHandling();

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Formation carousel functionality
function initFormationCarousels() {
    const carousels = document.querySelectorAll('.formation-carousel');

    // Map dataset keys to filename bases with actual existing images
    const formationImages = {
        defile: [
            'defile1.jpg', 'defile2.jpg', 'defile4.jpg', 'defile5.jpg', 'defile6.jpg', 
            'defile7.jpg', 'defile8.jpg', 'defile9.jpg', 'defile10.jpg', 'defile11.jpg', 
            'defile13.jpg', 'defile15.jpg', 'defile17.jpg', 'defile18.jpg', 'defile19.jpg', 
            'defile20.jpg', 'defile21.jpg', 'defile22.jpg', 'defile23.jpg', 'defile24.jpg'
        ],
        photo: [
            'shoot.jpg', 'shoot2.jpg', 'shoot3.jpg', 'shoot4.jpg', 'shoot5.jpg', 
            'shoot6.jpg', 'shoot7.jpg', 'shoot8.jpg', 'shoot9.jpg', 'shoot10.jpg', 
            'shoot11.jpg', 'shoot12.jpg', 'shoot13.jpg', 'shoot14.jpg', 'shoot15.jpg', 
            'shoot16.jpg', 'shoot17.jpg', 'shoot18.jpg', 'shoot19.jpg', 'shoot20.jpg', 'shoot21.jpg'
        ],
        developpement: [
            'about.jpg', 'creativie.jpg', 'diversité.jpg', 'profe.jpg', 'heroback.jpg', 
            'herobackee.jpg', 'luciapola.jpg', 'danielle.jpg', 'rita.jpg'
        ]
    };

    carousels.forEach(carousel => {
        const key = carousel.dataset.formation;
        const images = formationImages[key] || [];
        
        if (images.length === 0) return;

        // Clear existing images
        carousel.innerHTML = '';

        // Add only existing images
        images.forEach((imageName, index) => {
            const img = document.createElement('img');
            img.src = `images/gallery/${imageName}`;
            img.alt = `Formation ${key || ''} - ${index + 1}`;
            img.className = 'carousel-image';
            img.loading = 'lazy';
            
            // Set first image as active
            if (index === 0) {
                img.classList.add('active');
            }
            
            // Handle image errors gracefully
            img.onerror = function() {
                console.warn(`Image non trouvée: ${imageName}`);
                img.style.display = 'none';
            };
            
            carousel.appendChild(img);
        });

        // Start carousel if we have multiple images
        if (images.length > 1) {
            let currentIndex = 0;
            
            function nextImage() {
                const allImages = carousel.querySelectorAll('.carousel-image');
                if (allImages.length <= 1) return;
                
                allImages[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % allImages.length;
                allImages[currentIndex].classList.add('active');
            }
            
            setInterval(nextImage, 5000);
        }
    });
}



// Formation carousels are initialized on DOMContentLoaded

// Function to toggle measurements display
function toggleMeasurements(modelId) {
    const measurementsElement = document.getElementById(`measurements-${modelId}`);
    if (measurementsElement) {
        measurementsElement.classList.toggle('show');
    }
}

// Function to navigate to individual model page
function navigateToModelPage(modelId) {
    // Store the model ID in sessionStorage for the individual page
    sessionStorage.setItem('selectedModelId', modelId);
    
    // Navigate to the individual model page
    window.location.href = `model-profile.html?id=${modelId}`;
}

// Function to create individual model page
function createModelProfilePage() {
    // Get model ID from URL parameters or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = parseInt(urlParams.get('id')) || parseInt(sessionStorage.getItem('selectedModelId'));
    
    if (!modelId || !window.modelsData) {
        console.error('Model ID not found or data not loaded');
        return;
    }
    
    const model = window.modelsData.find(m => m.id === modelId);
    if (!model) {
        console.error('Model not found');
        return;
    }
    
    // Update page title
    document.title = `${model.name} - MODELS ACADEMY MANAGEMENT`;
    
    // Handle both old (array) and new (categorized) gallery formats
    let shootingImages, fashionShowImages, portfolioImages;
    
    if (model.gallery && typeof model.gallery === 'object' && !Array.isArray(model.gallery)) {
        // New categorized format
        shootingImages = model.gallery.shooting || [];
        fashionShowImages = model.gallery.fashionShow || [];
        portfolioImages = model.gallery.portfolio || [];
    } else {
        // Fallback: old array format - distribute evenly
        const gallery = model.gallery || [];
        shootingImages = gallery.slice(0, Math.ceil(gallery.length / 3));
        fashionShowImages = gallery.slice(Math.ceil(gallery.length / 3), Math.ceil(2 * gallery.length / 3));
        portfolioImages = gallery.slice(Math.ceil(2 * gallery.length / 3));
    }
    
    // Create the page content
    const profileContainer = document.getElementById('model-profile-content');
    if (profileContainer) {
        profileContainer.innerHTML = `
            <div class="model-profile-header">
                <div class="model-profile-image">
                    <img src="${model.image}" alt="${model.name}" />
                </div>
                <div class="model-profile-info">
                    <h1>${model.name}</h1>
                    <div class="model-profile-specialty">${model.specialty}</div>
                    <div class="model-profile-location">📍 ${model.city}</div>
                    <div class="model-profile-experience">✨ ${model.experience} d'expérience</div>
                    <div class="model-profile-description">${model.description}</div>
                </div>
            </div>
            
            <div class="model-profile-sections">
                <div class="section-tabs">
                    <button class="tab-btn active" onclick="showSection('shooting')">SHOOTING</button>
                    <button class="tab-btn" onclick="showSection('fashion-show')">FASHION SHOW</button>
                    <button class="tab-btn" onclick="showSection('portfolio')">PORTFOLIO</button>
                </div>
                
                <div class="section-content">
                    <div id="shooting-section" class="section active">
                        <h2>📸 Photos de Shooting</h2>
                        <div class="gallery-grid">
                            ${shootingImages.map((image, index) => `
                                <div class="gallery-item" onclick="openFullscreenImage('${image}', '${model.name} - Shooting ${index + 1}')">
                                    <img src="${image}" alt="${model.name} - Shooting ${index + 1}" loading="lazy" onerror="this.style.display='none'">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div id="fashion-show-section" class="section">
                        <h2>👗 Photos de Défilé</h2>
                        <div class="gallery-grid">
                            ${fashionShowImages.map((image, index) => `
                                <div class="gallery-item" onclick="openFullscreenImage('${image}', '${model.name} - Défilé ${index + 1}')">
                                    <img src="${image}" alt="${model.name} - Défilé ${index + 1}" loading="lazy" onerror="this.style.display='none'">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div id="portfolio-section" class="section">
                        <h2>💼 Photos Professionnelles</h2>
                        <div class="gallery-grid">
                            ${portfolioImages.map((image, index) => `
                                <div class="gallery-item" onclick="openFullscreenImage('${image}', '${model.name} - Portfolio ${index + 1}')">
                                    <img src="${image}" alt="${model.name} - Portfolio ${index + 1}" loading="lazy" onerror="this.style.display='none'">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Function to show specific section in model profile
function showSection(sectionName) {
    // Remove active class from all tabs and sections
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    
    // Add active class to clicked tab and corresponding section
    event.target.classList.add('active');
    document.getElementById(`${sectionName}-section`).classList.add('active');
}

// Helper function to get total gallery count for both old and new formats
function getGalleryCount(model) {
    if (!model.gallery) return 0;
    
    if (typeof model.gallery === 'object' && !Array.isArray(model.gallery)) {
        // New categorized format
        const shooting = (model.gallery.shooting || []).length;
        const fashionShow = (model.gallery.fashionShow || []).length;
        const portfolio = (model.gallery.portfolio || []).length;
        return Math.min(shooting + fashionShow + portfolio, 18);
    } else {
        // Old array format
        return Math.min((model.gallery || []).length, 18);
    }
}
