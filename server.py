#!/usr/bin/env python3
"""
Simple HTTP server with cache control headers for Replit iframe compatibility.
This server prevents caching issues when the website is displayed in Replit's iframe.
"""
import http.server
import socketserver
import os
from urllib.parse import unquote

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache control headers to prevent caching in Replit's iframe
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        # Allow CORS for cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        # Ensure we serve index.html for root requests
        if self.path == '/':
            self.path = '/index.html'
        
        return super().do_GET()

if __name__ == "__main__":
    PORT = 5000
    HOST = "0.0.0.0"
    
    # Change to the directory containing the website files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer((HOST, PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Serving at http://{HOST}:{PORT}/")
        print("Cache control headers enabled for Replit compatibility")
        httpd.serve_forever()