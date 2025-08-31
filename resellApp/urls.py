from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegistrationViews.as_view(), name='register'),
    path('login', views.UserLoginViews.as_view(), name='login'),
    path('delete', views.DeleteAccountViews.as_view(), name='delete'),
    path('reset', views.RequestResetView.as_view(), name='reset'),
    path('resellAndBids', views.GenerateResellBidPrice.as_view(), name='resellBid'),
    path('viewAccount', views.ViewSettings.as_view(), name='settings'),
    path('ebay_account_deletion', views.EbayAccountDeletion.as_view(), name='ebay_account_deletion'),
    path('recents', views.RecentsViews.as_view(), name='recents'),
    
]