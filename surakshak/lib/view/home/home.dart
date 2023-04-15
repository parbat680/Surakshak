import 'dart:async';
import 'dart:developer';

import 'package:surakshak/extensions/card.dart';
import 'package:surakshak/services/repo/sos.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:surakshak/view/widgets/volenteer_card.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(
              height: 20,
            ),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.favorite_outline,
                  color: Colors.white,
                ),
                const SizedBox(
                  width: 10,
                ),
                Text(
                  "Welcome to Surakshak",
                  style: poppins.copyWith(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
              ],
            ).wrapCard(Colors.blue.shade200).marginOnly(
                  left: 20,
                ),
            GestureDetector(
                onTap: () {
                  log("tapped");
                  showSosPopup();
                },
                child: Lottie.asset('assets/sos_anim.json')),
            const VolunteerCard(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.orange,
        onPressed: () {
          // Get.to(() => GPTPage());
        },
        child: const Icon(
          Icons.chat,
          color: Colors.white,
        ),
      ),
    );
  }

  showSosPopup() {
    showDialog(
        barrierDismissible: false,
        context: context,
        builder: ((context) {
          startTimer();
          return Dialog(
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                AspectRatio(
                        aspectRatio: 12 / 10,
                        child: Lottie.asset('assets/alert_image.json',
                            fit: BoxFit.fill))
                    .paddingAll(10),
                ElevatedButton(
                  onPressed: () {
                    sendSos("Severe");
                  },
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                  child: Text(
                    "Severe",
                    style: poppins.copyWith(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    sendSos("Moderate");
                  },
                  style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red.shade300),
                  child: Text(
                    "Moderate",
                    style: poppins.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    sendSos("Mild");
                  },
                  style:
                      ElevatedButton.styleFrom(backgroundColor: Colors.orange),
                  child: Text(
                    "Mild",
                    style: poppins.copyWith(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
                Obx(
                  () => Flexible(child: Text("Auto request in: $_start")),
                ),
                const SizedBox(
                  height: 10,
                ),
                GestureDetector(
                  onTap: () {
                    _timer.cancel();
                    Get.back();
                  },
                  child: Container(
                    child: const Icon(
                      Icons.cancel,
                      color: Colors.red,
                      size: 70,
                    ),
                  ),
                )
              ],
            ).paddingAll(10),
          );
        }));
  }

  sendSos(String condition) {
    SosHelper.sendSos(condition);
    _timer.cancel();

    Get.back();
  }

  final RxInt _start = 10.obs;
  late Timer _timer;

  void startTimer() {
    _start.value = 10;
    const oneSec = Duration(seconds: 1);
    _timer = Timer.periodic(
      oneSec,
      (Timer timer) {
        if (_start.value == 0) {
          sendSos("severe");
        } else {
          _start.value--;
        }
      },
    );
  }

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
  }
}
