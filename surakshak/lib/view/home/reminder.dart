import 'package:surakshak/languages/language.dart';
import 'package:surakshak/services/repo/medicines.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:surakshak/view/add_medicine.dart';
import 'package:surakshak/view/widgets/medicine_box.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../models/medicine.dart';

class ReminderScreen extends StatefulWidget {
  const ReminderScreen({super.key});

  @override
  State<ReminderScreen> createState() => _ReminderScreenState();
}

class _ReminderScreenState extends State<ReminderScreen> {
  var _getMeds;
  @override
  void initState() {
    _getMeds = MedicineHandler.getMedicines();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                Languages.of().viewReminders,
                style: poppins.copyWith(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.black),
              ),
              ElevatedButton(
                onPressed: () async {
                  await Get.to(() => const AddMedicineScreen());
                  setState(() {});
                },
                style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                child: Text(
                  Languages.of().addMedicine,
                  style: poppins.copyWith(
                      color: Colors.white, fontWeight: FontWeight.w400),
                ),
              ),
            ],
          ).marginSymmetric(horizontal: 20, vertical: 20),
          FutureBuilder(
              future: MedicineHandler.getMedicines(),
              builder: (context, AsyncSnapshot<List<MedModel>> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: const CircularProgressIndicator().marginOnly(top: 20));
                } else if (snapshot.hasData) {
                  List<MedModel> meds = snapshot.data!;
                  return ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: meds.length,
                      itemBuilder: (context, index) {
                        return MedicineCard(
                          meds: meds[index],
                        );
                      });
                }
                return const Text("Error Occured");
              })
        ],
      ),
    );
  }
}
