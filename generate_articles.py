#!/usr/bin/env python3
"""Script pour générer les pages d'articles individuelles"""

import os
import re

# Créer le dossier articles s'il n'existe pas
os.makedirs('articles', exist_ok=True)

# Lire le fichier articles.js
with open('data/articles.js', 'r', encoding='utf-8') as f:
    articles_js = f.read()

# Extraire les articles (parsing simple)
# On va créer un parser simple pour extraire chaque article
import json

# Parser manuel simple
articles_text = articles_js.split('const BLOG_ARTICLES = [')[1].split('];')[0]

# Pour chaque article, on va créer une page HTML
# On va extraire les informations article par article

articles = []
current_article = {}
in_content = False
content_lines = []
brace_count = 0

for line in articles_text.split('\n'):
    line = line.strip()
    
    if line.startswith('{'):
        brace_count += 1
        current_article = {}
        in_content = False
        content_lines = []
    elif line.startswith('}'):
        brace_count -= 1
        if brace_count == 0 and current_article:
            if content_lines:
                current_article['content'] = '\n'.join(content_lines)
            articles.append(current_article)
            current_article = {}
            content_lines = []
    elif 'id:' in line:
        current_article['id'] = int(line.split(':')[1].strip().rstrip(','))
    elif 'title:' in line and 'blog-card-title' not in line:
        title = line.split('title:', 1)[1].strip().strip('"').strip(',').strip('"')
        current_article['title'] = title
    elif 'date:' in line and 'blog-card-date' not in line:
        date = line.split('date:', 1)[1].strip().strip('"').strip(',').strip('"')
        current_article['date'] = date
    elif 'category:' in line and 'blog-card-category' not in line:
        category = line.split('category:', 1)[1].strip().strip('"').strip(',').strip('"')
        current_article['category'] = category
    elif 'image:' in line and 'blog-card-image' not in line:
        image = line.split('image:', 1)[1].strip().strip('"').strip(',').strip('"')
        current_article['image'] = image
    elif 'excerpt:' in line:
        excerpt = line.split('excerpt:', 1)[1].strip().strip('"').strip(',').strip('"')
        current_article['excerpt'] = excerpt
    elif 'content:' in line:
        in_content = True
        # Check if content starts on same line
        if '`' in line:
            content_start = line.split('`', 1)[1] if line.count('`') == 1 else line.split('`')[1]
            if content_start.strip():
                content_lines.append(content_start)
    elif in_content:
        # Check for end of content
        if line.endswith('`') or line.endswith('`,'):
            content_line = line.rstrip('`,').rstrip('`')
            if content_line.strip():
                content_lines.append(content_line)
            in_content = False
        else:
            content_lines.append(line)

print(f"Trouvé {len(articles)} articles")

