from flask import Flask,jsonify
from flask_cors import CORS  # Import CORS
from config import * 
from flask_jwt_extended import JWTManager
import routes


# app settings
app = Flask(__name__)
app.register_blueprint(routes.match_bp, url_prefix='/v1')
app.register_blueprint(routes.user_bp, url_prefix='/v1')
app.config['JWT_SECRET_KEY'] = FLASK_SECRET_KEY 
app.secret_key = FLASK_SECRET_KEY
jwt = JWTManager(app)
CORS(app,supports_credentials=True,resources={r"/*": {"origins": ALLOWED_ORIGINS}}) 


@app.route('/')
def home():
    return 'Api Main'

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'up'}), 200

# main 
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)
    