# config for database
from models.match import DB_Matchs
from models.users import DB_Users
from models.visitor import DB_Visitor
from models.game import DB_Games
from config import *

db_match = DB_Matchs(mongodb_link,"Matchs","game")
db_user = DB_Users(mongodb_link,'Matchs','user')
db_visitor = DB_Visitor(mongodb_link,'Matchs','visitor')
# db_game = DB_Games(mongodb_link,"Matchs","game")
