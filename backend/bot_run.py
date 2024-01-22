import asyncio
import discord
from discord import app_commands
from discord.ext import commands
import backend.config as keys
import services.bot_view as bot_view
from datetime import datetime,timedelta
import aiohttp

def run_discord_bot():
    bot = commands.Bot(command_prefix="ms!", intents=discord.Intents.all())

    @bot.event
    async def on_ready():
        print("discord bot is ready!")
        try:
            synced = await bot.tree.sync()
            print(f'Synced {len(synced)} commands')
        except Exception as e:
            print(e)

    @bot.tree.command(name="makematch", description="Create your own match, and start to pick player")
    @app_commands.describe(
        game_name="Choose a game",
        game_mode="Specify the game mode",
        open_spot="Enter the number of players you're looking for",
        description="Describe who you need, and other information"
    )
    @app_commands.choices(game_name=[
        app_commands.Choice(name="League of Legends", value="League of Legends"),
        app_commands.Choice(name="Valorant", value="Valorant"),
        app_commands.Choice(name="Apex Legends", value="Apex Legends"),
        app_commands.Choice(name="Other", value="Other")
    ])
    async def makematch(interaction: discord.Interaction, game_name: str, game_mode: str, open_spot: int, description: str):
        timestamp = datetime.now().strftime("%Y/%m/%d/%H:%M:%S")
        user = interaction.user
        data = {
            'host_name':user.name,
            'host_id':user.id,
            'game_name':game_name,
            'game_mode':game_mode,
            'max_player':5,
            'current_player':2,
            "player_count":open_spot,
            'description':description ,
            'avatar_uri':f"{user.avatar}",
            'expire_time':4*3600,
            'create_time' : timestamp
            }
        async with aiohttp.ClientSession() as session:
            async with session.post('http://localhost:80/v1/matchs', json=data) as api_response:
                if api_response.status == 200:
                    await interaction.response.send_message(
                        f'Match Details:\n'
                        f'Game: {data.get("game_name")}\n'
                        f'Mode: {data.get("game_mode")}\n'
                        f'Looking for: {data.get("player_count")}\n'
                        f'Time: {data.get("create_time")}'
                    )
                    
                else:
                    api_response_text = await api_response.text()
                    await interaction.response.send_message(f"Failed to send data. Status code: {api_response.status}. Response: {api_response_text}")
        

    # find quick match using discord bot
    @bot.tree.command(name="findmatch",description="Find the match other people create,and join other party")
    async def findmatch(interaction:discord.Interaction):
        item_list = [['League of Legends','Valorant','Apex Legends','Other'],
                      ['Rank', 'Normal']
                      ]
        place_holder = ["GameName", "GameMode"]
        description = ['Select game name', 'Select game mode' ]    
        await interaction.response.send_message(f'Hey {interaction.user.mention}! Thanks for using quick find match, Please select Game Name, Game Mode, and Your Team size :',
                                                view=bot_view.MatchView(item_list,place_holder,description=description,botton_type="findmatch"))
        
    bot.run(str(keys.discord_bot_token))

run_discord_bot()
