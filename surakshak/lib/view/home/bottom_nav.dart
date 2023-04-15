import 'dart:developer';

import 'package:age_well/view/home/events.dart';
import 'package:age_well/view/home/health_tab.dart';
import 'package:age_well/view/home/home.dart';
import 'package:age_well/view/home/profile.dart';
import 'package:convex_bottom_bar/convex_bottom_bar.dart';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../languages/language.dart';

class BottomNavBar extends StatefulWidget {
  const BottomNavBar({Key? key}) : super(key: key);

  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar>
    with SingleTickerProviderStateMixin {
  late TabController _controller;

  @override
  void initState() {
    _controller = TabController(length: 4, vsync: this);
    super.initState();
  }

  final _screens = [
    const HomeScreen(),
    const EventsScreen(),
    const HealthTabScreen(),
    ProfileScreen()
  ];
  RxInt index = 0.obs;

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 4,
        child: Container(
          color: Theme.of(context).canvasColor,
          child: SafeArea(
            child: Theme(
              data: _tabTheme,
              child: Scaffold(
                  body: Obx(() => _screens[index.value]),
                  bottomNavigationBar: ConvexAppBar(
                      controller: _controller,
                      disableDefaultTabController: true,
                      style: TabStyle.react,
                      activeColor: Colors.white,
                      onTap: (i) {
                        index(i);
                        log(i.toString());
                      },
                      items: _tabBar)),
            ),
          ),
        ));
  }

  get _tabBar => [
        TabItem(
            title: Languages.of(context).appName,
            icon: Icons.home_outlined,
            activeIcon: Icons.home_filled),
        TabItem(
          title: Languages.of(context).events,
          icon: Icons.event_available_outlined,
          activeIcon: Icons.event,
        ),
        TabItem(
          title: Languages.of(context).health,
          icon: Icons.health_and_safety_outlined,
          activeIcon: Icons.health_and_safety,
        ),
        TabItem(
          title: Languages.of(context).profile,
          icon: Icons.account_circle_outlined,
          activeIcon: Icons.account_circle,
        ),
      ];

  ThemeData get _tabTheme => ThemeData(
        tabBarTheme: const TabBarTheme(
          indicatorSize: TabBarIndicatorSize.tab,
          labelColor: Color.fromARGB(255, 0, 0, 0),
          unselectedLabelColor: Color.fromRGBO(123, 123, 123, 1),
        ),
      );
}
