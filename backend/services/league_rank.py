import requests
import config as apikey

class Rank:
    def __init__(self):
        self.RIOT_API_KEY =apikey.riot_api_key
        self.CLIENT_ID = apikey.discord_client_id 
        self.BASE_URL = "https://na1.api.riotgames.com/lol/" #NA1 can be changed
    
    def get_summoner_rank_by_name(self, summoner_name, region):
        url = f"https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
        headers = {"X-Riot-Token": self.RIOT_API_KEY}
        response = requests.get(url, headers=headers)
        summoner_info = response.json()
        summoner_id = summoner_info['id']
        url = f"https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
        headers = {"X-Riot-Token": self.RIOT_API_KEY}
        response = requests.get(url, headers=headers)
        data = response.json()
        if data:
            rank_info = {
                'tier': data[0].get('tier', 'N/A'),  
                'rank': data[0].get('rank', 'N/A'), 
                'leaguePoints': data[0].get('leaguePoints', 0) 
            }
            return rank_info
        else:
            return "No rank data found for the summoner."

        
# test purpose

# if __name__ == "__main__":
#     rank = Rank()
#     riot_api_key =rank.RIOT_API_KEY
#     summoner_name = "OLOUQAQ"  
#     region = "na1" 
#     rank_info = rank.get_summoner_rank_by_name(summoner_name, region)
#     print(rank_info)