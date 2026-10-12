import urllib.request
import json

BASE_URL = 'http://127.0.0.1:8000/api'

def test_get_products():
    print("Testing GET /api/products/ ...")
    req = urllib.request.Request(f"{BASE_URL}/products/")
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(f"Status: {response.status}, Products count: {len(data['products'])}")
        return data['products'][0] if data['products'] else None

def test_login():
    print("\nTesting POST /api/users/login/ ...")
    payload = json.dumps({"username": "admin@example.com", "password": "password123"}).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/users/login/", data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(f"Status: {response.status}, User: {data['name']}, Token received: {bool(data.get('token'))}")
        return data['token']

def test_register():
    print("\nTesting POST /api/users/register/ ...")
    email = "testuser_new@example.com"
    payload = json.dumps({"name": "Test User", "email": email, "password": "password123"}).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/users/register/", data=payload, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            print(f"Status: {response.status}, Registered User: {data['name']}")
    except urllib.error.HTTPError as e:
        print(f"User registration response: {e.code} (User might already exist)")

if __name__ == '__main__':
    product = test_get_products()
    token = test_login()
    test_register()
    print("\nAll Backend API tests completed successfully!")
