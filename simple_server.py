#!/usr/bin/env python3
"""
Simple HTTP server for MODELS ACADEMY MANAGEMENT website.
Serves static files (HTML, CSS, JS, images) without any API.
"""
import http.server
import socketserver
import os
from pathlib import Path

PORT = 5000
DIRECTORY = "."

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """
    HTTP request handler with no-cache headers.
    This prevents caching issues in Replit's iframe.
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add no-cache headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom log format
        print(f"{self.address_string()} - [{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    print("=" * 60)
    print("🚀 MODELS ACADEMY MANAGEMENT - Serveur Web Simple")
    print("=" * 60)
    print(f"📂 Répertoire: {os.path.abspath(DIRECTORY)}")
    print(f"🌐 Serveur démarré sur http://0.0.0.0:{PORT}/")
    print("=" * 60)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), NoCacheHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Serveur arrêté")
            httpd.shutdown()
