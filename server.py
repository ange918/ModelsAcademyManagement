#!/usr/bin/env python3
"""
Flask server for MODELS ACADEMY MANAGEMENT website.
This server automatically detects models in the /images/ directory,
creates missing subdirectories, and provides an API for the frontend.
"""
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import os
import json
from pathlib import Path

app = Flask(__name__, static_folder='.')
CORS(app)

# Configuration
IMAGES_DIR = 'images'
REQUIRED_SUBDIRS = ['portfolio', 'shooting', 'defile']
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG'}

# Ordre exact des mannequins (priorité d'affichage)
MODEL_ORDER = [
    'lucia',           # 1. Lucia Padonou
    'rita',            # 2. Azonwanou Rita
    'olerie',          # 3. Toundoh Olérie
    'aurelle',         # 4. Edjo Aurelle
    'barnard',         # 5. Yehoun Barnard
    'prisca',          # 6. Agbewanou Méyèvi Prisca
    'khady',           # 7. Traoré Khady
    'roderic',         # 8. Amah Roderic
    'cyr-god',         # 9. Hessou Cyr-God
    'dalil',           # 10. Famiwa Dalil
    'rose',            # 11. Houdjregbo Rose
    'amen',            # 12. Sagbo Amen
    'gildas',          # 13. Midjindou Gildas
    'abou-bacar',      # 14. Houngbedji Abou-bacar
    'geordys',         # 15. Gbedegla Geordys
    'merveille',       # 16. Missihoun Merveille
    'marie-michelle',  # 17. Dato Marie-Michèlle
    'jediel',          # 18. Vodounon Jédiel
    'honel',           # 19. Tossou Rafiou Honel
    'mathieu',         # 20. Akpo Mathieu
    'joana',           # 21. Agbognon Joana
    'paula',           # 22. Senou Paula
    'pascal',          # 23. Adantolankpe Pascal
    'danielle'         # 24. Gbaguidi Danielle
]

# Types de mannequins (exceptions au type par défaut)
MODEL_TYPES = {
    'joana': 'Model Photo',
    'jediel': 'Model Photo',
    # Tous les autres sont 'Fashion & Haute Couture' par défaut
}

def create_missing_subdirectories(model_dir):
    """
    Crée automatiquement les sous-dossiers manquants pour un mannequin.
    """
    created_dirs = []
    for subdir in REQUIRED_SUBDIRS:
        subdir_path = os.path.join(model_dir, subdir)
        if not os.path.exists(subdir_path):
            os.makedirs(subdir_path, exist_ok=True)
            created_dirs.append(subdir)
            # Créer un fichier .gitkeep pour garder le dossier vide dans git
            gitkeep_path = os.path.join(subdir_path, '.gitkeep')
            Path(gitkeep_path).touch()
    return created_dirs

def get_images_in_directory(directory):
    """
    Retourne la liste de toutes les images dans un répertoire.
    """
    if not os.path.exists(directory):
        return []
    
    images = []
    for filename in os.listdir(directory):
        if any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
            images.append(filename)
    return sorted(images)

def get_profile_image(item, portfolio_images, shooting_images, defile_images):
    """
    Détermine l'image de profil à utiliser.
    Si portfolio est vide, utilise automatiquement une image de shooting ou defile.
    """
    # Si portfolio a des images, utiliser la première
    if portfolio_images:
        return f'images/{item}/portfolio/{portfolio_images[0]}'
    
    # Sinon, fallback sur shooting
    if shooting_images:
        return f'images/{item}/shooting/{shooting_images[0]}'
    
    # Sinon, fallback sur defile
    if defile_images:
        return f'images/{item}/defile/{defile_images[0]}'
    
    # Aucune image disponible
    return None

def get_model_type(folder_name):
    """
    Retourne le type de mannequin.
    Par défaut: Fashion & Haute Couture
    Exceptions: Joana et Jédiel = Model Photo
    """
    return MODEL_TYPES.get(folder_name.lower(), 'Fashion & Haute Couture')

