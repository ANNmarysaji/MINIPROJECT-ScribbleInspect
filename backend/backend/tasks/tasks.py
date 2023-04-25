from celery import shared_task
from django.utils import timezone
from .models import Tasks

@shared_task
# def update_teacherstatus():
#     tasks = Tasks.objects.filter(teacherstatus='ongoing')
#     for task in tasks:
#         if task.end_date < timezone.now().date() or (task.end_date == timezone.now().date() and task.end_time <= timezone.now().time()):
#             task.teacherstatus = 'completed'
#             task.save()
def testfun():
    print("it worked!")
