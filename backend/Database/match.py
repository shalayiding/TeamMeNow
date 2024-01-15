# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime,timedelta
import sys
sys.path.append('D:\\mygithub\\TeamMeUp\\backend')
import api_keys as keys

class DB_Matchs:
    def __init__(self,db_url,db_name,collection_name) -> None:
        self.clint = MongoClient(db_url,server_api = ServerApi('1'))
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]

    
    #change the existing db and collection 
    def switch_db_collection(self,db_name,collection_name):
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]
        
        
    #insert the match into the specific game 
    def insert_match(self,host_name,host_id,game_name,game_mode,max_player,current_player,description):  
        if game_name not in self.db.list_collection_names():
            print("Current game is not supported by us")
        else:    
            self.collection = self.db[game_name]
            timestamp = datetime.now().strftime("%Y/%m/%d/%H:%M:%S")
            try :
                query = {'host_name':host_name,
                        'host_id':host_id,
                        'game_name':game_name,
                        'mode':game_mode,
                        'max_player':max_player,
                        'current_player':current_player,
                        'description':description,
                        'create_time' : timestamp}
                self.collection.insert_one(query)
            except Exception as e :
                print(f"An error occurred: {e}")
                
    def list_all_available_match_with_condition(self,game_name, game_mode=None, use_both_filters=False):       
        if game_name not in self.db.list_collection_names():
            print("Current game is not supported by us")
            return None
        else:
            self.collection = self.db[game_name]
            query = {"$expr": {"$lt": ["$current_player", "$max_player"]}}
            if use_both_filters and game_mode:
                query['game_name'] = game_name
                query['mode'] = game_mode
            elif game_mode:
                query['mode'] = game_mode
            elif game_name:
                query['game_name'] = game_name
            try:
                # Find and return the available matches
                available_matches = self.collection.find(query)
                return available_matches
            except Exception as e:
                print(f"An error occurred while fetching available matches: {e}")
                return None
       
            
    def list_all_available_match(self,maxoutput):
        list_of_matchs = []
        total_added = 0
        for game in self.db.list_collection_names():
            self.collection = self.db[game]
            query = {
            "current_person": {"$lt": "$max_person"},
            "create_time": {"$gt": (datetime.now() - timedelta(hours=24)).strftime("%Y/%m/%d %H:%M:%S")}
            }
            matches = self.collection.find(query)
            
            for m in matches:
                if total_added < maxoutput:
                    list_of_matchs.append(m)
                    total_added += 1
                else:
                    break
            if total_added >= maxoutput:
                break
        return list_of_matchs





