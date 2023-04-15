import 'dart:developer';

import 'package:age_well/models/volunteer.dart';
import 'package:age_well/services/data/api.dart';
import 'package:get/get.dart';

class VolenteerHelper {
  static final ApiHandler _apiHandler = ApiHandler();
  static Future<List<VolunteerModel>> getVolunteers() async {
    List<VolunteerModel> v = [];
    try {
      var response = await _apiHandler.get("volunteer/get", "");

      if (response.statusCode == 200) {
        var data = (response.data) as List;
        v = data.map((e) => VolunteerModel.fromJson(e['volunteerId'])).toList();
      } else {
        Get.snackbar("Error", "Error Fetching volunteers");
      }
    } catch (e) {
      Get.snackbar("Error", "Error sending SOS");
      log(e.toString());
    }

    return v;
  }
}
