part of 'locale_bloc.dart';

@immutable
abstract class LocaleEvent {}

class GetLocale extends LocaleEvent {}

class ChangeLocaleInfo extends LocaleEvent {
  final locale;
  ChangeLocaleInfo({required this.locale});
}
