import 'dart:math';

import 'package:surakshak/services/data/api.dart';

import '../../models/health_details.dart';

class HealthDetailsHandler {
  static final ApiHandler _apiHandler = ApiHandler();
  Future<List<HealthDetails>> update() async {

    List<HealthDetails> healthDetails=[];
    try {
      var response = await _apiHandler.post("senior/add/healthdetails", {
        "seniorId": "1",
        "sistolic": "100",
        "diastolic": "100",
        "pulseRate": "100",
        "date": "100"
      });
      if(response.statusCode == 200){
        var data = response.data as List;
        healthDetails = data.map((e) => HealthDetails.fromJson(e)).toList();
      }
    } catch (e) {
      print(e);
    }
    return healthDetails;
  }
}
