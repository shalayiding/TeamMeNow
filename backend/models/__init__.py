# config for database
from models.match import DB_Matchs
from models.users import DB_Users
from models.visitor import DB_Visitor
from models.game import DB_Games
from config import *

db_match = DB_Matchs(MONGODB_LINK,MONGODB_DATABASE_NAME,"match")
db_user = DB_Users(MONGODB_LINK,MONGODB_DATABASE_NAME,"user")
db_visitor = DB_Visitor(MONGODB_LINK,MONGODB_DATABASE_NAME,"visitor")
db_game = DB_Games(MONGODB_LINK,MONGODB_DATABASE_NAME,"game")
