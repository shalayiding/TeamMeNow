import discord
from discord import app_commands
from discord.ext import commands
import config as keys

from datetime import datetime,timedelta
import aiohttp

def run_discord_bot():
    bot = commands.Bot(command_prefix="ms!", intents=discord.Intents.all())

    @bot.event
    async def on_ready():
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
        discord_link="Your discord server link for people to join"
    )
    async def makematch(interaction: discord.Interaction, game_name: str, game_mode: str, open_spot: int, discord_link: str):
        user = interaction.user
        data = {
            'host_name':user.name,
            'host_id':user.id,
            'game_name':game_name,
            'game_mode':game_mode,
            "player_count":open_spot,
            'description':f"Quick Make Match using Discord Bot, {user.name} is looking for {open_spot} player in {game_name} in {game_mode} mode" ,
            'avatar_uri':f"{user.avatar}",
            'expire_time':4*3600,
            'discord_join_link':discord_link,
            }
        async with aiohttp.ClientSession() as session:
            async with session.post(f'{keys.BACKEND_API_URL}/v1/matchs', json=data) as api_response:
                if api_response.status == 200:
                    await interaction.response.send_message(
                        f'Match Details:\n'
                        f'Game: {game_name}\n'
                        f'Mode: {game_mode}\n'
                        f'Looking for: {open_spot}\n'
                        f'Discord server link: {discord_link}'
                    )
                    
                else:
                    api_response_text = await api_response.text()
                    await interaction.response.send_message(f"Failed to Create Match. Status code: {api_response.status}. Response: {api_response_text}")
        

    # find quick match using discord bot
    @bot.tree.command(name="findmatch",description="Find the match other people create,and join other party")
    @app_commands.describe(
        game_name="Choose a game")
    async def findmatch(interaction:discord.Interaction,game_name: str):
        user = interaction.user
        params = {
            'limit':3,
        }   
        async with aiohttp.ClientSession() as session:   
            async with session.get(f'{keys.BACKEND_API_URL}/v1/matchs', params=params) as api_response:
                if api_response.status == 200:
                    response_data = await api_response.json()
                    matches = response_data.get('matches', [])
                    if not matches:
                        await interaction.response.send_message("No matches found.")
                        return
                    match_messages = []
                    for match in matches:
                        match_message = (
                            f"**Game:** {match['game_name']}\n"
                            f"**Mode:** {match['game_mode']}\n"
                            f"**Description:** {match.get('description', 'No description')}\n"
                            f"**Looking For:** {match.get('player_count', 'Unknown')}\n"
                            f"**Join Link:** {match.get('discord_join_link', 'No link available')}\n"
                            f"**Created At:** {match['create_time']}\n"
                            "--------------------------------------"
                        )
                        match_messages.append(match_message)
                    
                    full_message = "\n".join(match_messages)
                    await interaction.response.send_message(full_message)
                else:
                    error_message = await api_response.text()
                    await interaction.response.send_message(f"Error: {api_response.status} - {error_message}")         
                
    bot.run(str(keys.discord_bot_token))

run_discord_bot()
