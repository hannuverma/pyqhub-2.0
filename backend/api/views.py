
from django.shortcuts import render
from .models import Semester, Subject, Paper
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import SemesterSerializer, SubjectSerializer, PaperSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.core.cache import cache

@cache_page(60 * 15)
@api_view(['POST'])
@permission_classes([AllowAny])
def getpapers(request):

    papers = Paper.objects.select_related('subject', 'subject__semester').all()

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
    semester = request.data.get('semester', 1)
    
    cache_key = f"subjects_sem_{semester}"
    
    cached_subjects = cache.get(cache_key)
    
    if cached_subjects:
        return Response(cached_subjects)

    subjects = Subject.objects.filter(semester=semester)
    data = [{"id": s.id, "name": s.name} for s in subjects]

    cache.set(cache_key, data, 60 * 60 * 24)

    return Response(data)