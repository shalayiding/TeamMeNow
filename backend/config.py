from dotenv import load_dotenv
import os
# load env var 
load_dotenv()
MONGODB_LINK = os.getenv('MONGODB_LINK')
MONGODB_DATABASE_NAME = os.getenv('MONGODB_DATABASE_NAME')



DISCORD_CLIENT_SECRET = os.getenv('DISCORD_CLIENT_SECRET')
DISCORD_CLIENT_ID = os.getenv('DISCORD_CLIENT_ID')
DISCORD_API_ENDPOINT = os.getenv('DISCORD_API_ENDPOINT')
DISCORD_REDIRECT_URL = os.getenv('DISCORD_REDIRECT_URL')
DISCORD_BOT_TOKEN = os.getenv('DISCORD_BOT_TOKEN')



FLASK_SECRET_KEY = os.getenv("FLASK_SECRET_KEY")
RIOT_API_KEY = os.getenv("RIOT_API_KEY")

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS")

