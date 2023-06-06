from app_imports import *
templates = Blueprint('templates', __name__, static_folder="static", template_folder='templates')

# AUTH


@app.route('/login')
def login():
    return render_template('/auth/login.html', session=session)


@app.route('/forgot-pw')
def forgot_pw():
    return render_template('/auth/forgot_pw.html', session=session)


@app.route('/reset-password')
def reset_pw_1():
    return render_template('/auth/reset_pw.html', session=session)


# Logged In pages
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', session=session)


@app.route('/learner-ship')
def learner_ship():
    return render_template('learner_registration.html', session=session)
