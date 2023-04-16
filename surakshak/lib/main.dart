import 'package:surakshak/services/repo/cached.dart';
import 'package:surakshak/theme/light.dart';
import 'package:surakshak/utils/cache_language.dart';
import 'package:surakshak/utils/global_nav.dart';
import 'package:surakshak/utils/speech.dart';
import 'package:surakshak/view/home/bottom_nav.dart';
import 'package:surakshak/view/home/passkey.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:surakshak/view/splash_screen.dart';

import 'bloc/locale/locale_bloc.dart';

void main() async {
  runApp(MyApp());
  WidgetsFlutterBinding.ensureInitialized();
  await CacheLanguage.init();
  await GetStorage.init();
  await CacheLanguage.init();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  CacheData cache = CacheData();

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => LocaleBloc(),
      child: BlocBuilder<LocaleBloc, LocaleState>(
        buildWhen: (previous, current) {
          if(current is ChangeLocale){
            return true;
          }
          return false;
        },
        builder: (context, state) {
          return GetMaterialApp(
            title: 'Surakshak',
            debugShowCheckedModeBanner: false,
            theme: LightTheme,
            home: CacheData().getToken() == null
                ? PasskeyScreen()
                : BottomNavBar(),
            navigatorKey: GlobalNvaigator.navigatorKey,
          );
        },
      ),
    );
  }
}
