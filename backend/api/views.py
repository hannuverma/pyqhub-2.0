
from django.shortcuts import render
from .models import Semester, Subject, Paper
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SemesterSerializer, SubjectSerializer, PaperSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def getall(request):

    papers = Paper.objects.all()

    semester = request.GET.get('semester')
    exam_type = request.GET.get('exam')
    subject = request.GET.getlist('subject')
    subjects = Subject.objects.all()

    if semester:
        papers = papers.filter(subject__semester__number=semester)
        subjects = subjects.filter(semester__number=semester)

    if subject:
        papers = papers.filter(subject__id__in=subject)

    if exam_type:
        papers = papers.filter(exam_type=exam_type)

    
    content = {
        'papers': PaperSerializer(papers, many=True).data,
        "subjects": SubjectSerializer(subjects, many=True).data,
        'semesters': SemesterSerializer(Semester.objects.all(), many=True).data,
        'selected_subjects': subject
    }

    return Response(content)
# Create your views here.
