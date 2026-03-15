
from django.shortcuts import render
from .models import Semester, Subject, Paper
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SemesterSerializer, SubjectSerializer, PaperSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def getpapers(request):

    papers = Paper.objects.all()

    semester = request.data.get('semester')
    exam_type = request.data.get('exam')
    subjects = request.data.get('subject')   # this should be a list

    if semester:
        papers = papers.filter(subject__semester__number=semester)

    if subjects:
        papers = papers.filter(subject__id__in=subjects)

    if exam_type:
        papers = papers.filter(exam_type=exam_type)

    content = {
        'papers': PaperSerializer(papers, many=True).data,
    }

    return Response(content)

@api_view(['POST'])
@permission_classes([AllowAny])
def getSubjects(request):
    if request.method == 'POST':
        semester_number = request.data.get('semester')
        subjects = Subject.objects.filter(semester__number=semester_number)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)