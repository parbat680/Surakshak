import 'dart:developer';

import 'package:surakshak/models/event.dart';
import 'package:surakshak/services/data/api.dart';

class EventHandler {
  static final ApiHandler _apiHandler = ApiHandler();

  static Future<List<EventModel>> getEvents() async {
    List<EventModel> events = [];

    try {
      final response = await _apiHandler.post("event/get", {
        "address": "bo",
      });

      if (response.statusCode == 200) {
        var data = response.data as List;
        events = data.map((e) => EventModel.fromJson(e)).toList();
      }
    } catch (e) {
      log(e.toString());
    }

    return events;
  }
}
