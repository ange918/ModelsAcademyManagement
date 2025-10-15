#!/usr/bin/env python3
import json
import os
import shutil
from pathlib import Path

def normalize_name(name):
    """Normalise le nom du mannequin pour créer un nom de dossier"""
    name_parts = name.split()
    if len(name_parts) >= 2:
        return name_parts[1].lower()
    return name.lower().replace(' ', '_')

def create_model_folders():
    """Crée les dossiers et sous-dossiers pour chaque mannequin"""
    
    with open('data/models.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    images_dir = Path('images')
    
    for model in data['models']:
        folder_name = normalize_name(model['name'])
        model_dir = images_dir / folder_name
        
        model_dir.mkdir(exist_ok=True)
        
        (model_dir / 'defile').mkdir(exist_ok=True)
        (model_dir / 'portfolio').mkdir(exist_ok=True)
        (model_dir / 'shooting').mkdir(exist_ok=True)
        
        print(f"✅ Dossiers créés pour {model['name']}: {folder_name}/")

def move_existing_images():
    """Déplace les images existantes dans les bons dossiers"""
    
    with open('data/models.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    images_dir = Path('images')
    
    for model in data['models']:
        folder_name = normalize_name(model['name'])
        model_dir = images_dir / folder_name
        
        if not model_dir.exists():
            continue
        
        for subdir in ['defile', 'portfolio', 'shooting']:
            src_subdir = model_dir / subdir if (model_dir / subdir).exists() else model_dir / ('shoting' if subdir == 'shooting' else 'porfolio' if subdir == 'portfolio' else subdir)
            
            if src_subdir.exists() and src_subdir.name != subdir:
                dest_subdir = model_dir / subdir
                if not dest_subdir.exists():
                    print(f"  Renommage: {src_subdir} → {dest_subdir}")
                    src_subdir.rename(dest_subdir)

if __name__ == '__main__':
    print("🚀 Organisation des dossiers d'images...")
    create_model_folders()
    print("\n📦 Déplacement des images existantes...")
    move_existing_images()
    print("\n✨ Organisation terminée!")
