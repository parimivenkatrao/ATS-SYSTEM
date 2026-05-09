from django.urls import path
from . import views
urlpatterns=[
path('jobs/',views.list_jobs),
path('jobs/create/',views.create_job),
path('apply/',views.apply_job),
path('candidates/<int:id>/',views.candidates),
path('notifications/',views.notifications),
path('notifications/<int:id>/',views.mark),
]
