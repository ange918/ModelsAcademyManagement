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

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
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
                    "images/gallery/luciapola.jpg",
                    "images/gallery/shoot.jpg",
                    "images/gallery/shoot2.jpg",
                    "images/gallery/shoot3.jpg"
                ]
            },
            {
                "id": 2,
                "name": "Sophia Laurent",
                "gender": "Femme",
                "specialty": "Fashion & Haute Couture",
                "height": "1.78m",
                "bust": "86cm",
                "waist": "60cm",
                "hips": "88cm",
                "shoeSize": "38 EU",
                "hairColor": "Chataign",
                "eyeColor": "Noisette",
                "city": "Paris",
                "experience": "8 ans",
                "languages": ["Francais", "Anglais", "Italien"],
                "image": "images/model-2.svg",
                "description": "Specialisee dans la haute couture parisienne avec une elegance naturelle",
                "gallery": [
                    "images/gallery/sophia-1.jpg",
                    "images/gallery/sophia-2.jpg",
                    "images/gallery/sophia-3.jpg"
                ]
            },
            {
                "id": 2,
                "name": "Isabella Chen",
                "gender": "Femme",
                "specialty": "Commercial & Beauty",
                "height": "1.75m",
                "bust": "84cm",
                "waist": "58cm",
                "hips": "86cm",
                "shoeSize": "37 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Milan",
                "experience": "6 ans",
                "languages": ["Anglais", "Italien", "Mandarin"],
                "image": "images/model-2.svg",
                "description": "Experte en beaute et mode commerciale, visage photogenique",
                "gallery": [
                    "images/gallery/isabella-1.jpg",
                    "images/gallery/isabella-2.jpg",
                    "images/gallery/isabella-3.jpg"
                ]
            },
            {
                "id": 3,
                "name": "Amara Johnson",
                "gender": "Femme",
                "specialty": "Runway & Editorial",
                "height": "1.80m",
                "bust": "85cm",
                "waist": "59cm",
                "hips": "87cm",
                "shoeSize": "39 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "New York",
                "experience": "10 ans",
                "languages": ["Anglais", "Francais", "Espagnol"],
                "image": "images/model-3.svg",
                "description": "Star des podiums internationaux avec une presence scenique exceptionnelle",
                "gallery": [
                    "images/gallery/amara-1.jpg",
                    "images/gallery/amara-2.jpg",
                    "images/gallery/amara-3.jpg"
                ]
            },
            {
                "id": 4,
                "name": "Luca Rodriguez",
                "gender": "Homme",
                "specialty": "Men's Fashion & Luxury",
                "height": "1.85m",
                "chest": "98cm",
                "waist": "80cm",
                "shoeSize": "42 EU",
                "hairColor": "Chataign",
                "eyeColor": "Bleu",
                "city": "Barcelona",
                "experience": "7 ans",
                "languages": ["Espagnol", "Anglais", "Francais"],
                "image": "images/model-4.svg",
                "description": "Reference en mode masculine de luxe, charisme et sophistication",
                "gallery": [
                    "images/gallery/luca-1.jpg",
                    "images/gallery/luca-2.jpg",
                    "images/gallery/luca-3.jpg"
                ]
            },
            {
                "id": 5,
                "name": "Maya Patel",
                "gender": "Femme",
                "specialty": "Beauty & Cosmetics",
                "height": "1.73m",
                "bust": "82cm",
                "waist": "56cm",
                "hips": "84cm",
                "shoeSize": "36 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Mumbai",
                "experience": "5 ans",
                "languages": ["Hindi", "Anglais", "Francais"],
                "image": "images/model-5.svg",
                "description": "Ambassadrice beaute internationale, specialiste des campagnes cosmetiques",
                "gallery": [
                    "images/gallery/maya-1.jpg",
                    "images/gallery/maya-2.jpg",
                    "images/gallery/maya-3.jpg"
                ]
            },
            {
                "id": 6,
                "name": "Emma Williams",
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
                "languages": ["Anglais", "Francais", "Allemand"],
                "image": "images/model-6.svg",
                "description": "Elegance britannique, specialiste de la haute couture europeenne",
                "gallery": [
                    "images/gallery/emma-1.jpg",
                    "images/gallery/emma-2.jpg",
                    "images/gallery/emma-3.jpg"
                ]
            },
            {
                "id": 7,
                "name": "Alexandre Dubois",
                "gender": "Homme",
                "specialty": "Luxury & Editorial",
                "height": "1.88m",
                "chest": "100cm",
                "waist": "82cm",
                "shoeSize": "43 EU",
                "hairColor": "Brun",
                "eyeColor": "Vert",
                "city": "Paris",
                "experience": "12 ans",
                "languages": ["Francais", "Anglais", "Italien"],
                "image": "images/model-7.svg",
                "description": "Modele de luxe parisien, charisme et elegance francaise",
                "gallery": [
                    "images/gallery/alexandre-1.jpg",
                    "images/gallery/alexandre-2.jpg",
                    "images/gallery/alexandre-3.jpg"
                ]
            },
            {
                "id": 8,
                "name": "Marcus Johnson",
                "gender": "Homme",
                "specialty": "Commercial & Fitness",
                "height": "1.83m",
                "chest": "105cm",
                "waist": "78cm",
                "shoeSize": "44 EU",
                "hairColor": "Noir",
                "eyeColor": "Marron",
                "city": "Los Angeles",
                "experience": "8 ans",
                "languages": ["Anglais", "Espagnol"],
                "image": "images/model-8.svg",
                "description": "Modele fitness et commercial, physique athletique",
                "gallery": [
                    "images/gallery/marcus-1.jpg",
                    "images/gallery/marcus-2.jpg",
                    "images/gallery/marcus-3.jpg"
                ]
            }
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
                
                <div class="model-measurements">
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
                
                <div class="model-cta">
                    <button class="btn btn-secondary btn-gallery" onclick="openGallery(${model.id})">
                        📸 Voir la galerie (${Math.min((model.gallery || []).length, 18)} photos)
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
                        <div class="gallery-item">
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

