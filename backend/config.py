from dotenv import load_dotenv
import os

load_dotenv()
discord_client_secret = os.getenv('discord_client_secret')
discord_client_id = os.getenv('discord_client_id')
discord_API_ENDPOINT = os.getenv('discord_API_ENDPOINT')
discord_redirect_url = os.getenv('discord_redirect_url')
mongodb_link = os.getenv('mongodb_link')
discord_bot_token = os.getenv('discord_bot_token')
flask_secret_key = os.getenv("flask_secret_key")
riot_api_key = os.getenv("riot_api_key")
