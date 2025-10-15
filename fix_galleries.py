#!/usr/bin/env python3
import json
import os
from pathlib import Path

def get_all_images_from_folder(folder_path):
    """Récupère toutes les images d'un dossier"""
    if not folder_path.exists():
        return []
    
    image_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    images = []
    
    for file in folder_path.iterdir():
        if file.is_file() and file.suffix.lower() in image_extensions:
            images.append(str(file))
    
    return sorted(images)

def fix_galleries():
    """Met à jour les galeries avec TOUTES les images disponibles"""
    
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
                print(f"⚠️  Dossier introuvable: {folder_name}")
                continue
            
            portfolio_dir = model_dir / 'portfolio'
            shooting_dir = model_dir / 'shooting'
            defile_dir = model_dir / 'defile'
            
            portfolio_images = get_all_images_from_folder(portfolio_dir)
            shooting_images = get_all_images_from_folder(shooting_dir)
            defile_images = get_all_images_from_folder(defile_dir)
            
            if portfolio_images:
                model['image'] = portfolio_images[0]
            
            model['gallery'] = {
                'shooting': shooting_images,
                'fashionShow': defile_images,
                'portfolio': portfolio_images
            }
            
            total = len(shooting_images) + len(defile_images) + len(portfolio_images)
            print(f"✅ {model_name}: {total} images ({len(portfolio_images)} portfolio, {len(shooting_images)} shooting, {len(defile_images)} defile)")
    
    with open('data/models.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print("\n✨ Galeries mises à jour avec succès!")

if __name__ == '__main__':
    print("🔄 Correction des galeries...")
    fix_galleries()
