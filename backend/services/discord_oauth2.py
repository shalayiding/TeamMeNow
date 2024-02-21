import requests
import config as apikey

class DCoauth:
    def __init__(self):
        self.API_ENDPOINT =apikey.DISCORD_API_ENDPOINT 
        self.CLIENT_ID = apikey.DISCORD_CLIENT_ID 
        self.CLIENT_SECRET = apikey.DISCORD_CLIENT_SECRET
        self.REDIRECT_URI = apikey.DISCORD_REDIRECT_URL 

    # exchange the code using oauth2 token to access token 
    def exchange_code(self,code):
        data = {
            'client_id': self.CLIENT_ID,
            'client_secret': self.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': self.REDIRECT_URI
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        r = requests.post(f'{self.API_ENDPOINT}/oauth2/token', data=data, headers=headers)
        r.raise_for_status()
        return r.json()
  
    def refresh_token(self,refresh_token):
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        r = requests.post('%s/oauth2/token' % self.API_ENDPOINT, data=data, headers=headers, auth=(self.CLIENT_ID, self.CLIENT_SECRET))
        r.raise_for_status()
        return r.json()
    
    def revoke_access_token(self,access_token):
        data = {
            'token': access_token,
            'token_type_hint': 'access_token'
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        requests.post('%s/oauth2/token/revoke' % self.API_ENDPOINT, data=data, headers=headers, auth=(self.CLIENT_ID, self.CLIENT_SECRET))
  
    
    # get the current user using the access code 
    def get_current_user(self,access_token):
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        r = requests.get(f'https://discord.com/api/v10/users/@me', headers=headers)
        
        r.raise_for_status()
        return r.json()
  
  