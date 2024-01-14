from dotenv import load_dotenv
import os

load_dotenv()
discord_client_secret = os.getenv('discord_client_secret')
discord_client_id = os.getenv('discord_client_id')
discord_API_ENDPOINT = os.getenv('discord_API_ENDPOINT')
discord_redirect_url = os.getenv('discord_redirect_url')
mongodb_link = os.getenv('mongodb_link')

