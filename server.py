import http.server
import socketserver
import os

PORT = int(os.environ.get("PORT", 8095))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class AtlantisFlameHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AtlantisFlameHandler) as httpd:
        print(f"flame.atlantis.tysonmediagroup.org running at http://localhost:{PORT} ...")
        httpd.serve_forever()
