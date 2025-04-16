import csv
import io
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import FinancialData
from rest_framework.permissions import IsAuthenticated

class UploadCSVView(APIView):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_file = file_obj.read().decode("utf-8")
            io_string = io.StringIO(decoded_file)
            reader = csv.DictReader(io_string)

            for row in reader:
                FinancialData.objects.create(
                    date=row.get("Date"),
                    category=row.get("Category"),
                    amount=row.get("Amount")
                )

            return Response({"message": "CSV uploaded and data saved."}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class FinancialDataView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        data = FinancialData.objects.all().values("date", "category", "amount")
        return Response(list(data))
