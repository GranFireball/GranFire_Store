from flask import Flask, jsonify, redirect, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import uuid

import stripe

stripe.api_key = process.env.STRIPE_API_KEY


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy()
ma = Marshmallow()

mysql = MySQL(app)

class Admin(db.Model):
  userId = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
  name = db.Column(db.String(100), nullable=False, unique=True)

class AdminSchema(ma.Schema):
  class Meta:
    fields = ("id", "name")

admin_schema = AdminSchema()

class User(db.Model):
  id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
  cart = db.Column(db.JSON)

  def __init__(self, id, cart):
    self.id = id
    self.cart = json.dumps(cart)

class UserSchema(ma.Schema):
  class Meta:
    fields = ("id", "cart")


user_schema = UserSchema()

class Product(db.Model):
  id = db.Column(db.String(100), primary_key=True, nullable=False, unique=True)
  name = db.Column(db.String(100), nullable=False, unique=True)
  price = db.Column(db.String(50), nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  sale = db.Column(db.Integer)

class ProductSchema(ma.Schema):
  class Meta:
    fields = ("id", "name", "price", "stock", "sale")

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


app.config["SQLALCHEMY_DATABASE_URI"] = process.env.DATABASE_URL
db.init_app(app)
with app.app_context():
  db.create_all()

@app.route("/admins/<id>", methods=["GET"])
def isAdmin(id):
  admin = Admin.query.get(id)
  if admin:
    return jsonify({"Authorized": "Acesso Permitido"})
  return jsonify({"Error": "Acesso Negado"})

@app.route("/admins", methods=["POST"])
def createAdmin():
  _json = request.json
  isAlreadyAdmin = Admin.query.filter_by(userId = _json["userId"]).first()
  if isAlreadyAdmin is not None:
    return jsonify({"Error": "Esse ID já é administrador"})

  newAdmin = Admin(userId= _json["userId"], name=_json["name"])

  db.session.add(newAdmin)
  db.session.commit()
  return jsonify({"Message": "Esse ID agora é administrador"})

@app.route("/admins", methods=["DELETE"])
def deleteAdmin():
  _json = request.json
  admin = Admin.query.filter_by(userId = _json["userId"]).first()
  if admin is None:
    return jsonify({"Error": "ID Não Encontrado"})
  db.session.delete(admin)
  db.session.commit()
  return jsonify({"Message": "Esse ID não é mais administrador"})

@app.route("/users/<id>", methods=["GET"])
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

@app.route("/users/<id>/cart", methods=["PUT"])
def updateUserCart(id):
  _json = request.json
  user = User.query.get(id)
  user.cart = json.dumps(_json["cart"])
  db.session.commit()
  return jsonify({"Message": "Cart Updated"})

@app.route("/products", methods=["GET"])
def getProducts():
  products = Product.query.all()
  data = products_schema.dump(products)
  return jsonify(data)

@app.route("/products", methods=["POST"])
def createProduct():
  _json = request.json
  productNameAlreadyExists = Product.query.filter_by(name = _json["name"]).first()
  if productNameAlreadyExists is not None:
    return jsonify({"Error": "Esse nome já está sendo usado"})
  
  id = uuid.uuid4()
  newProduct = Product(id=id, name=_json["name"], price=_json["price"], stock=_json["stock"], sale=_json["sale"])

  db.session.add(newProduct)
  db.session.commit()
  return jsonify(id=id, name=_json["name"], price=_json["price"], stock=_json["stock"], sale=_json["sale"])

@app.route("/products", methods=["DELETE"])
def deleteProduct():
  _json = request.json
  product = Product.query.filter_by(id = _json["id"]).first()
  if product is None:
    return jsonify({"Error": "Produto Não Encontrado"})
  db.session.delete(product)
  db.session.commit()
  return jsonify({"Message": "Product Deleted"})

@app.route("/products", methods=["PUT"])
def updateProduct():
  _json = request.json
  product = Product.query.filter_by(id = _json["id"]).first()
  if product is None:
    return jsonify({"Error": "Produto Não Encontrado"})
  productNameAlreadyExists = Product.query.filter_by(name = _json["name"]).first()
  if productNameAlreadyExists is not None and productNameAlreadyExists.id != product.id:
    return jsonify({"Error": "Esse nome já está sendo usado"})
  product.name=_json["name"]
  product.price=_json["price"]
  product.sale=_json["sale"]
  db.session.commit()
  return jsonify({"Message": "Product Updated"})

@app.route("/products/add", methods=["PUT"])
def addProduct():
  _json = request.json
  product = Product.query.filter_by(id = _json["id"]).first()
  if product is None:
    raise Exception({"Message": "Product Not Found"})
  product.stock=product.stock + _json["amount"]
  db.session.commit()
  return jsonify({"Message": "Product Updated"})

@app.route("/products/remove", methods=["PUT"])
def removeProduct():
  _json = request.json
  product = Product.query.filter_by(id = _json["id"]).first()
  if product is None:
    raise Exception({"Message": "Product Not Found"})
  if _json["amount"] > product.stock:  
    raise Exception({"Message": "Insufficient Quantity"})
  
  product.stock=product.stock - _json["amount"]
  db.session.commit()
  return jsonify({"Message": "Product Updated"})

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
  _json = request.json
  allItems = []
  for product in _json["allItems"]:
    productStock = Product.query.filter_by(id = product["id"]).first()
    if productStock is None:
      return jsonify({"Error": "Produto Não Encontrado"})
    if product["qt"] > productStock.stock:  
      return jsonify({"Error": f"Quantidade de {productStock.name} no estoque: {productStock.stock}"})
  
    newItem = {
      'price_data': {
        'currency': 'brl',
        'product_data': {
          'name': product["name"]
        },
        'unit_amount': int(float(product["price"]) * 100)
      },
      'quantity': product["qt"]
    }
    allItems.append(newItem)
    

  session = stripe.checkout.Session.create(
    line_items=allItems,
    mode='payment',
    billing_address_collection='required',
    success_url='http://localhost:5173/success-payment/',
    cancel_url='http://localhost:5173/cart',
  )

  return jsonify({"url": session.url})


if __name__ == "__main__":
  app.run()