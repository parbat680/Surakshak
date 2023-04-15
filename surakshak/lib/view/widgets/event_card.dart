import 'dart:developer';

import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../extensions/card.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:flutter/material.dart';

import '../../models/event.dart';

class EventCard extends StatelessWidget {
  const EventCard({super.key, required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context) {
    String date = DateFormat('dd/MM/yyyy').format(DateTime.parse(event.date!));
    return Container(
      constraints: const BoxConstraints(
        maxHeight: 650,
      ),
      child: AspectRatio(
        aspectRatio: 8 / 12.5,
        child: Container(
          margin: const EdgeInsets.all(20),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.shade400,
                  spreadRadius: 5,
                  blurRadius: 5,
                ),
              ]),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Flexible(
                child: ClipRRect(
                  borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(20),
                      topRight: Radius.circular(20)),
                  child: Image.asset(
                    'assets/yoga.jpg',
                    fit: BoxFit.fill,
                    width: double.infinity,
                    height: 200,
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                event.name!,
                style: HeadingText,
              ).marginSymmetric(horizontal: 20),
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  const Icon(
                    Icons.location_on,
                    color: Color.fromRGBO(34, 61, 128, 1),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    event.address!,
                    style: poppins.copyWith(
                      fontSize: 14,
                      color: const Color.fromRGBO(34, 61, 128, 1),
                    ),
                  )
                ],
              ).roundCard(Colors.blue.shade100).marginSymmetric(horizontal: 20),
              const SizedBox(
                height: 10,
              ),
              getDescription(),
              const SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Text(
                    "Date: ",
                    style: poppins.copyWith(
                        fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    date,
                    style: poppins.copyWith(
                      fontSize: 16,
                    ),
                  ),
                  const Spacer(),
                  Text(
                    "Time:",
                    style: poppins.copyWith(
                        fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    event.duration!,
                    style: poppins.copyWith(
                      fontSize: 16,
                    ),
                  ),
                ],
              ).marginSymmetric(horizontal: 22),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Align(
                    alignment: Alignment.bottomLeft,
                    child: ElevatedButton(
                      onPressed: () {
                        String url =
                            "https://www.google.com/maps/search/?api=1&query='${event.address}";
                        try {
                          launchUrl(
                            Uri.parse(url),
                            mode: LaunchMode.externalApplication,
                          );
                        } catch (e) {
                          log("maps Error");
                        }
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue),
                      child: Text(
                        "Book a Cab ",
                        style: poppins.copyWith(
                            color: Colors.white, fontWeight: FontWeight.w400),
                      ),
                    ).marginSymmetric(horizontal: 20),
                  ),
                  Align(
                    alignment: Alignment.bottomRight,
                    child: ElevatedButton(
                      onPressed: () {
                        String url =
                            "https://www.google.com/maps/search/?api=1&query='${event.address}";
                        try {
                          launchUrl(
                            Uri.parse(url),
                            mode: LaunchMode.externalApplication,
                          );
                        } catch (e) {
                          log("maps Error");
                        }
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.orange),
                      child: Text(
                        "View on Map",
                        style: poppins.copyWith(
                            color: Colors.white, fontWeight: FontWeight.w400),
                      ),
                    ).marginSymmetric(horizontal: 20),
                  ),
                ],
              ).paddingSymmetric(horizontal: 10)
            ],
          ),
        ),
      ),
    );
  }

  getDescription() {
    RxBool showMore = false.obs;

    return Obx(() => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              event.desc!,
              style: poppins.copyWith(fontSize: 14),
              maxLines: showMore.value ? 7 : 3,
              overflow: TextOverflow.ellipsis,
            ),
            Align(
              alignment: Alignment.bottomRight,
              child: TextButton.icon(
                  onPressed: () {
                    showMore.value = !showMore.value;
                  },
                  icon: const Icon(Icons.arrow_drop_down),
                  label: Text(
                    showMore.value ? "show less" : "show more",
                    style: poppins.copyWith(color: Colors.blue),
                  )),
            )
          ],
        ).roundCard(Colors.grey.shade300).marginSymmetric(
              horizontal: 20,
            ));
  }
}
