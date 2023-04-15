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

    var diabetes;
    var sistolic;
    var diastolic;
    var pulseRate;
    var date;

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
        "pulse": pulseRate,
        "date": date,
    };
}