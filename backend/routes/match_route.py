from config import *
from flask import request,jsonify,Blueprint
from bson import json_util,ObjectId
import json
import models



match_bp = Blueprint('match_bp', __name__)

# return  match information depending on the game
@match_bp.route('/matchs',methods = ['GET'])
def find_game():
    gamename = request.args.get('gamename')
    gamemode = request.args.get('gamemode')
    teamsize = request.args.get('teamsize')
    match_id = request.args.get('match_id')
    offset = request.args.get('offset',default=0)
    limit = request.args.get('limit',default=10)    
    condition = {}
    if gamename :
        condition['gamename'] = gamename.lower()
    if gamemode :
        condition['gamemode'] = gamemode.lower()
    if match_id :
        condition['_id'] = ObjectId(match_id)
    if teamsize:
        condition['player_count'] = int(teamsize)
        
    try :
        limit = int(limit)
        offset = int(offset)
    except ValueError:
        limit = 10
        offset = 0
    
    try:
        limit = min(limit,20)
        size_found_matchs = models.db_match.get_match_count(condition)
        found_matches = models.db_match.find_match(condition,offset,limit)
        matches_json = json_util.dumps(found_matches,default = models.db_match.default_converter)
        matches_dict = json.loads(matches_json)
        totalPage = max(1,size_found_matchs // limit)
        return jsonify({"matches":matches_dict,"totalPage":totalPage}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 400
    

# create new match into the database
@match_bp.route('/matchs',methods= ['POST'])
def create_match():
    data = request.json
    try:
        models.db_match.insert_match(data.get('host_name'), data.get('host_id'), data.get('game_name'),
                              data.get('game_mode'), data.get('player_count'), data.get('description'),
                              data.get('avatar_uri'),data.get('expire_time'),data.get('discord_join_link'))
        
        return jsonify({"status": "success", "message": f"inserted data {data}"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@match_bp.route('/matchs/game',methods=['GET'])
def game_list():
    try :
        condition = {}
        found_games = models.db_game.find_game(condition)
        
        game_json = json_util.dumps(found_games,default=models.db_game.default_converter)
        game_dict = json.loads(game_json)
        game_size = models.db_game.get_game_count(condition)
        return jsonify({"games":game_dict,"gameLength":game_size})
    except Exception as e:
        return jsonify({"msg":str(e)}),400