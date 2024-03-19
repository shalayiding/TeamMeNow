# handle different mongodb event  
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId


# This class is for inserting different game alon with it's information for create tag or search tag
class DB_Games:
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
    
    
        
    #insert game along with it's information 
    def insert_game(self,game_name,game_mode):
        """ insert game data in to the database
        Args:
            game_name (_string_)
            game_mode (_list_)
        """
        try :
            data = {'game_name':game_name,
                    'game_mode':game_mode
                    }
            self.collection.insert_one(data)
        except Exception as e :
            print(f"An error occurred: {e}")
                
    # find game detail base on the condition
    def find_game(self,condition,limit):
        """find game data from the data base on condition

        Args:
            condition (_json_): filter query for mongodb 

        Returns:
            _type_: None or return bson collection of the game found on the condition
        """
        try:
            # Find and return the available matches
            games = self.collection.find(condition).limit(limit)
            return games
        except Exception as e:
            print(f"An error occurred while fetching available matches: {e}")
            return None
    

    def get_game_count(self,query):
        return self.collection.count_documents(query)

    def find_match_with_id(self,id):
        object_id = ObjectId(id)
        return self.collection.find_one({"_id":object_id})

    def default_converter(self,obId):
        if isinstance(obId, ObjectId):
            return str(obId)  
        return obId.__dict__
    
    def get_cover_with_name(self,gamename):
        try :
            game = self.collection.find_one({"game_name":gamename})
            if game: 
                return game.get('cover_url')
            else :
                return None
        except Exception as e:
            print(f"An error occurred while getting the cover of the game using gamename: {e}")
            return None