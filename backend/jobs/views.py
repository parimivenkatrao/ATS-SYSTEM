from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .utils import calculate_score

@api_view(['GET'])
def list_jobs(request):
 data=Job.objects.values()
 return Response(list(data))

@api_view(['POST'])
def create_job(request):
 j=Job.objects.create(**request.data); return Response({'id':j.id})

@api_view(['POST'])
def apply_job(request):
 job=Job.objects.get(id=request.data['job'])
 c,_=Candidate.objects.get_or_create(email=request.data['email'],defaults={'name':request.data['name']})
 s=calculate_score(job.required_skills,request.data['skills'])
 Application.objects.create(candidate=c,job=job,skills=request.data['skills'],score=s)
 Notification.objects.create(candidate=c,message=f"Applied {job.title} {s}%")
 return Response({'score':s})

@api_view(['GET'])
def candidates(request,id):
 apps=Application.objects.filter(job_id=id).order_by('-score').select_related('candidate')
 data=[{
  'id':a.id,
  'candidate_name':a.candidate.name,
  'candidate_email':a.candidate.email,
  'skills':a.skills,
  'score':a.score
 } for a in apps]
 return Response(data)

@api_view(['GET'])
def notifications(request):
 return Response(list(Notification.objects.values()))

@api_view(['PATCH'])
def mark(request,id):
 n=Notification.objects.get(id=id)
 n.is_read=request.data['is_read']; n.save()
 return Response({'ok':True})
