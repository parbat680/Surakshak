import 'dart:developer';
import 'dart:io';

import 'package:surakshak/models/medicine.dart';
import 'package:surakshak/services/data/api.dart';
import 'package:get/get.dart';

class MedicineHandler {
  static final ApiHandler _apiHandler = ApiHandler();
  static Future<List<MedModel>> getMedicines() async {
    List<MedModel> meds = [];
    final response = await _apiHandler.get('meds/get', "");

    var data = response.data as List;

    if (response.statusCode == 200) {
      meds = data.map((e) => MedModel.fromJson(e)).toList();
    } else {
      Get.snackbar("Error", "cannot get Medicine details");
    }

    log(meds.toString());

    return meds;
  }

  static Future<List<MedModel>> addMedicines(
      String name, String dosage, String days, String time, File file) async {
    List<MedModel> meds = [];
    final response = await _apiHandler.uploadImage(file, 'meds/add', {
      "name": name,
      "days": days,
      "time": time,
      "duration": dosage,
    });

    log(response.toString());
    if (response.statusCode == 200) {
      Get.back();
    } else {
      Get.snackbar("Error", "cannot get Medicine details");
    }

    log(meds.toString());

    return meds;
  }
}
