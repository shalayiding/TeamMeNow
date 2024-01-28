# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime,timedelta
from bson.objectid import ObjectId

# all the user class operation will be here 
class DB_Visitor:
    def __init__(self,db_url,db_name,collection_name) -> None:
        self.clint = MongoClient(db_url,server_api = ServerApi('1'))
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]

    
    #change the existing db and collection 
    def switch_db_collection(self,db_name,collection_name):
        self.db = self.clint[db_name]
        self.collection = self.db[collection_name]
        
    
    def get_visitor_count(self):
        return self.collection.count_documents({})

    def insert_visitor(self,visitor_data):
        try : 
            self.collection.insert_one(visitor_data)
            return True
        except Exception as e:
            print("db err",e)
            return False
    