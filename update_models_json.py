#!/usr/bin/env python3
import json
import os
from pathlib import Path

def get_images_from_folder(folder_path):
    """Récupère toutes les images d'un dossier"""
    if not folder_path.exists():
        return []
    
    image_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    images = []
    
    for file in folder_path.iterdir():
        if file.is_file() and file.suffix.lower() in image_extensions:
            images.append(str(file))
    
    return sorted(images)

def update_models_data():
    """Met à jour models.json avec les vrais chemins d'images"""
    
    with open('data/models.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    images_dir = Path('images')
    
    model_folders_map = {
        'Lucia Padanou': 'lucia',
        'AZONWANOU Rita': 'rita',
        'TOUNDO Olerie': 'olerie',
        'EDJO Aurelle': 'edjo',
        'YEHOUN Barnard': 'barnard',
        'AGBEWANOU Méyèvi Prisca': 'prisca',
        'TRAORE Khady': 'khady',
        'AMAH Rodéric': 'roderic',
        'HESSOU Cyr-God': 'cyr',
        'FAMIWA Dalil': 'dalil',
        'HOUNDJREBO Rose': 'rose',
        'SAGBO Amen': 'amen',
        'MIDJNDOU Gildas': 'gildas',
        'HOUNGBEDJI Abou-Bacar': 'abou-bacar',
        'GBEDEGLA Geordys': 'geordys',
        'MISSIHOUN Merveille': 'merveille',
        'DATO Marie-Michelle': 'michelle'
    }
    
    for model in data['models']:
        model_name = model['name']
        
        if model_name in model_folders_map:
            folder_name = model_folders_map[model_name]
            model_dir = images_dir / folder_name
            
            if not model_dir.exists():
                print(f"⚠️  Dossier introuvable pour {model_name}: {folder_name}")
                continue
            
            for subdir_name in ['portfolio', 'porfolio']:
                portfolio_dir = model_dir / subdir_name
                if portfolio_dir.exists():
                    break
            else:
                portfolio_dir = model_dir / 'portfolio'
            
            portfolio_images = get_images_from_folder(portfolio_dir)
            
            if portfolio_images:
                model['image'] = portfolio_images[0]
                print(f"✅ {model_name}: {model['image']}")
            else:
                print(f"⚠️  Aucune image portfolio pour {model_name}")
            
            for subdir_name in ['shooting', 'shoting']:
                shooting_dir = model_dir / subdir_name
                if shooting_dir.exists():
                    break
            else:
                shooting_dir = model_dir / 'shooting'
            
            shooting_images = get_images_from_folder(shooting_dir)
            
            defile_dir = model_dir / 'defile'
            defile_images = get_images_from_folder(defile_dir)
            
            model['gallery'] = {
                'shooting': shooting_images if shooting_images else [],
                'fashionShow': defile_images if defile_images else [],
                'portfolio': portfolio_images if portfolio_images else []
            }
    
    with open('data/models.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✨ Fichier models.json mis à jour avec succès!")

if __name__ == '__main__':
    print("🔄 Mise à jour du fichier models.json...")
    update_models_data()
