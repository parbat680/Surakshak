import 'package:age_well/services/repo/cached.dart';
import 'package:age_well/theme/light.dart';
import 'package:age_well/utils/cache_language.dart';
import 'package:age_well/utils/speech.dart';
import 'package:age_well/view/home/bottom_nav.dart';
import 'package:age_well/view/home/passkey.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

import 'bloc/locale/locale_bloc.dart';

void main() async {
  runApp(MyApp());
  WidgetsFlutterBinding.ensureInitialized();
  await CacheLanguage.init();
  await GetStorage.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  CacheData cache = CacheData();

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LocaleBloc(),
      child: GetMaterialApp(
        title: 'Surakshak',
        debugShowCheckedModeBanner: false,
        theme: LightTheme,
        home: CacheData().getToken() == null ? const PasskeyScreen() : Speech(),
      ),
    );
  }
}
