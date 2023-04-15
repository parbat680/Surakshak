
import 'dart:developer';

import 'package:get/get.dart';
import 'package:surakshak/services/data/api.dart';

import '../../models/health_details.dart';

class HealthDetailsHandler {
  
  static final ApiHandler _apiHandler = ApiHandler();
  static update(HealthDetailsModel healthDetailsModel) async {
    try {
      print("try");
      var response = await _apiHandler.post("senior/add/healthdetails", healthDetailsModel.toJson());
      print(response.data);
      if(response.statusCode == 200){
        log('Successful');
        Get.snackbar("Success", "Request Success");
      }
    } catch (e) {
      log('Failed');
      Get.snackbar("Error", "Something went wrong");
    }
  }
}