def scan_models_directory():
    """
    Scanne le dossier /images/ et retourne la liste de tous les mannequins
    avec leurs images organisées par catégorie.
    Les mannequins sont retournés dans l'ordre défini par MODEL_ORDER.
    """
    models = []
    
    if not os.path.exists(IMAGES_DIR):
        return models
    
    # Parcourir tous les dossiers dans /images/
    for item in os.listdir(IMAGES_DIR):
        item_path = os.path.join(IMAGES_DIR, item)
        
        # Ignorer les fichiers et le dossier gallery
        if not os.path.isdir(item_path) or item == 'gallery':
            continue
        
        # Créer les sous-dossiers manquants
        created_dirs = create_missing_subdirectories(item_path)
        
        # Récupérer les images de chaque catégorie
        portfolio_images = get_images_in_directory(os.path.join(item_path, 'portfolio'))
        shooting_images = get_images_in_directory(os.path.join(item_path, 'shooting'))
        defile_images = get_images_in_directory(os.path.join(item_path, 'defile'))
        
        # Déterminer l'image de profil (avec fallback automatique)
        profile_image = get_profile_image(item, portfolio_images, shooting_images, defile_images)
        
        # Construire l'objet mannequin
        model = {
            'folder_name': item,
            'profile_image': profile_image,
            'model_type': get_model_type(item),
            'portfolio': [f'images/{item}/portfolio/{img}' for img in portfolio_images],
            'shooting': [f'images/{item}/shooting/{img}' for img in shooting_images],
            'defile': [f'images/{item}/defile/{img}' for img in defile_images],
            'created_dirs': created_dirs
        }
        
        models.append(model)
    
    # Trier selon l'ordre défini dans MODEL_ORDER
    def get_order_index(model):
        folder_name = model['folder_name'].lower()
        try:
            return MODEL_ORDER.index(folder_name)
        except ValueError:
            # Si le mannequin n'est pas dans MODEL_ORDER, le mettre à la fin
            return len(MODEL_ORDER) + 1000
    
    return sorted(models, key=get_order_index)

@app.route('/api/models')
def get_models():
    """
    API endpoint pour récupérer la liste de tous les mannequins.
    """
    models = scan_models_directory()
    return jsonify({
        'success': True,
        'count': len(models),
        'models': models
    })

@app.route('/api/models/<folder_name>')
def get_model_by_folder(folder_name):
    """
    API endpoint pour récupérer les détails d'un mannequin spécifique.
    """
    models = scan_models_directory()
    model = next((m for m in models if m['folder_name'] == folder_name), None)
    
    if model:
        return jsonify({
            'success': True,
            'model': model
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Mannequin non trouvé'
        }), 404

@app.route('/')
def index():
    """
    Servir la page d'accueil.
    """
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """
    Servir les fichiers statiques (HTML, CSS, JS, images).
    """
    # Si le path se termine par .html, servir directement le fichier HTML
    # (les paramètres de requête seront ignorés par send_from_directory)
    if path.endswith('.html'):
        return send_from_directory('.', path)
    
    return send_from_directory('.', path)

@app.after_request
def add_header(response):
    """
    Ajouter les headers pour éviter la mise en cache dans l'iframe Replit.
    """
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 MODELS ACADEMY MANAGEMENT - Serveur Flask")
    print("=" * 60)
    print(f"📂 Scanning directory: {IMAGES_DIR}")
    
    # Scanner et afficher les mannequins détectés au démarrage
    models = scan_models_directory()
    print(f"✅ {len(models)} mannequins détectés:")
    for model in models:
        print(f"   - {model['folder_name']}")
        if model['created_dirs']:
            print(f"     └─ Dossiers créés: {', '.join(model['created_dirs'])}")
    
    print("=" * 60)
    print(f"🌐 Server running at http://0.0.0.0:5000/")
    print(f"📡 API endpoint: http://0.0.0.0:5000/api/models")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5000, debug=False)