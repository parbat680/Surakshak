import 'dart:math';

import 'package:get/get.dart';
import 'package:surakshak/services/data/api.dart';

import '../../models/health_details.dart';

class HealthDetailsHandler {
  
  static final ApiHandler _apiHandler = ApiHandler();
  static Future<List<HealthDetailsModel>> update(HealthDetailsModel healthDetailsModel) async {

    List<HealthDetailsModel> healthDetails=[];
    try {
      var response = await _apiHandler.post("senior/add/healthdetails", {
        "diabetes": healthDetailsModel.diabetes,
        "sistolic": healthDetailsModel.sistolic,
        "diastolic": healthDetailsModel.diastolic,
        "pulseRate": healthDetailsModel.pulseRate,
      });
      if(response.statusCode == 200){
        Get.snackbar("Success", "Request Success");
      }
    } catch (e) {
      Get.snackbar("Error", "Something went wrong");
    }
    return healthDetails;
  }
}
