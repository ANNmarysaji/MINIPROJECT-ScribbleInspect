from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import TaskSerializer, StudentViewTaskSerializer, TeacherViewTaskSerializer,SearchViewTaskSerializer
from .models import Tasks
from django.core.paginator import Paginator


class AddTaskView(APIView):

    #permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveTaskView(APIView):
    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Get the query parameters from the request
        search = request.GET.get('search')
        Status = request.GET.get('Status')
        subject = request.GET.get('subject')
        sort = request.GET.get('sort')
        page = request.GET.get('page')

        # Query the Tasks model based on the query parameters
        tasks = Tasks.objects.all()
        if search:
            tasks = tasks.filter(name__icontains=search)
        if Status:
            tasks = tasks.filter(teacherstatus=Status)
        if subject:
            tasks = tasks.filter(subject=subject)
        if sort:
            if sort == 'name':
                tasks = tasks.order_by('name')
            elif sort == '-name':
                tasks = tasks.order_by('-name')
            elif sort == 'max_marks':
                tasks = tasks.order_by('max_marks')
            elif sort == '-max_marks':
                tasks = tasks.order_by('-max_marks')
        if page:
            tasks = Tasks.order_by('name')
            # paginator = Paginator(tasks, 10)
            # tasks = paginator.get_page(page)

        # Serialize the queryset and return the response
        serializer = SearchViewTaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RetrieveTaskViewForTeacher(APIView):

    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request, teacher):
        tasks = Tasks.objects.filter(teacher=teacher)
        serializer = TeacherViewTaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteTaskView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            task = Tasks.objects.get(pk=pk)
        except Tasks.DoesNotExist:
            return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)

        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EditTaskView(APIView):

    # permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        try:
            task = Tasks.objects.get(pk=pk)
        except Tasks.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
