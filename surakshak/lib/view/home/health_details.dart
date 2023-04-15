import 'dart:developer';

import 'package:surakshak/extensions/card.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:surakshak/services/repo/health_details.dart';

import '../../languages/language.dart';
import '../../models/health_details.dart';
import 'package:number_inc_dec/number_inc_dec.dart';
import '../../theme/fontStyles.dart';

class HealthDetails extends StatefulWidget {
  const HealthDetails({super.key});

  @override
  State<HealthDetails> createState() => _HealthDetailsState();
}

final TextEditingController _pulseRateTextController = TextEditingController();
final TextEditingController _systolicTextController = TextEditingController();
final TextEditingController _distolicTextController = TextEditingController();
final TextEditingController _diabetesTextController = TextEditingController();
HealthDetailsModel healthDetailsModel = HealthDetailsModel(
    diabetes: '', sistolic: '', diastolic: '', pulseRate: '', date: '');

updateInformation() async {
  print("inside");
  await HealthDetailsHandler.update(healthDetailsModel);
  log('Function executed');
}

class _HealthDetailsState extends State<HealthDetails> {
  final items = ['Blood Pressure', 'Pulse Rate', 'Diabetes'];
  var value = 0;

  RxString dropDownvalue = "Blood Pressure".obs;
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ElevatedButton(
          onPressed: () async {
            healthDetailsPopUp();
          },
          style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 50),
              backgroundColor: Colors.green),
          child: Text(
            "Add Health Details",
            style: poppins.copyWith(
                color: Colors.white, fontWeight: FontWeight.w400),
          ),
        ).marginOnly(left: 10, right: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              Languages.of(context).health,
              style: poppins.copyWith(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.black),
            ),
            // ElevatedButton(
            //   onPressed: () async {
            //     await Get.to(() => AddMedicineScreen());
            //     setState(() {});
            //   },
            //   child: Text(
            //     "Add Medicine",
            //     style: poppins.copyWith(
            //         color: Colors.white, fontWeight: FontWeight.w400),
            //   ),
            //   style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
            // ),
          ],
        ).marginSymmetric(horizontal: 20, vertical: 20),
        Container(
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.shade400,
                  spreadRadius: 2,
                  blurRadius: 5,
                ),
              ]),
          height: 400,
          width: double.infinity,
          child: Column(
            children: [
              // Container(
              //   height: 1,
              //   width: double.infinity,
              //   color: Colors.black,
              // ),
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10, right: 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    GestureDetector(
                        onTap: () {},
                        child: const Icon(Icons.keyboard_arrow_left_outlined)),
                    const Text('14 Apr - 21 Apr'),
                    GestureDetector(
                        onTap: () {},
                        child: const Icon(Icons.keyboard_arrow_right_outlined)),
                  ],
                ),
              ),
              Container(
                margin: const EdgeInsets.only(top: 10),
                height: 1,
                width: double.infinity,
                color: Colors.black38,
              ),
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: EdgeInsets.only(left: 30, right: 30),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(Languages.of(context).days),
                    Text(Languages.of(context).bloodPressure),
                    Text(Languages.of(context).pulseRate),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Expanded(
                child: ListView.builder(
                  shrinkWrap: true,
                  // physics: NeverScrollableScrollPhysics(),
                  itemCount: 7,
                  itemBuilder: (_, index) {
                    return Container(
                      height: 40,
                      width: double.infinity,
                      padding: const EdgeInsets.only(left: 30, right: 30),
                      child: SizedBox(
                        height: 40,
                        width: double.infinity,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text((index + 1).toString()),
                            GestureDetector(
                                onTap: () {}, child: const Text('100')),
                            GestureDetector(
                                onTap: () {}, child: const Text('100')),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
        const SizedBox(
          height: 10,
        ),
        Container(
            margin: const EdgeInsets.only(left: 40, bottom: 10, right: 40),
            child: RichText(
              text: const TextSpan(
                children: [
                  TextSpan(
                      text: '" The purpose of our lives is to be happy."\n',
                      style: TextStyle(
                          color: Colors.black,
                          fontStyle: FontStyle.italic,
                          fontWeight: FontWeight.bold)),
                  TextSpan(
                      text: '— Dalai Lama',
                      style: TextStyle(color: Colors.black))
                ],
              ),
            )
            // child: Text('" The purpose of our lives is to be happy." — Dalai Lama'),

            )
      ],
    ).roundCard(Colors.white, margin: 10));
  }

  healthDetailsPopUp() {
    showDialog(
      barrierDismissible: true,
      context: context,
      builder: ((context) {
        return Dialog(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Enter Health Details',
                style: TextStyle(
                  fontSize: 24,
                  // fontWeight: FontWeight.bold,
                ),
              ).marginOnly(top: 10, left: 10),
              Container(
                margin: const EdgeInsets.only(top: 10),
                height: 1,
                width: double.infinity,
                color: Colors.black38,
              ),
              // AspectRatio(
              //         aspectRatio: 12 / 10,
              //         child: Lottie.asset('assets/alert_image.json',
              //             fit: BoxFit.fill))
              //     .paddingAll(10),

              Obx(() => Column(children: [
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      children: [
                        const Text(
                          'Select Parameter: ',
                          style: TextStyle(
                              fontSize: 17, fontWeight: FontWeight.w600),
                        ),
                        DropdownButton(
                          // Initial Value
                          value: dropDownvalue.value.toString(),

                            // Down Arrow Icon
                            icon: const Icon(Icons.keyboard_arrow_down),

                            // Array list of items
                            items: items.map((String item) {
                              return DropdownMenuItem(
                                value: item,
                                child: Text(item).paddingAll(8),
                              );
                            }).toList(),
                            // After selecting the desired option,it will
                            // change button value to selected value
                            onChanged: (String? newValue) {
                              dropDownvalue.value = newValue!;
                              // Text('Hello');
                            },
                          ),
                          
                      ],
                    ),
                    if (dropDownvalue.value == 'Blood Pressure')
                      bloodPressure()
                    else if (dropDownvalue.value == 'Pulse Rate')
                      pulseRate()
                    else if (dropDownvalue.value == 'Diabetes')
                      diabetes()
                  ])),
              // Obx(
              //   () => Flexible(child: Text("Auto request in: $_start")),
              // ),
              // if (dropDownvalue.value == 'Blood Pressure')
              //   const Text('Blood Pressure')
              // else if (dropDownvalue.value == 'Pulse Rate')
              //   const Text('Pulse Rate')
              // else if (dropDownvalue.value == 'Diabetes')
              //   const Text('Diabetes'),
              const SizedBox(
                height: 10,
              ),

              ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                onPressed: () async {
                  // Get.back();
                  print('done');
                  log('Pressed');
                  healthDetailsModel.diabetes = _diabetesTextController.value;
                  healthDetailsModel.diastolic = _distolicTextController.value;
                  healthDetailsModel.sistolic = _systolicTextController.value;
                  healthDetailsModel.pulseRate = _pulseRateTextController.value;
                  print('no error');
                  log('Done????');
                  await updateInformation();
                  Get.back();
                },
                child: const Text('Submit'),
              ).marginSymmetric(horizontal: 21),
            ],
          ).paddingAll(10),
        );
      }),
    );
  }

  pulseRate() {
    return Column(
      children: [
        const SizedBox(
          height: 20,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            const Text(
              'Rate: ',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(
              width: 150,
              height: 60,
              child: SizedBox(
                height: 60,
                child: NumberInputWithIncrementDecrement(
                  min: 0,
                  controller: _pulseRateTextController,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

diabetes() {
  return Column(
    children: [
      const SizedBox(
        height: 20,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          const Text(
            'Sugar level: ',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(
            width: 150,
            height: 40,
            child: TextField(
              controller: _diabetesTextController,
              decoration: const InputDecoration(
                  hintText: 'Enter value',
                  border: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  )),
                  enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  ))),
              maxLines: 1,
            ),
          ),
        ],
      ),
      const SizedBox(
        height: 10,
      ),
    ],
  );
}

bloodPressure() {
  return Column(
    children: [
      const SizedBox(
        height: 20,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          const Text(
            'Systolic: ',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(
            width: 150,
            height: 40,
            child: TextField(
              controller: _systolicTextController,
              decoration: const InputDecoration(
                  hintText: 'Enter value',
                  border: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  )),
                  enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  ))),
              maxLines: 1,
            ),
          ),
        ],
      ),
      const SizedBox(
        height: 20,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          const Text(
            'Distolic: ',
            style: TextStyle(fontSize: 18),
          ),
          SizedBox(
            width: 150,
            height: 40,
            child: TextField(
              controller: _distolicTextController,
              decoration: const InputDecoration(
                  hintText: 'Enter value',
                  border: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  )),
                  enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(
                    color: Colors.black38,
                  ))),
              maxLines: 1,
            ),
          ),
        ],
      ),
    ],
  );
}
