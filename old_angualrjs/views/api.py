from app_imports import *
api = Blueprint('api', __name__, static_folder="static", template_folder='templates')


@app.route('/NSDNS-AUTH-API', methods=['post'])
def auth_api():
    from functions import auth
    session.clear()
    fn = request.json['fn']
    params = request.json['params']

    lib = {
        'authUser': auth.auth_user,
        'forgotPw': auth.forgot_pw,
        'resetPw': auth.reset_pw
    }

    fun = lib[fn]
    response = fun(request, params, session)

    return json.dumps(response)

#
# @app.route('/NSDNS-FORGOT-PW-API', methods=['post'])
# def forgot_pw_api():
#     email = request.json['email']
#     session['email'] = email
#     email = 'kevink@esoftwaresolutions.co.za'
#     url = f"http://129.232.234.109:7254/api/User/ForgotPassword?email={email}"
#
#     headers = {'Content-Type': 'application/json'}
#     response = requests.request("POST", url, headers=headers, json={}, verify=False)
#     print(response)
#
#     response = {'Result': 'OK'}
#     return json.dumps(response)
#
#
# @app.route('/NSDNS-RESET-PW-API', methods=['post'])
# def reset_pw_api():
#     email = session['email']
#     new_pw = request.json['new_pw']
#     tmp_pw = request.json['tmp_pw']
#     otp = request.json['otp']
#
#     payload = {
#         "email": "kevink@esoftwaresolutions.co.za",
#         "password": tmp_pw,
#         "deviceId": "string"
#     }
#
#     headers = {'Content-Type': 'application/json'}
#     response = requests.request("POST", "http://129.232.234.109:7254/api/User/Authenticate?ip=127.0.0.1",
#                                 headers=headers, json=payload, verify=False)
#     print(response)
#     data = json.loads(response.text)
#     uid = data['id']
#
#     payload = {
#       "oldPassword": tmp_pw,
#       "newPassword": new_pw,
#       "otp": otp,
#       "deviceId": "string"
#     }
#     response = requests.request("POST", f"http://129.232.234.109:7254/api/User/ResetPassword?id={uid}&ip=127.0.0.1",
#                                 headers=headers, json=payload, verify=False)
#     print(response.text)
#
#     session.clear()
#     response = {'Result': 'OK'}
#     return json.dumps(response)
