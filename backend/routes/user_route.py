from flask import request,Flask,jsonify,session,redirect, url_for,Blueprint
from services.discord_oauth2 import DCoauth
from models.match import DB_Matchs
from models.users import DB_Users
import backend.config as keys


# setting blueprint and mongodb properties
user_bp = Blueprint('user_bp', __name__)
db_match = DB_Matchs(keys.mongodb_link,"Matchs","game")
db_user = DB_Users(keys.mongodb_link,'Discord_Users','Basic_Information')



# get user detail information if the user is login or using discord bot
@user_bp.route('/user',methods=['GET'])
def finduser():
    user_id = request.args.get('id')
    token = request.args.get('token')
    if token and token == keys.discord_bot_token:
        return {"data":'testing user data'},200
    
    if user_id and ('user_id') in session and (user_id == session['user_id']):
        return jsonify(session.get('user_info')),200
    else:
        return "You have not linked your Discord Account",400


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


    
    