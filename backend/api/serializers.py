from rest_framework import serializers
from .models import Semester, Subject, Paper

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id', 'number']

class SubjectSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer(read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'semester']

class PaperSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    pdf = serializers.SerializerMethodField()
    preview = serializers.SerializerMethodField()

    def get_pdf(self, obj):
        return obj.pdf.url

    def get_preview(self, obj):
        return f"https://res.cloudinary.com/dwe6n6goq/image/upload/pg_1/{obj.pdf.public_id}.jpg"

    class Meta:
        model = Paper
        fields = ['id', 'year', 'exam_type', 'pdf', 'preview', 'uploaded_at', 'subject']
