from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_marshmallow import Marshmallow

app = Flask(__name__)

db = SQLAlchemy()
ma = Marshmallow()

mysql = MySQL(app)

class User(db.Model):
  id = db.Column(db.String(100), primary_key=True, nullable=False)
  cart = db.Column(db.JSON)

  def __init__(self, id, cart):
    self.id = id
    self.cart = json.dumps(cart)

class UserSchema(ma.Schema):
  class Meta:
    fields = ("id", "cart")


user_schema = UserSchema()

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost/granfirestore"
db.init_app(app)
with app.app_context():
  db.create_all()

@app.route("/user/<id>", methods=["GET"])
def userLogin(id):
  user = User.query.get(id)
  if user:
    data = user_schema.dump(user)
    data["cart"] = json.loads(data["cart"])
    return jsonify(data)
  
  newUser = User(id=id, cart=[])
  db.session.add(newUser)
  db.session.commit()
  data = user_schema.dump(newUser)
  data["cart"] = json.loads(data["cart"])
  return jsonify(data)



@app.route("/user/<id>", methods=["PUT"])
def updateUserCart(id):
  _json = request.json
  user = User.query.get(id)
  user.cart = json.dumps(_json["cart"])
  db.session.commit()
  return jsonify({"Message": "Cart Updated"})

if __name__ == "__main__":
  app.run()