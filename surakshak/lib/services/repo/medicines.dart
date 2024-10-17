import 'dart:developer';
import 'dart:io';

import 'package:surakshak/models/medicine.dart';
import 'package:surakshak/services/data/api.dart';
import 'package:get/get.dart';
import 'package:surakshak/services/repo/notification_services.dart';

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
      String name, String dosage, String days, String time) async {
    List<MedModel> meds = [];
    final response = await _apiHandler.uploadImage(
      'meds/add',
      name,
      days,
      time,
      int.parse(dosage),
    );
    log("Check");
    log(response.toString());
    log("Time:  ");
    log(time.length.toString());
    log(time[0] + time[1] + ":" + time[3] + time[4]);
    log("Days: ");
    log(days);
    print(days.contains("Everyday"));
    if (response.statusCode == 200) {
      if (await NotificationServices().checkNotificationPermission()) {
        NotificationServices().scheduleNotifications(
            hour: int.parse(time[0] + time[1]),
            minute: int.parse(time[3] + time[4]),
            repeats: days.contains("Everyday"),
            medicineName: name);
      }
      Get.back();
    } else {
      Get.snackbar("Error", "cannot get Medicine details");
    }

    log(meds.toString());

    return meds;
  }
}
