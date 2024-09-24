import 'dart:developer';

import 'package:intl/intl.dart';
import 'package:surakshak/extensions/card.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:surakshak/services/repo/get_health_details.dart';
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
HealthDetailsModel healthDetailsModel =
    HealthDetailsModel(sistolic: '', diastolic: '', pulseRate: '', date: '');

List sevenDaysDetails = [];

updateInformation() async {
  print("inside");
  await UpdateHealthDetailsHandler.update(healthDetailsModel);
  log('Function executed');
  Get.back();
}

class _HealthDetailsState extends State<HealthDetails> {
  final items = ['Blood Pressure', 'Pulse Rate', 'Diabetes'];
  var value = 0;

  RxString dropDownvalue = "Blood Pressure".obs;
  @override
  void initState() {
    super.initState();
  }

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
                  // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(Languages.of(context).days),
                    SizedBox(width: 40),
                    Text(Languages.of(context).bloodPressure),
                    SizedBox(width: 30),
                    Text(Languages.of(context).pulseRate),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              //__________
              FutureBuilder(
                  future: HealthDetailsHandler.getHealthDetails(),
                  builder: (context,
                      AsyncSnapshot<List<HealthDetailsModel>> snapshot) {
                    log(snapshot.data.toString());
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(
                          child: const CircularProgressIndicator()
                              .marginOnly(top: 20));
                    }
                    List<HealthDetailsModel> healthDetails = snapshot.data ?? [];
                    return Expanded(
                      child: ListView.builder(
                        shrinkWrap: true,
                        // physics: NeverScrollableScrollPhysics(),
                        itemCount: healthDetails.length,
                        itemBuilder: (_, i) {
                          var d = DateFormat('yyyy-MM-dd')
                              .parse(healthDetails[i].date);
                          var date = DateFormat('dd/MM/yyyy').format(d);
                          return Container(
                            height: 40,
                            width: double.infinity,
                            padding: const EdgeInsets.only(left: 10, right: 30),
                            child: SizedBox(
                              height: 40,
                              width: double.infinity,
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(date),
                                  // Text(
                                  //     '${healthDetails[i].sistolic}/${healthDetails[i].diastolic}'),
                                  Row(
                                    children: [
                                      Text(healthDetails[i].sistolic<0 ? '- / ' : " ${healthDetails[i].sistolic} / "),
                                  Text(healthDetails[i].diastolic<0 ? '-' : " ${healthDetails[i].diastolic}"),
                                    ],
                                  ),
                                          
                                  GestureDetector(
                                      onTap: () {},
                                      child: Text(healthDetails[i]
                                          .pulseRate
                                          .toString())),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    );

                    // return const Text("Error Occured");
                  })
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
                  healthDetailsModel.diastolic = _distolicTextController.text;
                  healthDetailsModel.sistolic = _systolicTextController.text;
                  healthDetailsModel.pulseRate = _pulseRateTextController.text;

                  await updateInformation();
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
                child: TextFormField(
                  keyboardType: TextInputType.number,
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
