from django.contrib import admin
from .models import Job, Candidate, Application, Notification

class CandidateAdmin(admin.ModelAdmin):
 list_display = ('name', 'email')
admin.site.register(Candidate, CandidateAdmin)
class ApplicationAdmin(admin.ModelAdmin):
 list_display = ('candidate','job','skills', 'score')
admin.site.register(Application, ApplicationAdmin)

class NotificationAdmin(admin.ModelAdmin):
 list_display = ('candidate', 'message', 'is_read', 'created_at')
admin.site.register(Notification, NotificationAdmin)

class JobAdmin(admin.ModelAdmin):
 list_display = ('title', 'required_skills')
admin.site.register(Job, JobAdmin)