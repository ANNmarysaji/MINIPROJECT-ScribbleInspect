from django.db import models
import uuid
from uuid import UUID
from django.core.exceptions import ValidationError
from users.models import UserAccount
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

# Create your models here.


class Tasks(models.Model):
    STATUS_CHOICES = (
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed')
    )    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    teacher = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    max_marks = models.IntegerField()
    end_date = models.DateField()
    end_time = models.TimeField()
    task_pdf_link = models.URLField()
    answer_key_link = models.URLField()
    teacherstatus = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ongoing')
    
    # def save(self, *args, **kwargs):
    #     try:
    #         UUID(str(self.id))
    #     except ValueError:
    #         # handle the invalid UUID value here
    #         # for example, generate a new UUID value
    #         self.id = uuid.uuid4()
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Submissions(models.Model):
     
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    student = models.CharField(max_length=100)
    submission_time = models.DateTimeField(auto_now_add=True)
    submission_link = models.URLField()
    def __str__(self):
        return self.name
    


class StudentTaskStatus(models.Model):
    student = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    t_id = models.ForeignKey(Tasks, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default='pending')

    class Meta:
        unique_together = ('student', 't_id')

    def __str__(self):
        return f'{self.student.email} - {self.t_id.name} - {self.status}'
    

    
@receiver(post_save, sender=Tasks)
def create_student_task_statuses(sender, instance, created, **kwargs):
    """
    Creates a StudentTaskStatus instance for each student user when a new task is created.
    """
    if created:
        print("Signal receiver function is called.")
        students = UserAccount.objects.filter(user_type='Student')
        for student in students:
            StudentTaskStatus.objects.create(student=student, t_id=instance)

@receiver(post_save, sender=Submissions)
def update_student_task_status(sender, instance, created, **kwargs):
    """
    Updates the StudentTaskStatus instance for the corresponding student user and task when a new submission is created.
    """
    if created:
        student = instance.student
        task = instance.task
        student_task_status = StudentTaskStatus.objects.get(student=student, t_id=task)
        student_task_status.status = 'submitted'
        student_task_status.save()

