from django.db import models
class Job(models.Model):
 title=models.CharField(max_length=255)
 required_skills=models.TextField()
def __str__(self):
 return self.title

class Candidate(models.Model):
 name=models.CharField(max_length=255)
 email=models.EmailField()
def __str__(self):
 return self.name

class Application(models.Model):
 candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE)
 job=models.ForeignKey(Job,on_delete=models.CASCADE)
 skills=models.TextField()
 score=models.FloatField()
def __str__(self):
 return f"{self.candidate.name} - {self.job.title}"

class Notification(models.Model):
 candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE)
 message=models.TextField()
 is_read=models.BooleanField(default=False)
 created_at=models.DateTimeField(auto_now_add=True)

def __str__(self):
 return self.message
