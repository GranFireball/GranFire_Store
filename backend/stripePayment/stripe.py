import requests
import stripe

stripe.api_key = "sk_test_51PfiirRpgD1LR0XJz1QUoHX5LsEPEvbbvdxZkWjjo6Dc8nIrQm2nfVA6Icn9W2TzbNN73XeO2Z5ljJFBHdP3TcHS005HLm7qq6"

def createCustomer(name, email):
  stripe.Customer.create(
    name=name,
    email=email
  )

def createCard(cardParameters):
  stripe.Customer.create_source(
    customer = cardParameters.customerId,
    brand = cardParameters.brand,
    country = cardParameters.country,
    funding = cardParameters.funding,
    cvc = cardParameters.cvc 
  )

def listCustomerCards(customerId):
  try:
    response = requests.get(f'https://api.stripe.com/v1/customers/{customerId}/cards')
    return response
  except:
    print("Erro")
