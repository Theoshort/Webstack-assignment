from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

staff = [
    {"id": 1, "name": "Alice Johnson", "title": "Professor", "area": "AI", "email": "alice@example.com"},
    {"id": 2, "name": "Bob Smith", "title": "Lecturer", "area": "Security", "email": "bob@example.com"},
    {"id": 3, "name": "Clara Lee", "title": "Researcher", "area": "AI", "email": "clara@example.com"}
]

@app.route('/staff')
def get_staff():
    area = request.args.get('area')
    if area:
        return jsonify([s for s in staff if s['area'].lower() == area.lower()])
    return jsonify(staff)

@app.route('/staff/<int:id>')
def get_staff_member(id):
    for s in staff:
        if s["id"] == id:
            return jsonify(s)
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
