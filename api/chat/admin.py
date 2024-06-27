from django.contrib import admin

# Register your models here.
from .models import User, Connection, Message

admin.site.register(User)
admin.site.register(Connection)
admin.site.register(Message)