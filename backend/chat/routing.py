from django.urls import path

from . import consumers

chat_websocket_urlpatterns = [
    path('ws/chat/private/', consumers.PrivateChatConsumer.as_asgi()),
]