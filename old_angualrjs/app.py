from app_imports import *
from views.templates import templates
from views.api import api

app.register_blueprint(templates, url_prefix="")
app.register_blueprint(api, url_prefix="")


if __name__ == "__main__":
    app.run(debug=True, port=8002, host='0.0.0.0')
