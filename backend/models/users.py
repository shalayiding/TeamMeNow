# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime,timedelta


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
        query = {'id':discord_id}
        return self.collection.find_one(query) is not None
           