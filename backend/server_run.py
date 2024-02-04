from flask import request,Flask,jsonify,session,redirect, url_for
from services.discord_oauth2 import DCoauth
from flask_cors import CORS  # Import CORS
import config as keys
from flask_jwt_extended import JWTManager
from services.league_rank import Rank


# getting the blueprint for user and match route
from routes.user_route import user_bp
from routes.match_route import match_bp



# app settings
app = Flask(__name__)
app.register_blueprint(match_bp, url_prefix='/v1')
app.register_blueprint(user_bp, url_prefix='/v1')
app.config['JWT_SECRET_KEY'] = keys.flask_secret_key 
app.secret_key = keys.flask_secret_key
jwt = JWTManager(app)

CORS(app,supports_credentials=True,resources={r"/*": {"origins": "http://localhost:3000"}}) 


# general testing 
@app.route('/')
def home():
    return 'This is the home page.'

@app.route('/logout')
def unlink_discord():
    session.pop('user_id',None)
    session.pop('user_info',None)
    return redirect(url_for('home'))

@app.route('/get_summoner_rank', methods=['GET'])
def get_summoner_rank():
    summoner_name = request.args.get('summoner_name')
    region = request.args.get('region', default='NA1')
    
    if summoner_name:
        rank = Rank()
        rank_info = rank.get_summoner_rank_by_name(summoner_name, region)
        return jsonify(rank_info)
    else:
        return jsonify({"error": "summoner_name is required"}), 400


# main 
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)
    