# Template HTML pour chaque article
def generate_article_page(article):
    slug = f"{article['id']:02d}"
    
    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{article['title']} - MODELS ACADEMY MANAGEMENT</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="../style.css">
    <style>
        /* Article page styles */
        .article-header {{
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            color: white;
            padding: 140px 20px 60px;
            text-align: center;
        }}
        
        .article-back {{
            position: absolute;
            top: 90px;
            left: 20px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 300;
            transition: gap 0.3s ease;
            z-index: 100;
        }}
        
        .article-back:hover {{
            gap: 12px;
        }}
        
        .article-back i {{
            font-size: 1.5rem;
        }}
        
        .article-category {{
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 400;
            margin-bottom: 15px;
        }}
        
        .article-title {{
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 300;
            margin-bottom: 20px;
            line-height: 1.3;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }}
        
        .article-meta {{
            display: flex;
            gap: 20px;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            opacity: 0.9;
            font-size: 1rem;
        }}
        
        .article-date {{
            display: flex;
            align-items: center;
            gap: 5px;
        }}
        
        .article-container {{
            max-width: 900px;
            margin: 60px auto;
            padding: 0 20px;
        }}
        
        .article-content {{
            background: white;
            padding: 50px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            line-height: 1.8;
        }}
        
        .article-content h2 {{
            font-size: 2rem;
            font-weight: 400;
            margin-top: 40px;
            margin-bottom: 20px;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            gap: 12px;
        }}
        
        .article-content h2:first-child {{
            margin-top: 0;
        }}
        
        .article-content h2 i {{
            font-size: 2.2rem;
            color: #2563eb;
        }}
        
        .article-content h3 {{
            font-size: 1.5rem;
            font-weight: 400;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #2563eb;
            display: flex;
            align-items: center;
            gap: 10px;
        }}
        
        .article-content h3 i {{
            font-size: 1.6rem;
        }}
        
        .article-content h4 {{
            font-size: 1.2rem;
            font-weight: 500;
            margin-top: 25px;
            margin-bottom: 12px;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        
        .article-content h4 i {{
            font-size: 1.3rem;
            color: #d4af37;
        }}
        
        .article-image {{
            width: 100%;
            max-width: 800px;
            margin: 30px auto;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }}
        
        .article-image img {{
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }}
        
        .article-image-caption {{
            background: #f8f9fa;
            padding: 15px;
            text-align: center;
            font-size: 0.95rem;
            color: #666;
            font-style: italic;
        }}
        
        .icon-list {{
            list-style: none;
            padding-left: 0;
        }}
        
        .icon-list li {{
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 15px;
        }}
        
        .icon-list li i {{
            font-size: 1.5rem;
            color: #2563eb;
            margin-top: 3px;
            flex-shrink: 0;
        }}
        
        .article-content p {{
            margin-bottom: 18px;
            color: #444;
            font-weight: 300;
            font-size: 1.05rem;
        }}
        
        .article-content ul,
        .article-content ol {{
            margin: 20px 0;
            padding-left: 30px;
        }}
        
        .article-content li {{
            margin-bottom: 12px;
            color: #444;
            font-weight: 300;
            font-size: 1.05rem;
        }}
        
        .article-content blockquote {{
            background: #f0f7ff;
            border-left: 4px solid #2563eb;
            padding: 25px;
            margin: 30px 0;
            font-style: italic;
            color: #1a1a1a;
            border-radius: 4px;
            font-size: 1.1rem;
        }}
        
        .article-content strong {{
            font-weight: 500;
            color: #1a1a1a;
        }}
        
        @media (max-width: 768px) {{
            .article-header {{
                padding: 120px 20px 40px;
            }}
            
            .article-content {{
                padding: 30px 20px;
            }}
            
            .article-content h2 {{
                font-size: 1.6rem;
            }}
            
            .article-content h3 {{
                font-size: 1.3rem;
            }}
            
            .article-content h2,
            .article-content h3,
            .article-content h4 {{
                flex-wrap: wrap;
            }}
            
            .article-back {{
                top: 80px;
            }}
        }}
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <img src="../images/gallery/models academy.jpg" alt="Logo MAM" class="logo-icon">
                <h2>MAM</h2>
            </a>
            <div class="nav-menu">
                <a href="../index.html#home" class="nav-link">Accueil</a>
                <div class="nav-dropdown">
                    <span class="nav-dropdown-toggle">
                        Détails <i class='bx bx-chevron-down'></i>
                    </span>
                    <div class="nav-dropdown-content">
                        <a href="../about.html">À Propos</a>
                        <a href="../blog.html">Blog</a>
                    </div>
                </div>
                <a href="../index.html#formations" class="nav-link">Formations</a>
                <a href="../mannequins.html" class="nav-link nav-cta">Nos Mannequins</a>
                <a href="../index.html#inscription" class="nav-link btn-inscription">S'inscrire</a>
            </div>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Article Header -->
    <section class="article-header">
        <a href="../blog.html" class="article-back">
            <i class='bx bx-left-arrow-alt'></i>
            Retour au blog
        </a>
        <span class="article-category">{article['category']}</span>
        <h1 class="article-title">{article['title']}</h1>
        <div class="article-meta">
            <span class="article-date">
                <i class='bx bx-calendar'></i>
                {article['date']}
            </span>
        </div>
    </section>

    <!-- Article Content -->
    <div class="article-container">
        <article class="article-content fade-in">
            {article['content']}
        </article>
    </div>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-content fade-in">
                <h2>Prêt à Lancer Votre Carrière ?</h2>
                <p>Rejoignez Models Academy Management et bénéficiez de l'accompagnement d'experts pour réussir dans l'industrie de la mode.</p>
                <a href="../index.html#inscription" class="btn btn-primary btn-large">S'inscrire Maintenant</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>MODELS ACADEMY MANAGEMENT</h3>
                    <p>L'excellence au service de votre talent depuis 2008.</p>
                    <div class="footer-social">
                        <a href="#" aria-label="Instagram"><i class='bx bxl-instagram'></i></a>
                        <a href="#" aria-label="Facebook"><i class='bx bxl-facebook'></i></a>
                        <a href="#" aria-label="LinkedIn"><i class='bx bxl-linkedin'></i></a>
                        <a href="#" aria-label="Twitter"><i class='bx bxl-twitter'></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="../index.html#formations">Formations</a></li>
                        <li><a href="../mannequins.html">Nos Mannequins</a></li>
                        <li><a href="../about.html">À Propos</a></li>
                        <li><a href="../blog.html">Blog</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><i class='bx bx-envelope'></i> contact@modelsacademymgnt.com</li>
                        <li><i class='bx bx-phone'></i> +229 69 89 69 50</li>
                        <li><i class='bx bx-map'></i> Bénin Calavi Bidossessi</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Models Academy Management. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="../script.js"></script>
</body>
</html>"""

# Générer toutes les pages d'articles
for article in articles:
    slug = f"{article['id']:02d}"
    filename = f"article-{slug}.html"
    filepath = os.path.join('articles', filename)
    
    html = generate_article_page(article)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"✅ Créé: {filename}")

print(f"\n🎉 {len(articles)} pages d'articles générées avec succès !")
