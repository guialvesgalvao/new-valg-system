from flask import Blueprint, request, jsonify, abort
from .models import db, RecurringBill, Bills
import os
import dotenv
bills_bp = Blueprint('bills', __name__)

dotenv.load_dotenv()

api_key_env = os.getenv('API_KEY')

# Função para verificar a chave API em todas as solicitações
def check_api_key():
    api_key = request.headers.get('X-Api-Key')
    for header, value in request.headers.items():
        print(f"{header}: {value}")
    if api_key != api_key_env:
        abort(401, 'Unauthorized: Missing or invalid API key')
# Buscar Todos
@bills_bp.route('/bills', methods=['GET'])
def get_bills():
    bills = Bills.query.all()
    return jsonify([bill.as_dict() for bill in bills])

# Buscar por IDw
@bills_bp.route('/bills/<int:id>', methods=['GET'])
def get_bill_by_id(id):
    bill = Bills.query.get_or_404(id)
    return jsonify(bill.as_dict())

# Alterar
@bills_bp.route('/bills/<int:id>', methods=['PUT'])
def edit_bill_by_id(id):
    bill = Bills.query.get_or_404(id)
    data = request.get_json()
    bill.name = data.get('name', bill.name)
    bill.amount = data.get('amount', bill.amount)
    bill.due_date = data.get('due_date', bill.due_date)
    db.session.commit()
    return jsonify(bill.as_dict())

# Criar
@bills_bp.route('/bills', methods=['POST'])
def create_new_bill():
    data = request.get_json()
    new_bill = Bills(
        name=data['name'],
        amount=data['amount'],
        due_date=data['due_date']
    )
    db.session.add(new_bill)
    db.session.commit()
    return jsonify(new_bill.as_dict()), 201

# Excluir
@bills_bp.route('/bills/<int:id>', methods=['DELETE'])
def delete_bill(id):
    bill = Bills.query.get_or_404(id)
    db.session.delete(bill)
    db.session.commit()
    return '', 204


# Buscar Todos
@bills_bp.route('/recurring_bills', methods=['GET'])
def get_recurring_bills():
    check_api_key()
    bills = RecurringBill.query.all()
    return jsonify([bill.as_dict() for bill in bills])

# Buscar por ID
@bills_bp.route('/recurring_bills/<int:id>', methods=['GET'])
def get_recurring_bill_by_id(id):
    check_api_key()
    bill = RecurringBill.query.get_or_404(id)
    return jsonify(bill.as_dict())

# Alterar
@bills_bp.route('/recurring_bills/<int:id>', methods=['PUT'])
def edit_recurring_bill_by_id(id):
    check_api_key()
    bill = RecurringBill.query.get_or_404(id)
    data = request.get_json()
    bill.name = data.get('name', bill.name)
    bill.average_value = data.get('average_value', bill.average_value)
    bill.day_due_date = data.get('day_due_date', bill.day_due_date)
    bill.relational_code = data.get('relational_code', bill.relational_code)
    db.session.commit()
    return jsonify(bill.as_dict())

# Criar
@bills_bp.route('/recurring_bills', methods=['POST'])
def create_new_recurring_bill():
    check_api_key()
    data = request.get_json()
    new_bill = RecurringBill(
        name=data['name'],
        average_value=data['average_value'],
        day_due_date=data['day_due_date'],
        relational_code=data['relational_code']
    )
    db.session.add(new_bill)
    db.session.commit()
    return jsonify(new_bill.as_dict()), 201

# Excluir
@bills_bp.route('/recurring_bills/<int:id>', methods=['DELETE'])
def delete_recurring_bill(id):
    check_api_key()
    bill = RecurringBill.query.get_or_404(id)
    db.session.delete(bill)
    db.session.commit()
    return '', 204