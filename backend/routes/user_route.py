from flask import request,Flask,jsonify,session,redirect, url_for,Blueprint
from services.discord_oauth2 import DCoauth
from models.match import DB_Matchs
from models.users import DB_Users
import config as keys


# setting blueprint and mongodb properties
user_bp = Blueprint('user_bp', __name__)
db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Matchs','user')



# get user detail information if the user is login or using discord bot
@user_bp.route('/user/me',methods=['GET'])
def finduser():
    
    user_id = request.args.get('id')
    token = request.args.get('token')
    #bot access 
    if token and token == keys.discord_bot_token and user_id:
        return jsonify({"data":db_user.check_user_exist(user_id)}),200
    
    # web access 
    elif ('user_id') in session:
        print(session['user_info'])
        return jsonify({"data":db_user.check_user_exist(session['user_id'])}),200
    
    else:
        return jsonify({"message":"Something wet worng can't find data"}),400



@user_bp.route('/user/register',methods=['POST'])
def register_user():
    data = request.json 
    # get user info
    user_id = data.get('id')
    token = data.get('token')
    avatar_uri = data.get('avatar_uri')
    email = data.get('email')
    global_name = data.get('global_name')
    # check if the session is valid or not
    valid_user_session = ( ('user_id') in session and session['user_id'])
    register_parts = (user_id and avatar_uri and global_name)
    if valid_user_session and db_user.check_user_exist(session['user_info']['id']) == None:
        
        try :
            register_result = db_user.register_user(session['user_info']['id'],
                                                session['user_info']['global_name'],
                                                "web",
                                                f"https://cdn.discordapp.com/avatars/{session['user_info']['id']}/{session['user_info']['avatar']}",
                                                session['user_info']['email'])
            return jsonify({"result":register_result}),200
        except Exception as e:
            return jsonify({"message":e}),400
    elif token and token == keys.discord_bot_token and register_parts:
        register_result = db_user.register_user(user_id,global_name,"bot",avatar_uri,email)
        return jsonify({"result":register_result}),200
    else:
        return jsonify({"Messages":"Either user exist or are not able to insert"}),400
    
    
    
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


    
    