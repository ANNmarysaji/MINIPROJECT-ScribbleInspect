# serializers.py

from rest_framework import serializers
from .models import Tasks,StudentTaskStatus


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['name', 'subject', 'teacher', 'max_marks',
                  'end_date', 'end_time', 'task_pdf_link', 'answer_key_link']


class StudentViewTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id', 'name', 'subject', 'teacher', 'max_marks',
                  'end_date', 'end_time', 'task_pdf_link']
class SearchViewTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id', 'name', 'subject', 'teacher', 'max_marks',
                  'end_date', 'end_time', 'task_pdf_link','teacherstatus']


class TeacherViewTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['id', 'name', 'subject', 'teacher', 'max_marks',
                  'end_date', 'end_time', 'task_pdf_link', 'answer_key_link']
        
class StudentTaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTaskStatus
        fields = '__all__'
