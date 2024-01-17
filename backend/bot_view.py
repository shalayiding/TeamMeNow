import asyncio
import discord
from discord import app_commands
from discord.ext import commands
import api_keys as keys


class MatchSelect(discord.ui.Select):
    def __init__(self, items, place_holder,description):
        options = [discord.SelectOption(label=item) for item in items]
        super().__init__(placeholder=place_holder, min_values=1, max_values=1, options=options)

    async def callback(self, interaction: discord.Interaction):
        await interaction.response.defer()

class SubmitButton(discord.ui.Button):
    def __init__(self, label: str, style: discord.ButtonStyle):
        super().__init__(label=label, style=style)

    async def callback(self, interaction: discord.Interaction):
        view: MatchView = self.view
        selected_options = [select_menu.values[0] for select_menu in view.select_menus]
        for select_menu in view.select_menus:
            select_menu.disabled = True
        self.disabled = True
        await interaction.response.edit_message(view=view)
        await interaction.followup.send(f'You submitted: {", ".join(selected_options)}')

class MatchView(discord.ui.View):
    def __init__(self, item_lists,place_holder,description):
        super().__init__()
        self.select_menus = []
        for index in range(0,len(item_lists)):
            self.select_menus.append(MatchSelect(item_lists[index],
                                                 place_holder[index],description[index]))
        
        for select_menu in self.select_menus:
            self.add_item(select_menu)
        self.add_item(SubmitButton("Create", discord.ButtonStyle.green))