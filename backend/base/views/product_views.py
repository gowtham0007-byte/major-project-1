from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q

from base.models import Product, Review
from base.serializers import ProductSerializer

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword', '')
    if query:
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(category__icontains=query) | Q(brand__icontains=query)
        ).order_by('-createdAt')
    else:
        products = Product.objects.all().order_by('-createdAt')

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data})

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='Sample Description'
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    try:
        data = request.data
        product = Product.objects.get(id=pk)

        product.name = data.get('name', product.name)
        product.price = data.get('price', product.price)
        product.brand = data.get('brand', product.brand)
        product.countInStock = data.get('countInStock', product.countInStock)
        product.category = data.get('category', product.category)
        product.description = data.get('description', product.description)

        if 'image' in data and data['image']:
            product.image = data['image']

        product.save()
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response({'detail': 'Product Deleted Successfully'})
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data.get('product_id')
    if product_id:
        product = Product.objects.get(id=product_id)
        product.image = request.FILES.get('image')
        product.save()
        return Response({'detail': 'Image was uploaded'})
    return Response({'detail': 'No product specified'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    try:
        product = Product.objects.get(id=pk)
        data = request.data

        # 1. Review already exists check
        alreadyExists = product.review_set.filter(user=user).exists()
        if alreadyExists:
            return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

        # 2. No Rating
        rating = data.get('rating', 0)
        if int(rating) == 0:
            return Response({'detail': 'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)

        # 3. Create Review
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name if user.first_name else user.email,
            rating=int(rating),
            comment=data.get('comment', '')
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for r in reviews:
            total += r.rating
        product.rating = total / len(reviews) if len(reviews) > 0 else 0
        product.save()

        return Response({'detail': 'Review Added'})
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
