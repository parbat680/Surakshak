import 'dart:convert';

HealthDetails healthDetailsFromJson(String str) => HealthDetails.fromJson(json.decode(str));

String healthDetailsToJson(HealthDetails data) => json.encode(data.toJson());

class HealthDetails {
    HealthDetails({
        required this.seniorId,
        required this.sistolic,
        required this.diastolic,
        required this.pulseRate,
        required this.date,
    });

    String seniorId;
    String sistolic;
    String diastolic;
    String pulseRate;
    String date;

    factory HealthDetails.fromJson(Map<String, dynamic> json) => HealthDetails(
        seniorId: json["seniorId"],
        sistolic: json["sistolic"],
        diastolic: json["diastolic"],
        pulseRate: json["pulseRate"],
        date: json["date"],
    );

    Map<String, dynamic> toJson() => {
        "seniorId": seniorId,
        "sistolic": sistolic,
        "diastolic": diastolic,
        "pulseRate": pulseRate,
        "date": date,
    };
}