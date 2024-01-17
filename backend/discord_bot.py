import asyncio
import discord
from discord import app_commands
from discord.ext import commands
import api_keys as keys

game_list = ['League of Legends'
]



def run_discord_bot():
    bot = commands.Bot(command_prefix="ms!", intents=discord.Intents.all())
    @bot.event
    async def on_ready():
        print("discord bot is ready!")
        try:
            synced = await bot.tree.sync()  # Sync commands with Discord API
            print(f'Synced {len(synced)} commands')
        except Exception as e:
            print(e)
            
    #match creation
    @bot.tree.command(name="makematch")
    @discord.app_commands.choices(match_name=[
    discord.app_commands.Choice(name='League of Legends', value='League of Legends'),
    discord.app_commands.Choice(name='VALORANT', value='Valorant'),
    discord.app_commands.Choice(name='Apex Legends', value='Apex Legends')
])
    async def makematch(interaction: discord.Interaction,match_name:str):
        await interaction.response.send_message(f'Hey {interaction.user.mention}! your id is :{interaction.user.id} This is the game : {match_name}')
    
    
    
    
    bot.run(keys.discord_bot_token)    
            
run_discord_bot()         