// Inscription form handling
function initInscriptionForm() {
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                } else {
                    field.style.borderColor = '#e9ecef';
                    field.style.boxShadow = 'none';
                }
            });
            
            if (!isValid) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Candidature envoyée !';
                submitBtn.style.background = '#28a745';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-content">
                        <h3>🎉 Candidature envoyée avec succès !</h3>
                        <p>Nous avons bien reçu votre candidature. Notre équipe vous contactera dans les plus brefs délais.</p>
                    </div>
                `;
                
                this.parentNode.insertBefore(successMessage, this);
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
        
        // Real-time validation
        const inputs = inscriptionForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#dc3545';
                    this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                } else {
                    this.style.borderColor = '#e9ecef';
                    this.style.boxShadow = 'none';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e9ecef';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }
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

    // Map dataset keys to filename bases
    const formationBaseMap = {
        defile: 'defile',
        photo: 'photo',
        developpement: 'dev'
    };

    carousels.forEach(carousel => {
        const key = carousel.dataset.formation;
        const base = formationBaseMap[key] || key || '';
        const maxImages = key === 'photo' ? 21 : 18;

        // Track existing srcs to avoid duplicates
        const existingSrcs = new Set(Array.from(carousel.querySelectorAll('img')).map(img => img.getAttribute('src')));

        // Ensure up to maxImages present, auto-generate missing ones
        for (let i = 1; i <= maxImages; i += 1) {
            const url = `images/gallery/${base}${i}.jpg`;
            if (!existingSrcs.has(url)) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Formation ${key || ''} - ${i}`.trim();
                img.className = 'carousel-image';
                img.loading = 'lazy';
                img.onerror = function() {
                    img.classList.add('hidden');
                };
                carousel.appendChild(img);
            }
        }

        // Normalize active state: pick first visible image
        let allImages = Array.from(carousel.querySelectorAll('.carousel-image'));
        let visibleImages = allImages.filter(img => !img.classList.contains('hidden'));

        // If fewer than maxImages visible images, duplicate existing to reach max
        if (visibleImages.length > 0 && visibleImages.length < maxImages) {
            const needed = maxImages - visibleImages.length;
            for (let i = 0; i < needed; i += 1) {
                const src = visibleImages[i % visibleImages.length].getAttribute('src');
                const dup = document.createElement('img');
                dup.src = src;
                dup.alt = `Formation ${key || ''} - copie ${(i + 1)}`.trim();
                dup.className = 'carousel-image';
                dup.loading = 'lazy';
                carousel.appendChild(dup);
            }
            allImages = Array.from(carousel.querySelectorAll('.carousel-image'));
            visibleImages = allImages.filter(img => !img.classList.contains('hidden'));
        }

        // If no active or active is hidden, set first visible as active
        let active = carousel.querySelector('.carousel-image.active');
        if (!active || active.classList.contains('hidden')) {
            allImages.forEach(img => img.classList.remove('active'));
            if (visibleImages.length > 0) {
                visibleImages[0].classList.add('active');
            }
        }

        let currentIndex = visibleImages.findIndex(img => img.classList.contains('active'));
        if (currentIndex < 0) currentIndex = 0;

        function nextImage() {
            // Refresh visible set in case some failed to load
            visibleImages = allImages.filter(img => !img.classList.contains('hidden'));
            if (visibleImages.length <= 1) return;

            const current = carousel.querySelector('.carousel-image.active');
            if (current) current.classList.remove('active');

            // Advance to next visible image
            currentIndex = (visibleImages.indexOf(current) + 1) % visibleImages.length;
            visibleImages[currentIndex].classList.add('active');
        }

        setInterval(nextImage, 5000);
    });
}

// Formation carousels are initialized on DOMContentLoaded
