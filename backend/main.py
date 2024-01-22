from flask import request,Flask,jsonify,session,redirect, url_for
from Dcbot.discord_oauth2 import DCoauth
import requests
import random
from flask_cors import CORS  # Import CORS
from Database.match import DB_Matchs
from Database.users import DB_Users
import api_keys as keys
import bson.json_util as json_util



app = Flask(__name__)
app.secret_key = keys.flask_secret_key

db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Discord_Users','Basic_Information')
CORS(app) 


# return  match information depending on the game
@app.route('/v1/matchs',methods = ['GET'])
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
@app.route('/v1/matchs',methods= ['POST'])
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






@app.route('/v1/user',methods=['GET'])
def testing_user():
        
    user_id = request.args.get('id')
    token = request.args.get('token')
    if token and token == keys.discord_bot_token:
        return {"data":'testing user data'},200
    
    if user_id and session['user_id'] and (user_id == session['user_id']):
        return {session['user_info']},200
    else:
        return "You have not linked your Discord Account",400



@app.route('/link/discord',methods=['GET'])
def register():
    code = request.args.get('code')
    print(code)
    if code:
        discord_oauth = DCoauth()
        try :
            data = discord_oauth.exchange_code(str(code))
        except Exception as e:
            return "Cannot Link you discord icon try to back to the home page and do it again",400
        
        if data['access_token']:
            user = discord_oauth.get_current_user(data['access_token'])
            session['user_id'] = user['id']
            session['user_info'] = user
            return "You have linked your discord icon, all set",200
        else:
            return "No access token found ",400
    else:
        return 'No code provided, discord linked faild', 400





@app.route('/')
def home():
    return 'This is the home page.'


@app.route('/logout')
def unlink_discord():
    session.pop('user_id',None)
    session.pop('user_info',None)
    return redirect(url_for('home'))



# main 
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
    
    







