from app_imports import *


def auth_user(_request, _params, _session):
    from gateway.make_requestes import make_swagger_request
    email = _params['email']
    password = _params['password']

    payload = {
        "email": email,
        "password": password,
        "deviceId": "string"
    }
    url = 'http://129.232.234.109:7254/api/User/Authenticate?ip=127.0.0.1'

    swagger_resp = make_swagger_request(url, payload)
    if swagger_resp.status_code == 200:
        user_obj = json.loads(swagger_resp.text)
        _session['id'] = user_obj['id']
        _session['active'] = user_obj['active']
        _session['email'] = user_obj['email']
        _session['firstName'] = user_obj['firstName']
        _session['lastName'] = user_obj['lastName']
        _session['lastLogin'] = user_obj['lastLogin']
        _session['username'] = user_obj['username']
        _session['roleDescription'] = user_obj['roleDescription']
        response = {'Result': 'SUCCESS', 'Message': 'Logged In'}

    elif swagger_resp.status_code == 400:
        response = {'Result': 'WARNING', 'Message': str(swagger_resp.text)}
    else:
        return {'Result': 'ERROR', 'Message': 'Failed To Auth User'}

    return response


def forgot_pw(_request, _params, _session):
    from gateway.make_requestes import make_swagger_request
    email = _params['email']
    url = f"http://129.232.234.109:7254/api/User/ForgotPassword?email={email}"
    payload = {}
    response = make_swagger_request(url, payload)

    if response.status_code == 200:
        print('')
    elif response.status_code == 400:
        print('')
    return response


def reset_pw(_request, _params, _session):
    from gateway.make_requestes import make_swagger_request
    # step 1: login into account with [tmp_pw, email] get user_id
    # step 2: reset account with user_id from previous request

    email = _params['email']
    new_pw = _params['new_pw']
    tmp_pw = _params['tmp_pw']
    otp = _params['otp']

    step_1_payload = {
        "email": email,
        "password": tmp_pw,
        "deviceId": "string"
    }
    step_1_url = 'http://129.232.234.109:7254/api/User/Authenticate?ip=127.0.0.1'

    step_1_response = make_swagger_request(step_1_url, step_1_payload)
    user_data = json.loads(step_1_response.text)
    user_id = user_data['id']

    step_2_url = f'http://129.232.234.109:7254/api/User/ResetPassword?id={user_id}&ip=127.0.0.1'
    step_2_payload = {
        "oldPassword": tmp_pw,
        "newPassword": new_pw,
        "otp": otp,
        "deviceId": "string"
    }
    step_2_response = make_swagger_request(step_2_url, step_2_payload)

    if step_2_response.status_code == 200:
        response = {}
    elif step_2_response.status_code == 400:
        response = {}
    else:
        response = {}
    return response
