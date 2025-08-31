from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
import pandas as pd
import os
from django.conf import settings
from fastai.learner import load_learner
from pathlib import Path
from fastai.tabular.all import *
import numpy as np
import pathlib




pathlib.PosixPath = pathlib.WindowsPath
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "macbook_model.pkl")

learn = load_learner(MODEL_PATH)

class UserRegistrationSerializer(serializers.ModelSerializer):
    pass2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'pass2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['pass2']:
            print("unmatch pass")
            raise serializers.ValidationError({'password': 'password fields do not match'})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop("pass2")
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user
    

class ResellAndBidSerializer(serializers.ModelSerializer):
    predicted_price = serializers.SerializerMethodField()
    class Meta:
        model = PreviousResellsBids
        fields = [
            "year","model_type","ram","storage","cpu","screen_size",
            "condition","conditionID","cpu_tier","cpu_model","brand", "predicted_price", "generated_bid", "generated_resell"
        ]

        

    #Function that places prediction value in database
    def get_predicted_price(self, data):

        if not data:
            print("No request")
            return None
        
        model_params = pd.DataFrame([{
            "Title": data.brand,
            "Condition": str(data.condition),
            "CPU_Tier": str(data.cpu_tier),
            "CPU_Family": str(data.cpu),
            "CPU_Model": str(data.cpu_model),
            "Model": str(data.model_type),
            "Condition ID": str(data.conditionID),
            "Year": float(data.year),
            "RAM_GB": float(data.ram),
            "Storage_GB": float(data.storage),
            "Screen_Inches": float(data.screen_size),
        }])

        try:
           
            row = model_params.iloc[0]
            pred = learn.predict(row)
            val = pred[1]
            #Conversion to real price
            return float(np.expm1(val.item())) if hasattr(val, "item") else float(val)
        except Exception as e:
            print("Prediction error:", e)
            return None

    def create(self, validated_data):
        instance = super().create(validated_data)
        predicted_price = self.get_predicted_price(instance)
        if predicted_price is not None:
            instance.generated_bid = predicted_price
            if predicted_price < 200:
                resell = predicted_price * 1.3   
            elif predicted_price < 600:
                resell = predicted_price * 1.2   
            else:
                resell = predicted_price * 1.15  
            instance.generated_resell = resell
            instance.save()
        return instance

    

class PreviousResellsBidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PreviousResellsBids
        fields = '__all__'
