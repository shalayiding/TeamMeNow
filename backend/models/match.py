# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime,timedelta
from bson import ObjectId


# all the operation related to the match will be here 
class DB_Matchs:
    def __init__(self,db_url,db_name,collection_name) -> None:
        self.clint = MongoClient(db_url,server_api = ServerApi('1'))
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]

    
    #change the existing db and collection 
    def switch_db_collection(self,db_name,collection_name):
        if db_name is not None:
            self.db = self.client[db_name]
            
        if collection_name is not None:
            self.collection = self.db[collection_name]
    
    
        
    #insert the match into the specific game 
    def insert_match(self,host_name,host_id,game_name,game_mode,player_count,description,avatar_uri,expire_time,discord_join_link):  
       
        timestamp = datetime.now().strftime("%Y/%m/%d/%H:%M:%S")
        try :
            data = {'host_name':host_name,
                    'host_id':host_id,
                    'game_name':game_name,
                    'game_mode':game_mode,
                    "player_count":player_count,
                    'description':description,
                    'avatar_uri':avatar_uri,
                    'expire_time':expire_time,
                    'create_time' : timestamp,
                    'discord_join_link':discord_join_link}
            self.collection.insert_one(data)
        except Exception as e :
            print(f"An error occurred: {e}")
                
    # find match base on the condition
    def find_match(self,condition,offset,limit):
        try:
            # Find and return the available matches
            available_matchs = self.collection.find(condition)
            return available_matchs.skip(offset).limit(limit)
        except Exception as e:
            print(f"An error occurred while fetching available matches: {e}")
            return None
    
    #return list of the aviable game collection
    def list_all_supported_game(self):
        return self.db.list_collection_names();


    def get_match_count(self,query):
        return self.collection.count_documents(query)

    def find_match_with_id(self,id):
        object_id = ObjectId(id)
        return self.collection.find_one({"_id":object_id})

    def default_converter(self,obId):
        if isinstance(obId, ObjectId):
            return str(obId)  
        return obId.__dict__
