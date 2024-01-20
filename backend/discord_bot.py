import asyncio
import discord
from discord import app_commands
from discord.ext import commands
import api_keys as keys
import Dcbot.bot_view as bot_view

 


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

    @bot.tree.command(name="makematch",description="Create your own match, and start to pick player")
    async def makematch(interaction: discord.Interaction):
        item_lists = [['League of Legends','Valorant','Apex Legends','Other'],
                      ['Rank', 'Normal'],
                      ['1','2','3','4'],
                      ]
        place_holder = ["GameName", "GameMode","Number of Player looking for"]
        description = ['Select game name', 'Select game mode',"Player you need"]
        await interaction.response.send_message(f'Hey {interaction.user.mention}! Thanks for using quick make match, Please select Game Name, Game Mode, Number of Player you looking for:', 
                                                view=bot_view.MatchView(item_lists,place_holder,description=description,botton_type="makematch"))


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
        

    bot.run(keys.discord_bot_token)

run_discord_bot()
