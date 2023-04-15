import 'package:flutter/cupertino.dart';

import '../languages/language.dart';
import '../languages/language_en.dart';
import '../languages/language_hi.dart';

class AppLocalizationDelegate extends LocalizationsDelegate<Languages> {
  const AppLocalizationDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'hn'].contains(locale.languageCode);
  }

  static Languages? instance;

  @override
  Future<Languages> load(Locale locale) {
    _load(locale).then((value) => instance = value);
    return _load(locale);
  }

  Future<Languages> _load(Locale locale) async {
    switch (locale.languageCode) {
      case 'en':
        return LanguageEN();

      case 'hn':
        return LanguageHN();

      default:
        return LanguageEN();
    }
  }

  @override
  bool shouldReload(covariant LocalizationsDelegate old) {
    return false;
  }
}
