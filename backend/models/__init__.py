# config for database
from models.match import DB_Matchs
from models.users import DB_Users
from models.visitor import DB_Visitor
from models.game import DB_Games
from config import *

db_match = DB_Matchs(mongodb_link,mongodb_database_name,"match")
db_user = DB_Users(mongodb_link,mongodb_database_name,"user")
db_visitor = DB_Visitor(mongodb_link,mongodb_database_name,"visitor")
db_game = DB_Games(mongodb_link,mongodb_database_name,"game")
