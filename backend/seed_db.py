import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from base.models import Product, Review, Order, OrderItem, ShippingAddress
from django.contrib.auth.hashers import make_password

def seed_data():
    print("Clearing existing data...")
    OrderItem.objects.all().delete()
    ShippingAddress.objects.all().delete()
    Order.objects.all().delete()
    Review.objects.all().delete()
    Product.objects.all().delete()
    User.objects.all().delete()

    print("Creating admin and demo users...")
    admin_user = User.objects.create(
        username='admin@example.com',
        email='admin@example.com',
        first_name='Admin User',
        is_staff=True,
        is_superuser=True,
        password=make_password('password123')
    )

    demo_user = User.objects.create(
        username='john@example.com',
        email='john@example.com',
        first_name='John Doe',
        is_staff=False,
        password=make_password('password123')
    )

    print("Creating sample products...")
    products_data = [
        {
            "name": "Airpods Wireless Bluetooth Headphones",
            "image": "airpods.jpg",
            "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality Audio offers immersive listening experience built-in microphone for handsfree calls.",
            "brand": "Apple",
            "category": "Electronics",
            "price": 89.99,
            "countInStock": 10,
            "rating": 4.5,
            "numReviews": 12,
        },
        {
            "name": "iPhone 13 Pro 256GB Memory",
            "image": "phone.jpg",
            "description": "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.",
            "brand": "Apple",
            "category": "Electronics",
            "price": 599.99,
            "countInStock": 7,
            "rating": 4.8,
            "numReviews": 8,
        },
        {
            "name": "Cannon EOS 80D DSLR Camera",
            "image": "camera.jpg",
            "description": "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design.",
            "brand": "Canon",
            "category": "Electronics",
            "price": 929.99,
            "countInStock": 5,
            "rating": 4.6,
            "numReviews": 10,
        },
        {
            "name": "Sony PlayStation 5 Console",
            "image": "playstation.jpg",
            "description": "The ultimate gaming console with ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio.",
            "brand": "Sony",
            "category": "Electronics",
            "price": 399.99,
            "countInStock": 11,
            "rating": 4.9,
            "numReviews": 15,
        },
        {
            "name": "Logitech G-Series Gaming Mouse",
            "image": "mouse.jpg",
            "description": "Get more out of your games with this Logitech G series gaming mouse. The six programmable buttons allow customization for a smooth playing experience.",
            "brand": "Logitech",
            "category": "Electronics",
            "price": 49.99,
            "countInStock": 8,
            "rating": 4.3,
            "numReviews": 6,
        },
        {
            "name": "Amazon Echo Dot 4th Gen Smart Speaker",
            "image": "alexa.jpg",
            "description": "Meet the all-new Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.",
            "brand": "Amazon",
            "category": "Electronics",
            "price": 29.99,
            "countInStock": 0,
            "rating": 4.2,
            "numReviews": 4,
        }
    ]

    for p in products_data:
        Product.objects.create(
            user=admin_user,
            name=p['name'],
            image=p['image'],
            description=p['description'],
            brand=p['brand'],
            category=p['category'],
            price=p['price'],
            countInStock=p['countInStock'],
            rating=p['rating'],
            numReviews=p['numReviews']
        )

    print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
