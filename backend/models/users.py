# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime,timedelta
from bson import json_util 

# all the user class operation will be here 
class DB_Users:
    def __init__(self,db_url,db_name,collection_name) -> None:
        self.clint = MongoClient(db_url,server_api = ServerApi('1'))
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]

    
    #change the existing db and collection 
    def switch_db_collection(self,db_name,collection_name):
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]
    
    def check_user_exist(self,discord_id):
        query = {'dc_id':discord_id}
    
        return json_util.dumps(self.collection.find_one(query))
     
    def register_user(self,discord_id,global_name,source,avatar_uri,email=""):
        data = {"dc_id":discord_id,
                "dc_global_name":global_name,
                "register_source":source,
                "dc_avatar_uri":avatar_uri,
                "dc_email":email}
        try:
            self.collection.insert_one(data)
            return True
        except Exception as e:
            print(e)
            return False            