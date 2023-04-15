import 'package:age_well/theme/fontStyles.dart';
import 'package:age_well/view/home/reminder.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../languages/language.dart';
import 'health_details.dart';

class HealthTabScreen extends StatefulWidget {
  const HealthTabScreen({Key? key}) : super(key: key);

  @override
  State<HealthTabScreen> createState() => _HealthTabScreenState();
}

class _HealthTabScreenState extends State<HealthTabScreen> {
  final _currentpage = 0.obs;

  var pages = [
    ReminderScreen(),
    HealthDetails(),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            const SizedBox(
              height: 20,
            ),
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 20),
              child: Align(
                alignment: Alignment.topLeft,
                child: Text(
                  Languages.of(context).health,
                  style: HeadingText,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              height: 50,
              decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey.shade300,
                        blurRadius: 5,
                        spreadRadius: 5)
                  ],
                  borderRadius: BorderRadius.circular(20)),
              child: TabBar(
                labelColor: Colors.white,
                indicator: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    color: const Color.fromRGBO(14, 61, 154, 1)),
                tabs: [
                  Tab(
                    text: Languages.of(context).viewReminders,
                  ),
                  Tab(
                    text: Languages.of(context).healthDetails,
                  )
                ],
                onTap: (index) {
                  _currentpage.value = index;
                  setState(() {});
                },
              ),
            ),
            Expanded(child: pages[_currentpage.value])
          ],
        ),
      ),
    );
  }
}
