from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import INTEGER
from datetime import datetime

db = SQLAlchemy()

class Bills(db.Model):
    __tablename__ = 'bills'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.Integer, nullable=False)
    relational_code = db.Column(db.Integer, nullable=False)
    modified = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'value': self.value,
            'due_date': self.due_date,
            'status': self.status,
            'priority': self.priority,
            'relational_code': self.relational_code,
            'modified': self.modified,
            'created_at': self.created_at.isoformat()
        }
    
class RecurringBill(db.Model):
    __tablename__ = 'recurring_bills'

    id = db.Column(INTEGER(unsigned=True), primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    average_value = db.Column(db.Float, nullable=False)
    day_due_date = db.Column(db.Integer, nullable=False)
    relational_code = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'average_value': self.average_value,
            'day_due_date': self.day_due_date,
            'relational_code': self.relational_code,
            'created_at': self.created_at.isoformat()
        }

