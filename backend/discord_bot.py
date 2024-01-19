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

    @bot.tree.command(name="makematch")
    async def makematch(interaction: discord.Interaction):
        item_lists = [['League of Legends','Valorant','Minecraft','Apex Legends'],
                      ['Rank', 'Normal'],
                      ['1','2','3','4'],
                      ]
        place_holder = ["GameName", "GameMode", "Looking For"]
        description = ['Select game name', 'Select game mode', 'How many player are you looking for' ]
        await interaction.response.send_message(f'Hey {interaction.user.mention}! Please select Game Name, Game Mode, Number of Player you looking for:', 
                                                view=bot_view.MatchView(item_lists,place_holder,description=description))

    bot.run(keys.discord_bot_token)

run_discord_bot()
