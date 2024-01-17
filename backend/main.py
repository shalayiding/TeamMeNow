from flask import request,Flask,jsonify
from discord_oauth2 import DCoauth
import requests
import random
from flask_cors import CORS  # Import CORS
from Database.match import DB_Matchs
from Database.users import DB_Users
import api_keys as keys
import bson.json_util as json_util



app = Flask(__name__)
CORS(app) 



# return simple match information depending on the game
@app.route('/v1/game/<gamename>')
def find_game(gamename):
    found_matches = db_match.list_all_available_match_with_condition(str(gamename))
    if found_matches is None:
        return jsonify({"matches": []}), 400, {'ContentType': 'application/json'}
    matches_json = json_util.dumps(found_matches)
    return matches_json, 200, {'ContentType': 'application/json'}


@app.route('/v1/user/<id>')
def find_user(id):
    
    
    
    return jsonify({id:'rew'})
    

@app.route('/')
def hello():
    return '<p> hello </p>'



@app.route('/link/discord',methods=['GET'])
def register():
    code = request.args.get('code')
    print(code)
    if code:
        discord_oauth = DCoauth()
        data = discord_oauth.exchange_code(str(code))
        # user = discord_oauth.get_current_user(data['access_token'])
        # print(user)
        return data
    else:
        return 'No code provided, discord linked faild', 400




# main 
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
    db_match = DB_Matchs(keys.mongodb_link,"Matchs","League_of_Legends")
    db_user = DB_Users(keys.mongodb_link,'Discord_Users','Basic_Information')
    







