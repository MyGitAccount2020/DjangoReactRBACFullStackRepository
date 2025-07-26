from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, AdminAnalytics

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),  # Add custom fields here
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role',)}),
    )


# ------------------new changes-------------------
@admin.register(AdminAnalytics)
class AdminAnalyticsAdmin(admin.ModelAdmin):
    list_display = ('admin', 'patient_name', 'fees', 'profit', 'loss', 'date_created')
    list_filter = ('admin', 'date_created')
    search_fields = ('patient_name', 'admin__username')
# --------------------------------------------------

admin.site.register(CustomUser, CustomUserAdmin)
