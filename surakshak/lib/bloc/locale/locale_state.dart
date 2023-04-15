part of 'locale_bloc.dart';

@immutable
abstract class LocaleState extends Equatable {}

class LocaleInitial extends LocaleState {
  final String s = '';
  @override
  List<Object?> get props => [];
}

class ChangeLocale extends LocaleState {
  final Locale locale;

  ChangeLocale({required this.locale});

  @override
  List<Object?> get props => [locale.languageCode];
}
