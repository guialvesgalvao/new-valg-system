from flask import Flask
from flask_cors import CORS
from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    from .routes import bills_bp
    app.register_blueprint(bills_bp)

    return app
