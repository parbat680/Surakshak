import 'dart:convert';

HealthDetailsModel healthDetailsFromJson(String str) =>
    HealthDetailsModel.fromJson(json.decode(str));

String healthDetailsToJson(HealthDetailsModel data) =>
    json.encode(data.toJson());

class HealthDetailsModel {
  HealthDetailsModel({
    required this.sistolic,
    required this.diastolic,
    required this.pulseRate,
    required this.date,
  });

  var sistolic;
  var diastolic;
  var pulseRate;
  var date;

  factory HealthDetailsModel.fromJson(Map<String, dynamic> json) =>
      HealthDetailsModel(
        sistolic: json["bloodPressure"]["sistolic"] ?? "",
        diastolic: json["bloodPressure"]["diastolic"] ?? "",
        pulseRate: json["pulse"] ?? "",
        date: json["date"] ?? "",
      );

  Map<String, dynamic> toJson() => {
        "sistolic": sistolic,
        "diastolic": diastolic,
        "pulse": pulseRate,
      };
}
