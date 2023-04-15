import 'package:shared_preferences/shared_preferences.dart';

class CacheLanguage {
  static late SharedPreferences prefs;

  static Future<void> init() async {
    prefs = await SharedPreferences.getInstance();
  }

  static const String _language = 'Language';

  static String getLanguage() {
    final lang = prefs.getString(_language);

    if (lang == null) {
      return 'en';
    }

    return lang;
  }

  static Future<void> setLanguage(String lang) async {
    await prefs.setString(_language, lang);
  }
}
