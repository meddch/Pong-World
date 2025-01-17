# Generated by Django 5.0.7 on 2024-08-07 11:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chat', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='last_sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='last_sent_chat_room', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='user1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user1_chat_room', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='chatroom',
            name='user2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user2_chat_room', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='message',
            name='chatroom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat.chatroom'),
        ),
        migrations.AddField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to=settings.AUTH_USER_MODEL),
        ),
    ]
