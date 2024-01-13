from flask import request,Flask,jsonify
from discord_oauth2 import DCoauth
import requests
app = Flask(__name__)

@app.route("/")
def welcome_page():
    return "<p>Hello, World!</p>"




@app.route('/link/discord',methods=['GET'])
def register():
    code = request.args.get('code')
    print(code)
    if code:
        # https://discord.com/api/oauth2/authorize?client_id=1195266447006502942&response_type=code&redirect_uri=http%3A%2F%2Fec2-18-216-31-58.us-east-2.compute.amazonaws.com%2Flink%2Fdiscord&scope=identify
        discord_oauth = DCoauth()
        data = discord_oauth.exchange_code(str(code))

        user = discord_oauth.get_current_user(data['access_token'])
        print(user)
        
        return user
        # return f'Code received: {code}'
    else:
        return 'No code provided, discord linked faild', 400





if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)
    


