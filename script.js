// Global variables
let modelsDataLoaded = false;

// DOM Content Loaded - Single entry point
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initImageLoading();
    
    if (window.location.pathname.includes('mannequins.html') || document.getElementById('models-grid')) {
        if (!modelsDataLoaded) {
            loadModelsData();
        }
    } else if (window.location.pathname.includes('model-profile.html') || document.getElementById('model-profile-content')) {
        loadModelsData().then(() => {
            createModelProfilePage();
        }).catch(error => {
            console.error('Erreur lors du chargement des données:', error);
            showProfileError();
        });
    }
    
    initInscriptionForm();
    initFormationCarousels();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

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
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                
                const gridItems = entry.target.querySelectorAll('.valeur-card, .formation-card, .model-card');
                gridItems.forEach((item, index) => {
                    if (!item.classList.contains('visible')) {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 50);
                    }
                });
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

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
                const offsetTop = targetSection.offsetTop - 80;
                
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
        img.style.backgroundColor = '#f0f0f0';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.backgroundColor = 'transparent';
        });
        
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

window.addEventListener('load', initParallax);

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

initScrollProgress();

// Page transition effects
function initPageTransitions() {
    document.body.style.opacity = '0';
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
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

initPageTransitions();

// Load models data from models.json only
async function loadModelsData() {
    if (modelsDataLoaded && window.modelsData) {
        return window.modelsData;
    }
    
    try {
        // Charger les données depuis models.json
        const jsonResponse = await fetch('data/models.json');
        if (!jsonResponse.ok) {
            throw new Error(`Erreur lors du chargement de models.json: ${jsonResponse.status}`);
        }
        const jsonData = await jsonResponse.json();
        const models = jsonData.models || [];
        
        window.modelsData = models;
        modelsDataLoaded = true;
        
        console.log(`✅ ${models.length} mannequins chargés depuis models.json`);
        console.log('Premiers mannequins:', models.slice(0, 3).map(m => ({ id: m.id, name: m.name })));
        
        const modelsGrid = document.getElementById('models-grid');
        if (modelsGrid) {
            renderModels(models);
        }
        
        return models;
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        const modelsGrid = document.getElementById('models-grid');
        if (modelsGrid) {
            modelsGrid.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 60px 20px; color: #666;">
                    <h3 style="color: #1e3a8a; margin-bottom: 20px;">Erreur lors du chargement des mannequins</h3>
                    <p style="margin-bottom: 10px;">Impossible de charger les données depuis models.json</p>
                    <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #1e3a8a; color: white; border: none; border-radius: 5px; cursor: pointer;">Réessayer</button>
                </div>
            `;
        }
        throw error;
    }
}

// Mettre à jour les données JSON avec les images détectées par l'API
function updateModelsWithApiData(jsonModels, apiModels) {
    // Créer un mapping des mannequins de l'API par nom de dossier
    const apiModelsByFolder = {};
    apiModels.forEach(apiModel => {
        apiModelsByFolder[apiModel.folder_name.toLowerCase()] = apiModel;
    });
    
    // Mettre à jour chaque mannequin JSON avec les images de l'API si disponibles
    return jsonModels.map(model => {
        // Extraire le nom du dossier depuis l'image path
        const folderMatch = model.image.match(/images\/([^\/]+)\//);
        if (!folderMatch) {
            return model;
        }
        
        const folderName = folderMatch[1].toLowerCase();
        const apiModel = apiModelsByFolder[folderName];
        
        if (apiModel) {
            // Mettre à jour les galeries avec les images détectées par l'API
            return {
                ...model,
                gallery: {
                    portfolio: apiModel.portfolio.length > 0 ? apiModel.portfolio : (model.gallery?.portfolio || []),
                    fashionShow: apiModel.defile.length > 0 ? apiModel.defile : (model.gallery?.fashionShow || []),
                    shooting: apiModel.shooting.length > 0 ? apiModel.shooting : (model.gallery?.shooting || [])
                }
            };
        }
        
        return model;
    });
}

// Formater le nom du dossier en nom de mannequin
function formatModelName(folderName) {
    // Convertir le nom du dossier en nom propre
    // Ex: "lucia" -> "Lucia", "jean-paul" -> "Jean-Paul"
    return folderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Render models - Version simplifiée sans bouton mensurations
function renderModels(models) {
    const modelsGrid = document.getElementById('models-grid');
    if (!modelsGrid) {
        return;
    }
    
    modelsGrid.innerHTML = '';
    
    models.forEach((model) => {
        const modelCard = document.createElement('div');
        modelCard.className = 'model-card fade-in visible';
        
        const imageUrl = model.image && model.image.trim() !== '' ? model.image : 'images/gallery/models academy.jpg';
        
        modelCard.innerHTML = `
            <div class="model-image">
                <img src="${imageUrl}" alt="${model.name} - Mannequin" loading="lazy" onerror="this.src='images/gallery/models academy.jpg'">
            </div>
            
            <div class="model-basic-info">
                <h3 class="model-name">${model.name}</h3>
                <p class="model-specialty">${model.specialty}</p>
            </div>
            
            <div class="model-actions">
                <button class="btn btn-savoir-plus" onclick="navigateToModelPage(${model.id})">
                    <i class='bx bx-info-circle'></i>
                    EN SAVOIR PLUS
                </button>
            </div>
        `;
        
        modelsGrid.appendChild(modelCard);
    });
}

// Navigate to model page
function navigateToModelPage(modelId) {
    sessionStorage.setItem('selectedModelId', modelId);
    window.location.href = `model-profile.html?id=${modelId}`;
}

// Create model profile page
function createModelProfilePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = parseInt(urlParams.get('id')) || parseInt(sessionStorage.getItem('selectedModelId'));
    
    console.log('🔍 Recherche du mannequin avec ID:', modelId);
    console.log('📊 Données disponibles:', window.modelsData ? window.modelsData.length + ' mannequins' : 'Aucune donnée');
    
    if (!modelId || !window.modelsData) {
        console.error('❌ Erreur: ID manquant ou données non chargées');
        showProfileError();
        return;
    }
    
    const model = window.modelsData.find(m => m.id === modelId);
    if (!model) {
        console.error(`❌ Mannequin avec ID ${modelId} non trouvé`);
        console.log('IDs disponibles:', window.modelsData.map(m => m.id));
        showProfileError();
        return;
    }
    
    console.log('✅ Mannequin trouvé:', model.name);
    
    document.title = `${model.name} - MODELS ACADEMY MANAGEMENT`;
    
    const profileContainer = document.getElementById('model-profile-content');
    if (!profileContainer) return;
    
    const bodyMeasurements = model.gender === 'Femme' 
        ? `<div class="measurement-item"><span>Buste:</span><strong>${model.bust}</strong></div>
           <div class="measurement-item"><span>Taille:</span><strong>${model.waist}</strong></div>
           <div class="measurement-item"><span>Hanches:</span><strong>${model.hips}</strong></div>`
        : `<div class="measurement-item"><span>Poitrine:</span><strong>${model.chest}</strong></div>
           <div class="measurement-item"><span>Taille:</span><strong>${model.waist}</strong></div>`;
    
    const profileImageUrl = model.image && model.image.trim() !== '' ? model.image : 'images/gallery/models academy.jpg';
    
    profileContainer.innerHTML = `
        <div class="profile-header">
            <h1>${model.name}</h1>
        </div>
        
        <div class="profile-content">
            <div class="profile-main-image">
                <img src="${profileImageUrl}" alt="${model.name}" onerror="this.src='images/gallery/models academy.jpg'">
            </div>
            
            <div class="profile-info">
                <h2>À propos</h2>
                <p class="profile-description">${model.description}</p>
                
                <div class="profile-details">
                    <div class="detail-item">
                        <i class='bx bx-ruler'></i>
                        <span>Taille:</span>
                        <strong>${model.height}</strong>
                    </div>
                    <div class="detail-item">
                        <i class='bx bx-brush'></i>
                        <span>Cheveux:</span>
                        <strong>${model.hairColor}</strong>
                    </div>
                    <div class="detail-item">
                        <i class='bx bx-show'></i>
                        <span>Yeux:</span>
                        <strong>${model.eyeColor}</strong>
                    </div>
                    <div class="detail-item">
                        <i class='bx bx-map'></i>
                        <span>Ville:</span>
                        <strong>${model.city}</strong>
                    </div>
                    <div class="detail-item">
                        <i class='bx bx-time'></i>
                        <span>Expérience:</span>
                        <strong>${model.experience}</strong>
                    </div>
                </div>
                
                <div class="measurements-section">
                    <h3>Mensurations</h3>
                    <div class="measurements-grid">
                        ${bodyMeasurements}
                        <div class="measurement-item"><span>Pointure:</span><strong>${model.shoeSize}</strong></div>
                    </div>
                </div>
            </div>
        </div>
        
        ${renderGalleries(model)}
    `;
    
    initGalleryTabs(model);
}

function renderGalleries(model) {
    const hasPortfolio = model.gallery.portfolio && model.gallery.portfolio.length > 0;
    const hasFashionShow = model.gallery.fashionShow && model.gallery.fashionShow.length > 0;
    const hasShooting = model.gallery.shooting && model.gallery.shooting.length > 0;
    
    let defaultCategory = 'portfolio';
    if (!hasPortfolio && hasFashionShow) defaultCategory = 'fashionShow';
    if (!hasPortfolio && !hasFashionShow && hasShooting) defaultCategory = 'shooting';
    
    let galleriesHTML = `
        <div class="galleries-section">
            <h2>Galeries</h2>
            <div class="gallery-tabs">
                <button class="tab ${defaultCategory === 'portfolio' ? 'active' : ''}" data-category="portfolio"><i class='bx bx-image'></i> Portfolio</button>
                <button class="tab ${defaultCategory === 'fashionShow' ? 'active' : ''}" data-category="fashionShow"><i class='bx bx-walk'></i> Fashion Show</button>
                <button class="tab ${defaultCategory === 'shooting' ? 'active' : ''}" data-category="shooting"><i class='bx bx-camera'></i> Shooting</button>
            </div>
            <div id="gallery-content" class="gallery-grid"></div>
        </div>
    `;
    
    return galleriesHTML;
}

function initGalleryTabs(model) {
    const tabs = document.querySelectorAll('.gallery-tabs .tab');
    const galleryContent = document.getElementById('gallery-content');
    
    if (!tabs.length || !galleryContent) return;
    
    function showCategory(category) {
        const images = model.gallery[category] || [];
        
        if (images.length === 0) {
            galleryContent.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Aucune image disponible dans cette catégorie</p>';
            return;
        }
        
        galleryContent.innerHTML = images.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="${model.name}" loading="lazy" onerror="this.parentElement.style.display='none'">
            </div>
        `).join('');
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showCategory(this.dataset.category);
        });
    });
    
    const activeTab = document.querySelector('.gallery-tabs .tab.active');
    if (activeTab) {
        showCategory(activeTab.dataset.category);
    }
}

