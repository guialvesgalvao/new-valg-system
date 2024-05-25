from flask import Flask, request, jsonify
from flask_cors import CORS
from fakedata import bills

app = Flask(__name__)
CORS(app)

# Buscar Todos
@app.route('/bills', methods=['GET'])
def get_bills():
  return jsonify(bills)

# Buscar por ID
@app.route('/bills/<int:id>', methods=['GET'])
def get_bill_by_id(id):
  for bill in bills:
    if bill.get('id') == id:
		    return jsonify(bill)

# Alterar
@app.route('/bills/<int:id>', methods=['PUT'])    
def edit_bill_by_id(id):
  changed_bill = request.get_json()
  for index, bill in enumerate(bills):
    if bill.get('id') == id:
      bills[index].update(changed_bill)
      return jsonify(changed_bill)

# Criar
@app.route('/bills', methods=['POST'])
def create_new_bill():
  new_bill = request.get_json()
  bills.append(new_bill)
  return jsonify(bills)

# Excluir
@app.route('/bills/<int:id>', methods=['DELETE']) 
def delete_bill(id):
  for index, bill in enumerate(bills):
    if bill.get('id') == id:
      del bills[index]
      return jsonify(bills)

app.run(port=5000, host='localhost', debug=True)
