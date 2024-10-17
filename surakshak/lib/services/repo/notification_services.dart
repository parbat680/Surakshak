import 'dart:developer';

import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:flutter/material.dart';

class NotificationServices {
  Future<bool> checkNotificationPermission() async {
    await AwesomeNotifications().isNotificationAllowed().then(
      (isAllowed) async {
        if (!isAllowed) {
          bool isGranted = await AwesomeNotifications()
              .requestPermissionToSendNotifications();
          if (isGranted) {
            return true;
          }
          return false;
        }
      },
    );
    return true;
  }

  Future<void> initializeNotification() async {
    log("Notification permission function");
    await AwesomeNotifications().initialize(
      null,
      [
        NotificationChannel(
          // channelGroupKey: 'high_importance_channel',
          channelKey: 'scheduled_channel',
          channelName: 'Basic notifications',
          channelDescription: 'Notification channel for basic tests',
          defaultColor: const Color(0xFF9D50DD),
          ledColor: Colors.white,
          importance: NotificationImportance.Max,
          channelShowBadge: true,
          onlyAlertOnce: true,
          playSound: true,
          criticalAlerts: true,
        )
      ],
      // channelGroups: [
      //   NotificationChannelGroup(
      //     channelGroupKey: 'high_importance_channel_group',
      //     channelGroupName: 'Group 1',
      //   )
      // ],
      debug: true,
    );
    // await AwesomeNotifications().setListeners(
    //   onActionReceivedMethod: onActionReceivedMethod,
    //   onNotificationCreatedMethod: onNotificationCreatedMethod,
    //   onNotificationDisplayedMethod: onNotificationDisplayedMethod,
    //   onDismissActionReceivedMethod: onDismissActionReceivedMethod,
    // );
  }

  void scheduleNotifications({
    int? year,
    int? month,
    int? day,
    required int hour,
    required int minute,
    required bool repeats,
    required String medicineName,
  }) async {
    String localTimeZone =
        await AwesomeNotifications().getLocalTimeZoneIdentifier();
    // Medicine 1: Everyday at 6:00 PM
    AwesomeNotifications().createNotification(
      content: NotificationContent(
        id: 1,
        channelKey: 'scheduled_channel',
        title: 'Medicine Reminder',
        body: 'Time to take ${medicineName}',
      ),
      schedule: NotificationCalendar(
        year: DateTime.now().year,
        month: DateTime.now().month,
        day: DateTime.now().day,
        hour: hour, // 6:00 PM
        minute: minute,
        second: 0,
        millisecond: 0,
        repeats: repeats, // Repeat every day
      ),
      // schedule: NotificationInterval(interval: 5, timeZone: localTimeZone, repeats: false, preciseAlarm: true)
    );

    // Medicine 2: Every Monday and Wednesday at 1:00 PM
    // for (var day in [DateTime.monday, DateTime.wednesday]) {
    //   AwesomeNotifications().createNotification(
    //     content: NotificationContent(
    //       id: -1,
    //       channelKey: 'scheduled_channel',
    //       title: 'Medicine Reminder',
    //       body: 'Time to take Medicine 2',
    //     ),
    //     schedule: NotificationCalendar(
    //       year: DateTime.now().year,
    //       month: DateTime.now().month,
    //       day: DateTime.now().day,
    //       hour: 13, // 1:00 PM
    //       minute: 0,
    //       second: 0,
    //       millisecond: 0,
    //       repeats: true,
    //       weekday: day,
    //     ),
    //   );
    // }
  }
}
