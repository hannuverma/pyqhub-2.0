from .models import Semester, Subject, Paper
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import PaperSerializer
from django.core.cache import cache


@api_view(['POST'])
@permission_classes([AllowAny])
def getpapers(request):
    try:
        semester = int(request.data.get('semester', 0)) or None
    except (TypeError, ValueError):
        return Response({"error": "Invalid semester."}, status=status.HTTP_400_BAD_REQUEST)

    exam_type = request.data.get('exam')
    if exam_type is not None and exam_type not in ('MIDSEM', 'ENDSEM'):
        return Response({"error": "Invalid exam type."}, status=status.HTTP_400_BAD_REQUEST)

    raw_subjects = request.data.get('subject') or []
    if not isinstance(raw_subjects, list):
        return Response({"error": "subjects must be a list."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        subject_ids = [int(s) for s in raw_subjects]
    except (TypeError, ValueError):
        return Response({"error": "Invalid subject id."}, status=status.HTTP_400_BAD_REQUEST)

    year = request.data.get('year')
    if year is not None:
        try:
            year = int(year)
        except (TypeError, ValueError):
            return Response({"error": "Invalid year."}, status=status.HTTP_400_BAD_REQUEST)

    batch = request.data.get('batch')
    if batch is not None and batch not in ('IT', 'DSA', 'CSE'):
        return Response({"error": "Invalid batch."}, status=status.HTTP_400_BAD_REQUEST)

    papers = Paper.objects.select_related('subject', 'subject__semester').all()

    if semester:
        papers = papers.filter(subject__semester__number=semester)
    if subject_ids:
        papers = papers.filter(subject__id__in=subject_ids)
    if exam_type:
        papers = papers.filter(exam_type=exam_type)
    if year:
        papers = papers.filter(year=year)
    if batch:
        papers = papers.filter(batch=batch)

    return Response({'papers': PaperSerializer(papers, many=True).data})


@api_view(['POST'])
@permission_classes([AllowAny])
def getSubjects(request):
    try:
        semester = int(request.data.get('semester', 1))
    except (TypeError, ValueError):
        return Response({"error": "Invalid semester."}, status=status.HTTP_400_BAD_REQUEST)

    cache_key = f"subjects_sem_{semester}"
    cached_subjects = cache.get(cache_key)

    if cached_subjects:
        return Response(cached_subjects)

    subjects = Subject.objects.filter(semester__number=semester)
    data = [{"id": s.id, "name": s.name} for s in subjects]

    cache.set(cache_key, data, 60 * 60 * 24)

    return Response(data)