function showProfileError() {
    const profileContainer = document.getElementById('model-profile-content');
    if (profileContainer) {
        profileContainer.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 60px 20px; color: #666;">
                <h3 style="color: #1e3a8a; margin-bottom: 20px;">Erreur lors du chargement du profil</h3>
                <p style="margin-bottom: 10px;">Impossible de charger les informations.</p>
                <p><a href="mannequins.html" style="color: #1e3a8a;">Retourner à la liste</a></p>
            </div>
        `;
    }
}

// Multi-step form
let currentStep = 1;
const totalSteps = 3;

function initMultiStepForm() {
    const form = document.getElementById('candidature-form');
    if (!form) return;
    
    updateFormDisplay();
    
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep()) {
                currentStep++;
                updateFormDisplay();
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormDisplay();
        });
    });
}

function updateFormDisplay() {
    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
    
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index + 1 <= currentStep);
    });
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step:nth-child(${currentStep})`);
    const requiredInputs = currentStepElement.querySelectorAll('[required]');
    
    let isValid = true;
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

function initFormHandling() {
    const form = document.getElementById('candidature-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        submitBtn.textContent = 'Candidature envoyée !';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
            currentStep = 1;
            updateFormDisplay();
        }, 3000);
    });
}

function initInscriptionForm() {
    initMultiStepForm();
}

initFormHandling();

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Lazy loading
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

initLazyLoading();

// Formation carousel
function initFormationCarousels() {
    const carousels = document.querySelectorAll('.formation-carousel');

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

        carousel.innerHTML = '';

        images.forEach((imageName, index) => {
            const img = document.createElement('img');
            img.src = `images/gallery/${imageName}`;
            img.alt = `Formation ${key || ''} - ${index + 1}`;
            img.className = 'carousel-image';
            img.loading = 'lazy';
            
            if (index === 0) {
                img.classList.add('active');
            }
            
            img.onerror = function() {
                img.style.display = 'none';
            };
            
            carousel.appendChild(img);
        });

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
