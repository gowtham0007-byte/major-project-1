import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client

client = Client()

print("Testing GET /api/products/ via Django Test Client...")
response = client.get('/api/products/')
print("Status Code:", response.status_code)
print("Data:", response.json())

print("\nTesting POST /api/users/login/ ...")
response = client.post('/api/users/login/', {'username': 'admin@example.com', 'password': 'password123'}, content_type='application/json')
print("Status Code:", response.status_code)
print("Data keys:", response.json().keys())

print("\nTesting POST /api/users/register/ ...")
response = client.post('/api/users/register/', {'name': 'New Demo', 'email': 'newdemo@example.com', 'password': 'password123'}, content_type='application/json')
print("Status Code:", response.status_code)
print("Registered user data:", response.json())
