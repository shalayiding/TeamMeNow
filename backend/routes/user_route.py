from flask import request,jsonify,make_response,redirect,Blueprint
from config import * 
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from datetime import timedelta
import services
import models


user_bp = Blueprint('user_bp', __name__)

# get user detail information if the user is login or using discord bot
@user_bp.route('/user/me',methods=['GET'])
@jwt_required(locations=['cookies','headers'])
def finduser():
    current_user = get_jwt_identity()
    user = models.db_user.find_user_by_id(current_user['_id'])
    try :
        if user['loginStatus'] == "logedIn":
                    
            data = {"dc_id":user["dc_id"],
                    "dc_global_name":user["dc_global_name"],
                    "register_source":user["register_source"],
                    "dc_avatar_uri":user["dc_avatar_uri"],
                    "email":user["email"],
                    }
            return jsonify({"data":data}),200
        else:
            return jsonify({"msg":"Login before accesing your information"}),400
    except Exception as e:
        return jsonify({"msg":str(e)}),404

# post request for visitor send by frontend reactjs application
@user_bp.route('/user/visitor',methods=['POST'])
def visitor():
    data = request.json
    models.db_visitor.insert_visitor(data)
    visitor_count = models.db_visitor.get_visitor_count()
    user_count = models.db_user.get_user_count() + 8
    match_count = models.db_match.get_match_count({})
    payload = {
        "visitor_count":visitor_count,
        "user_count":user_count,
        "match_count":match_count,
        "bot_count":user_count,
    }
    
    return jsonify({"data":payload}),200


# extract user game information currently for lol
@user_bp.route('/user/game_info',methods=['POST'])
@jwt_required(locations=['cookies','headers'])
def game_info():
    data = request.json
    current_user = get_jwt_identity()
    user_id = current_user['_id'] 

    game_name = data.get('game_name')
    name = data.get('name')
    region = data.get('region')

    rank_instance = services.Rank()
    rank_response = rank_instance.get_summoner_rank_by_name(name, region)

    if 'data' in rank_response:
        rank_info = rank_response['data']
        rank = rank_info['rank']
        tier = rank_info['tier']
        point = rank_info['leaguePoints']
        puuid = rank_info['puuid']
        level = rank_info['level']
        modified_count = models.db_user.insert_game_info(user_id,game_name,name,level,tier,rank,point,puuid)
        
        if modified_count:
            return jsonify({"msg": "Game info updated successfully"}), 200
        else:
            return jsonify({"msg": "Failed to update game info"}), 500
    else:
        return jsonify({"msg": rank_response.get('msg', 'Failed to fetch rank info')}), 400


# get user rank information for the league of leagents
@user_bp.route('/user/rank', methods=['GET'])
def get_summoner_rank():
    summoner_name = request.args.get('name')
    region = request.args.get('region', default='NA1')

    rank = services.Rank()  
    rank_info = rank.get_summoner_rank_by_name(summoner_name, region)
    
    if rank_info:
        return jsonify(rank_info),200
    else:
        return jsonify({"error": "Unable to fetch summoner rank"}), 400



# log out the user and set the token to exipre
@user_bp.route('/user/logout',methods=['GET'])
@jwt_required(locations=['cookies'])
def logout():
    current_user = get_jwt_identity()
    user = models.db_user.find_user_by_id(current_user['_id'])
    if user['loginStatus'] == 'logedIn':
        models.db_user.set_user_logInOut(current_user['_id'],"logedOut")
        return jsonify({"msg":"You are loged out"}),200
    else:
        return jsonify({"msg":"login before logout"}),404
    



#oauth2 with to link/discord
@user_bp.route('/link/discord',methods=['GET'])
def linkDiscord():
    code = request.args.get('code')
    if code:
        discord_oauth = services.DCoauth()
        try :
            data = discord_oauth.exchange_code(str(code))
        except Exception as e:
            return jsonify({"msg":"Cannot Link you discord account, try to back to the home page and do it again"},401)
        
        
        if data['access_token']:
            user = discord_oauth.get_current_user(data['access_token'])
            
            if not user:
                return jsonify({"msg":"Didn't find your profile in linkedin"},404)
            
            try :
                found_user = models.db_user.check_user_exist(user['id'],user['email'])
                mongodb_id = ""
                if found_user == None:
                    mongodb_id = models.db_user.register_user(user['id'],
                                            user['global_name'],
                                            "web",
                                            f"https://cdn.discordapp.com/avatars/{user['id']}/{user['avatar']}",
                                            user['email'])
                
                expires = timedelta(hours=3)
                access_token = create_access_token(identity={"_id":found_user},expires_delta=expires)
                response = make_response(redirect(str(ALLOWED_ORIGINS)))
                models.db_user.set_user_logInOut(found_user,"logedIn")
                response.set_cookie("access_token_cookie", access_token, httponly=True)
                return response   
            except Exception as e:
                return jsonify({"msg":"Something went wrong while registerinig you"},401)  
             
        else:
            return jsonify({"msg":"No access token found "},404)
    else:
        return jsonify({"msg":"No code provided, discord linked faild"},404)




# # register new user and link to discord if user discord not none
# @user_bp.route('/user/register',methods=['POST'])
# def register_user():
#     data = request.json 
#     # get user info
#     user_id = data.get('id')
#     token = data.get('token')
#     avatar_uri = data.get('avatar_uri')
#     email = data.get('email')
#     global_name = data.get('global_name')
#     register_parts = (user_id and avatar_uri and global_name and email)
#     if register_parts and db_user.check_user_exist(user_id,email) == None:
#         register_type = "web"
#         if token == keys.discord_bot_token:
#             register_type = "bot"
#         try :
#             register_result = db_user.register_user(user_id,
#                                 global_name,
#                                 register_type,
#                                 avatar_uri,
#                                 email)
#             return jsonify({"Message":"You have register to the database"}),200
#         except Exception as e:
#             return jsonify({"Message":e}),400
#     else:
#         return jsonify({"Message":"Either user exist or are not able to register you"}),400      
    

        
    


    
    