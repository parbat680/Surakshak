import 'dart:convert';

HealthDetailsModel healthDetailsFromJson(String str) => HealthDetailsModel.fromJson(json.decode(str));

String healthDetailsToJson(HealthDetailsModel data) => json.encode(data.toJson());

class HealthDetailsModel {
    HealthDetailsModel({
        required this.diabetes,
        required this.sistolic,
        required this.diastolic,
        required this.pulseRate,
        
        required this.date,
    });

    String diabetes;
    String sistolic;
    String diastolic;
    String pulseRate;
    String date;

    factory HealthDetailsModel.fromJson(Map<String, dynamic> json) => HealthDetailsModel(
        diabetes: json["diabetes"] ?? "",
        sistolic: json["sistolic"] ?? "",
        diastolic: json["diastolic"] ?? "",
        pulseRate: json["pulseRate"] ?? "",
        date: json["date"] ?? "",
    );

    Map<String, dynamic> toJson() => {
        "diabetes": diabetes,
        "sistolic": sistolic,
        "diastolic": diastolic,
        "pulseRate": pulseRate,
        "date": date,
    };
}