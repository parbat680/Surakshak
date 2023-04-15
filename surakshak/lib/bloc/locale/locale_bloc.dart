import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

import '../../utils/cache_language.dart';

part 'locale_event.dart';
part 'locale_state.dart';

class LocaleBloc extends Bloc<LocaleEvent, LocaleState> {
  LocaleBloc() : super(LocaleInitial()) {
    on<LocaleEvent>((event, emit) async {
      if (event is GetLocale) {
        final locale = CacheLanguage.getLanguage();
        emit(ChangeLocale(locale: Locale(locale)));
      } else if (event is ChangeLocaleInfo) {
        await CacheLanguage.setLanguage(event.locale);
        emit(ChangeLocale(locale: Locale(event.locale)));
      }
    });
  }
}
