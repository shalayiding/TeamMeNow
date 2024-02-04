from flask import request,Flask,jsonify,session,redirect, url_for,Blueprint,make_response
from services.discord_oauth2 import DCoauth
from models.match import DB_Matchs
from models.users import DB_Users
from models.visitor import DB_Visitor
import config as keys
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from datetime import timedelta
from bson.objectid import ObjectId
from services.league_rank import Rank


# setting blueprint and mongodb properties
user_bp = Blueprint('user_bp', __name__)
db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Matchs','user')
db_visitor = DB_Visitor(keys.mongodb_link,'Matchs','visitor')

# get user detail information if the user is login or using discord bot
@user_bp.route('/user/me',methods=['GET'])
@jwt_required(locations=['cookies','headers'])
def finduser():
    current_user = get_jwt_identity()
    user = db_user.find_user_by_id(current_user['_id'])
    try :
        if user['loginStatus'] == "logedIn":
                    
            data = {"dc_id":user["dc_id"],
                    "dc_global_name":user["dc_global_name"],
                    "register_source":user["register_source"],
                    "dc_avatar_uri":user["dc_avatar_uri"],
                    "email":user["email"],
                    }
            return jsonify({"data":data})
        else:
            return jsonify({"msg":"Login before accesing your information"})
    except Exception as e:
        return jsonify({"msg":str(e)})


@user_bp.route('/user/visitor',methods=['POST'])
def visitor():
    data = request.json
    db_visitor.insert_visitor(data)
    visitor_count = db_visitor.get_visitor_count()
    user_count = db_user.get_user_count() + 8
    match_count = db_match.get_match_count()
    payload = {
        "visitor_count":visitor_count,
        "user_count":user_count,
        "match_count":match_count,
        "bot_count":user_count,
    }
    
    return jsonify({"data":payload})


@user_bp.route('/user/logout',methods=['GET'])
@jwt_required(locations=['cookies'])
def logout():
    current_user = get_jwt_identity()
    user = db_user.find_user_by_id(current_user['_id'])
    if user['loginStatus'] == 'logedIn':
        db_user.set_user_logInOut(current_user['_id'],"logedOut")
        return jsonify({"msg":"You are loged out"})
    else:
        return jsonify({"msg":"login before logout"})
    
    
@user_bp.route('/user/rank', methods=['GET'])
def get_summoner_rank():
    summoner_name = request.args.get('name')
    region = request.args.get('region', default='NA1')

    rank = Rank()  
    rank_info = rank.get_summoner_rank_by_name(summoner_name, region)
    
    if rank_info:
        return jsonify(rank_info)
    else:
        return jsonify({"error": "Unable to fetch summoner rank"}), 400

    
    
# @user_bp.route('/user/login',methods=['GET'])




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
    

        
    
#oauth2 with to link/discord
@user_bp.route('/link/discord',methods=['GET'])
def linkDiscord():
    code = request.args.get('code')
    if code:
        discord_oauth = DCoauth()
        try :
            data = discord_oauth.exchange_code(str(code))
        except Exception as e:
            return jsonify({"msg":"Cannot Link you discord account, try to back to the home page and do it again"},401)
        
        
        if data['access_token']:
            user = discord_oauth.get_current_user(data['access_token'])
            
            if not user:
                return jsonify({"msg":"Didn't find your profile in linkedin"},404)
            
            try :
                found_user = db_user.check_user_exist(user['id'],user['email'])
                mongodb_id = ""
                if found_user == None:
                    mongodb_id = db_user.register_user(user['id'],
                                            user['global_name'],
                                            "web",
                                            f"https://cdn.discordapp.com/avatars/{user['id']}/{user['avatar']}",
                                            user['email'])
                
                expires = timedelta(hours=3)
                access_token = create_access_token(identity={"_id":found_user},expires_delta=expires)
                response = make_response(redirect("http://localhost:3000/"))
                db_user.set_user_logInOut(found_user,"logedIn")
                response.set_cookie("access_token_cookie", access_token, httponly=True)
                return response   
            except Exception as e:
                return jsonify({"msg":"Something went wrong while registerinig you"},401)  
             
        else:
            return jsonify({"msg":"No access token found "},404)
    else:
        return jsonify({"msg":"No code provided, discord linked faild"},404)


    
    