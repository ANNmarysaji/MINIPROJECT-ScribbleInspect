from django.urls import path
from .views import AddTaskView, RetrieveTaskView, RetrieveTaskViewForTeacher, DeleteTaskView, EditTaskView
urlpatterns = [
    path('addtask', AddTaskView.as_view()),
    #path('alltasks', RetrieveTaskView.as_view()),
    path('alltasks/<str:teacher>', RetrieveTaskViewForTeacher.as_view()),
    path('delete/<str:pk>', DeleteTaskView.as_view()),
    path('edit/<str:pk>', EditTaskView.as_view()),
    path('alltasks/?search=<SEARCH_QUERY>&Status=<STATUS_QUERY>&subject=<SUBJECT_QUERY>&sort=<SORT_QUERY>&page=<PAGE_NUMBER>',RetrieveTaskView.as_view())
]
 