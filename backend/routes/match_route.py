from flask import request,Flask,jsonify,session,redirect, url_for,Blueprint
from models.match import DB_Matchs
from models.users import DB_Users
import config as keys
from bson import json_util


# setting blueprint and mongodb properties
match_bp = Blueprint('match_bp', __name__)
db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Matchs','user')



# return  match information depending on the game
@match_bp.route('/matchs',methods = ['GET'])
def find_game():
    gamename = request.args.get('gamename')
    gamemode = request.args.get('gamemode')
    try:
        found_matches = db_match.list_all_available_match_with_condition(gamename,gamemode)
        matches_json = json_util.dumps(found_matches)
        return jsonify({"status":"success","matches":matches_json}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    
    
# create new match into the database
@match_bp.route('/matchs',methods= ['POST'])
def create_match():
    data = request.json
    required_fields = ['host_name', 'host_id', 'game_name', 'game_mode', 'max_player', 'current_player','player_count', 'description','avatar_uri','expire_time']
    if not all(field in data for field in required_fields):
        missing = [field for field in required_fields if field not in data]
        return jsonify({"status": "error", "message": f"Missing fields: {', '.join(missing)}"}), 400
    
    try:
        db_match.insert_match(data.get('host_name'), data.get('host_id'), data.get('game_name'),
                              data.get('game_mode'), data.get('max_player'), 
                              data.get('current_player'),data.get('player_count'), data.get('description'),
                              data.get('avatar_uri'),data.get('expire_time'))
        
        return jsonify({"status": "success", "message": f"inserted data {data}"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
