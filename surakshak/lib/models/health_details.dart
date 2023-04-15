import 'dart:convert';

HealthDetailsModel healthDetailsFromJson(String str) => HealthDetailsModel.fromJson(json.decode(str));

String healthDetailsToJson(HealthDetailsModel data) => json.encode(data.toJson());

class HealthDetailsModel {
    HealthDetailsModel({
        required this.sistolic,
        required this.diastolic,
        required this.pulseRate,
    });

    var sistolic;
    var diastolic;
    var pulseRate;

    factory HealthDetailsModel.fromJson(Map<String, dynamic> json) => HealthDetailsModel(
        sistolic: json["sistolic"] ?? "",
        diastolic: json["diastolic"] ?? "",
        pulseRate: json["pulse"] ?? "",
    );

    Map<String, dynamic> toJson() => {
        "sistolic": sistolic,
        "diastolic": diastolic,
        "pulse": pulseRate,
    };
}