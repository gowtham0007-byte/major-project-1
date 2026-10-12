from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data.get('orderItems', [])

    if len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create Order
        order = Order.objects.create(
            user=user,
            paymentMethod=data.get('paymentMethod', 'PayPal'),
            taxPrice=data.get('taxPrice', 0.00),
            shippingPrice=data.get('shippingPrice', 0.00),
            totalPrice=data.get('totalPrice', 0.00)
        )

        # (2) Create Shipping Address
        shipping = data.get('shippingAddress', {})
        ShippingAddress.objects.create(
            order=order,
            address=shipping.get('address', ''),
            city=shipping.get('city', ''),
            postalCode=shipping.get('postalCode', ''),
            country=shipping.get('country', ''),
            shippingPrice=data.get('shippingPrice', 0.00)
        )

        # (3) Create Order Items and update stock
        for item in orderItems:
            product = Product.objects.get(id=item['product'])

            item_obj = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['qty'],
                price=item['price'],
                image=product.image.url if product.image else ''
            )

            # Update stock
            product.countInStock -= item_obj.qty
            if product.countInStock < 0:
                product.countInStock = 0
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    try:
        order = Order.objects.get(id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response({'detail': 'Order was paid', 'order': OrderSerializer(order, many=False).data})
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    try:
        order = Order.objects.get(id=pk)
        order.isDelivered = True
        order.deliveredAt = datetime.now()
        order.save()
        return Response({'detail': 'Order was marked as delivered', 'order': OrderSerializer(order, many=False).data})
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_404_NOT_FOUND)
