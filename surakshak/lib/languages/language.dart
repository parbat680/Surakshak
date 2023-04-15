import 'package:flutter/cupertino.dart';

import '../utils/cache_language.dart';
import 'language_en.dart';
import 'language_hi.dart';

abstract class Languages {
  static Languages of(BuildContext context) {
    String lang = CacheLanguage.getLanguage();
    return loadLang(Locale(lang));
  }

  static loadLang(Locale locale) {
    switch (locale.languageCode) {
      case 'en':
        return LanguageEN();

      case 'hn':
        return LanguageHN();

      default:
        return LanguageEN();
    }
  }

  String get appName;
  String get country;
  String get phone;
  String get welcome;
  String get profile;
  String get health;
  String get events;
  String get eventsPage;
  String get days;
  String get bloodPressure;
  String get pulseRate;
  String get createAccount;
  String get reminders;
  String get addMedicine;
  String get medicineName;
  String get medicineDuration;
  String get choiceChips;
  String get everyday;
  String get monday;
  String get tuesday;
  String get wednesday;
  String get thursday;
  String get friday;
  String get saturday;
  String get sunday;
  String get dosageTime;
  String get uploadImage;

  String get orderHistory;
  String get settings;
  String get logout;

  String get healthDetails;

  // View reminders
  String get viewReminders;

  String get music;
  String get showMore;
  String get date;
  String get time;
  String get bookCab;
  String get viewMap;
  String get duration;
  String get update;
  String get delete;
  String get addHealthDetails;
  String get userSettings;
  String get changeLanguage;
  String get toggleLanguages;
  String get manageSettings;
  String get notifications;
  String get news;
  String get support;
  String get help;
  String get logoutAccount;
}
