from flask import request,Flask,jsonify,session,redirect, url_for,Blueprint
from services.discord_oauth2 import DCoauth
from models.match import DB_Matchs
from models.users import DB_Users
import config as keys


# setting blueprint and mongodb properties
user_bp = Blueprint('user_bp', __name__)
db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Discord_Users','Basic_Information')



# get user detail information if the user is login or using discord bot
@user_bp.route('/user/me',methods=['GET'])
def finduser():
    
    user_id = request.args.get('id')
    token = request.args.get('token')
    
    #bot access 
    if token and token == keys.discord_bot_token and user_id:
        return jsonify({"data":db_user.check_user_exist(user_id)}),200
    
    # web access 
    elif user_id and ('user_id') in session and (user_id == session['user_id']):
        return jsonify({"data":db_user.check_user_exist(user_id)}),200
   
    else:
        return jsonify({"message":"Something wet worng can't find data"}),400



# @user_bp.route('/user/register',methods='POST')
# def register():
#     # get user info
#     user_id = request.args.get('id')
#     token = request.args.get('token')
#     avatar_uri = request.args.get('avatar_uri')
#     email = request.args.get('email')
#     # check if the session is valid or not
#     valid_user_session = ( ('user_id') in session and user_id and (user_id == session['user_id']))
#     if valid_user_session and db_user.check_user_exist(user_id) == None:
#         register_result = db_
        
    
#     valid_user_bot = (token and user_id and token == keys.discord_bot_token)
    
        
    
#oauth2 with to link/discord
@user_bp.route('/link/discord',methods=['GET'])
def register():
    code = request.args.get('code')
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
            return redirect(url_for('home'))
        else:
            return "No access token found ",400
    else:
        return 'No code provided, discord linked faild', 400


    
    