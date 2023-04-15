import 'package:surakshak/languages/language.dart';
import 'package:surakshak/languages/language_hi.dart';
import 'package:surakshak/models/medicine.dart';
import 'package:get/get.dart';

import '../../extensions/card.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:flutter/material.dart';

class MedicineCard extends StatelessWidget {
  MedicineCard({super.key, required this.meds});

  MedModel meds;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(
        maxHeight: 380,
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
                        child: meds.image == null
                            ? Image.asset(
                                "assets/medicine.png",
                                fit: BoxFit.fill,
                                width: double.infinity,
                                height: 200,
                              )
                            : Image.network(
                                meds.image!,
                                fit: BoxFit.fill,
                                width: double.infinity,
                                height: 200,
                              )),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Text(
                    meds.name!,
                    style: HeadingText.copyWith(fontSize: 16),
                  ).marginSymmetric(horizontal: 20),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    "${Languages.of(context).duration} : ${meds.duration.toString()}",
                    style: HeadingText.copyWith(
                      fontSize: 14,
                    ),
                  ).marginSymmetric(horizontal: 20),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    "${Languages.of(context).time} : ${meds.time.toString()}",
                    style: HeadingText.copyWith(
                      fontSize: 14,
                    ),
                  ).marginSymmetric(horizontal: 20),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    meds.days!,
                    style:
                        HeadingText.copyWith(fontSize: 14, color: Colors.grey),
                  ).marginSymmetric(horizontal: 20),
                  const SizedBox(
                    height: 10,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.orange),
                          child: Text(
                            Languages.of(context).update,
                            style: poppins.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 20,
                      ),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red),
                          child: Text(
                            Languages.of(context).delete,
                            style: poppins.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                      )
                    ],
                  ).marginSymmetric(horizontal: 22),
                  const SizedBox(
                    height: 10,
                  ),
                ])),
      ),
    );
  }

  getDescription(BuildContext context) {
    RxBool showMore = false.obs;

    return Obx(() => Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...kkfekrlnflkernglenrg",
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
                    showMore.value ? Languages.of(context).showLess : Languages.of(context).showMore,
                    style: poppins.copyWith(color: Colors.blue),
                  )),
            )
          ],
        ).roundCard(Colors.grey.shade300).marginSymmetric(
              horizontal: 20,
            ));
  }
}
