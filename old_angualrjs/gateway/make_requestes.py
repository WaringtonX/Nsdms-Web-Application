from app_imports import *


def make_swagger_request(_url, _payload):
    headers = {'Content-Type': 'application/json'}
    response = requests.request("POST", _url, headers=headers, json=_payload, verify=False)
    return response
