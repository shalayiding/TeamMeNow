import asyncio
from typing import Any
import discord
from discord import app_commands
from discord.ext import commands
from discord.interactions import Interaction
import api_keys as keys
from datetime import datetime,timedelta
import requests
import aiohttp


class MatchSelect(discord.ui.Select):
    def __init__(self, items, place_holder,description):
        options = [discord.SelectOption(label=item) for item in items]
        super().__init__(placeholder=place_holder, min_values=1, max_values=1, options=options)

    async def callback(self, interaction: discord.Interaction):
        await interaction.response.defer()


class FindButton(discord.ui.Button):
    def __init__(self,label:str,style:discord.ButtonStyle):
        super().__init__(label=label,style=style)
        
    async def callback(self, interaction: Interaction) -> Any:
        view:MatchView = self.view
         # Check if all select menus have a selected value
        if not all(len(select_menu.values) > 0 for select_menu in view.select_menus):
            await interaction.response.send_message('Please make sure you have selected an option in all menus.')
            return
        selected_options = [select_menu.values[0] for select_menu in view.select_menus]
        user = interaction.user
        async with aiohttp.ClientSession() as session:
            async with session.get(f'http://localhost:80/v1/matchs?gamename={selected_options[0]}&gamemode={selected_options[1]}') as api_response:
                
                if api_response.status == 200:
                    data = await api_response.json()
                    print("Successfully recived the data.")
                    for select_menu in view.select_menus:
                        select_menu.disabled = True
                    self.disabled = True
                    await interaction.response.edit_message(view=view)
                    print(data["matches"][0])
                    await interaction.followup.send("here is your data \n")


class JoinButton(discord.ui.Button):
    def __init__(self, label: str, style: discord.ButtonStyle):
        super().__init__(label=label, style=style)

    async def callback(self, interaction: discord.Interaction):
        view: MatchView = self.view

        # Check if all select menus have a selected value
        if not all(len(select_menu.values) > 0 for select_menu in view.select_menus):
            await interaction.response.send_message('Please make sure you have selected an option in all menus.')
            return

        timestamp = datetime.now().strftime("%Y/%m/%d/%H:%M:%S")
        selected_options = [select_menu.values[0] for select_menu in view.select_menus]
        user = interaction.user
        data = {
            'host_name':user.name,
            'host_id':user.id,
            'game_name':selected_options[0],
            'game_mode':selected_options[1],
            'max_player':"unknow",
            'current_player':"unknow",
            "player_count":selected_options[2],
            'description':f"Quick Make Match using Discord Bot, {user.name} is looking for {selected_options[2]} player in {selected_options[0]} in {selected_options[1]} mode" ,
            'avatar_uri':f"{user.avatar}",
            'expire_time':4*3600,
            'create_time' : timestamp
            }
        print(data)
        
        
        async with aiohttp.ClientSession() as session:
            async with session.post('http://localhost:80/v1/matchs', json=data) as api_response:
                if api_response.status == 200:
                    print("Successfully sent the data.")
                    for select_menu in view.select_menus:
                        select_menu.disabled = True
                    self.disabled = True
                    await interaction.response.edit_message(view=view)
                    await interaction.followup.send(
                        f'Match Details:\n'
                        f'Game: {data.get("game_name")}\n'
                        f'Mode: {data.get("game_mode")}\n'
                        f'Looking for: {data.get("player_count")}\n'
                        f'Time: {data.get("create_time")}'
                    )
                    
                else:
                    api_response_text = await api_response.text()
                    await interaction.response.send_message(f"Failed to send data. Status code: {api_response.status}. Response: {api_response_text}")
        
        
        # await interaction.followup.send(f'You submitted: {", ".join(selected_options)} , you id = {user.id}')
        # await interaction.followup.send(f"{data}")


class MatchView(discord.ui.View):
    def __init__(self, item_lists,place_holder,description,botton_type):
        super().__init__()
        self.select_menus = []
        for index in range(0,len(item_lists)):
            self.select_menus.append(MatchSelect(item_lists[index],
                                                 place_holder[index],description[index]))
        for select_menu in self.select_menus:
            self.add_item(select_menu)
        if botton_type == "findmatch":
            self.add_item(FindButton("Find",discord.ButtonStyle.green))
        else:
            self.add_item(JoinButton("Create", discord.ButtonStyle.blurple))