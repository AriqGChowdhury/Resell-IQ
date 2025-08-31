from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import *
from rest_framework import status, permissions
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, JSONParser


#Temporary to get dataset
import json
import hashlib
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.

#User registration
class UserRegistrationViews(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print(request.data)
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Login authentication
class UserLoginViews(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            'username': request.user.username
    })

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        print(request.data)
        user = authenticate(request, username=username, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid')
        
        
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'message': 'success',
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }
        )
    
#Reset Password
class RequestResetView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old_pass = request.data['oldPassword']
        new_pass = request.data['newPassword']
        confirm = request.data['confirm']

        user = request.user

        if not user.check_password(old_pass):
            return Response({"message": "Incorrect password"})
        if new_pass != confirm:
            return Response({'message': "passwords do not match"})
        
        user.set_password(new_pass)
        user.save()

        return Response({"message": "Password changed"}, status=status.HTTP_200_OK)


#Delete Account
class DeleteAccountViews(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def delete(self, request):
        try:
            user = request.user
            user.delete()
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'Account has been deleted.'}, status=status.HTTP_200_OK)
       


#Add more later
class ViewSettings(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        previousResellsBids = PreviousResellsBids.objects.filter(user=request.user)
        print(previousResellsBids)
        return Response(previousResellsBids)


#Generate Resell Price
class GenerateResellBidPrice(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    parser_classes = (MultiPartParser, JSONParser)
    

    def post(self, request, format=None):
        print(request.data)
        serializer = ResellAndBidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            model_size = len(PreviousResellsBids.objects.all())
            #Keeping Previous Resell or Bid History to Max of 20 Entries
            if model_size >= 20:
                first_row = PreviousResellsBids.objects.first()
                first_row.delete()
                print("Limit has been passed, first row has been deleted.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    


EBAY_VERIFICATION_TOKEN = "ebay-account-deletion-ariq-chowdhury" 
EBAY_ENDPOINT_URL = "https://e11f4b499563.ngrok-free.app/auth/ebay_account_deletion"  # no redirect, exact path

@method_decorator(csrf_exempt, name="dispatch")
class EbayAccountDeletion(View):
    def get(self, request, *args, **kwargs):
        challenge_code = request.GET.get("challenge_code")
        if not challenge_code:
            return Response("missing", status=status.HTTP_400_BAD_REQUEST)
        
        current_endpoint = request.build_absolute_uri(request.path)

        print("DEBUG challenge_code:", challenge_code)
        print("DEBUG token        :", EBAY_VERIFICATION_TOKEN)
        print("DEBUG registered   :", EBAY_ENDPOINT_URL)
        print("DEBUG current      :", current_endpoint)

        m = hashlib.sha256()
        m.update((challenge_code).encode("utf-8"))
        m.update((EBAY_VERIFICATION_TOKEN).encode("utf-8"))
        m.update((EBAY_ENDPOINT_URL).encode("utf-8"))
        challenge_response = m.hexdigest()

        return JsonResponse({"challengeResponse": challenge_response}, status=200)

    def post(self, request, *args, **kwargs):
        try:
            raw = request.body.decode("utf-8") if request.body else ""
            payload = json.loads(raw) if raw else {}     
        except Exception as e:    
            print("ERROR parsing eBay notif:", repr(e))
        return JsonResponse({"status": "200"})

class RecentsViews(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        previousResellsBids = PreviousResellsBids.objects.filter(user=request.user).order_by('-item_id')[:20]
        serializer = PreviousResellsBidsSerializer(previousResellsBids, many=True)
        return Response(serializer.data)
    


#Host on AWS