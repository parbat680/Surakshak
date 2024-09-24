import 'dart:io';
import 'dart:developer';

import 'package:surakshak/extensions/card.dart';
import 'package:surakshak/services/repo/medicines.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:surakshak/utils/image.dart';
import 'package:flutter/material.dart';
// import 'package:flutter_fast_forms/flutter_fast_forms.dart';
import 'package:get/get.dart';
import 'package:loader_overlay/loader_overlay.dart';
import '../extensions/card.dart';
import '../languages/language.dart';

class AddMedicineScreen extends StatefulWidget {
  const AddMedicineScreen({super.key});

  @override
  State<AddMedicineScreen> createState() => _AddMedicineScreenState();
}

class _AddMedicineScreenState extends State<AddMedicineScreen> {
  final _formKey = GlobalKey<FormState>();

  File? _image;
  RxBool ispicked = false.obs;
  List<TimeOfDay> dosage_time = [];
  List days = [];
  String? name, dosage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LoaderOverlay(
        child: SafeArea(
          child: SingleChildScrollView(
            child: Row(
              children: [
                // Expanded(
                //   child: FastForm(
                //     formKey: _formKey,
                //     children: [
                //       LabelText("${Languages.of(context).addMedicine}"),
                //       FastTextField(
                //         contentPadding: const EdgeInsets.all(15),
                //         name: 'medicine_name',
                //         labelText: '${Languages.of(context).medicineName}',
                //         placeholder: 'Medicine Name',
                //         validator: (value) {
                //           if (value == null || value.isEmpty) {
                //             return "Enter medicine name";
                //           }
                //           return null;
                //         },
                //         onSaved: (value) {
                //           name = value;
                //         },
                //       ),
                //       const SizedBox(
                //         height: 20,
                //       ),
                //       FastTextField(
                //         keyboardType: TextInputType.number,
                //         contentPadding: const EdgeInsets.all(15),
                //         name: 'medicine_duration',
                //         labelText: '${Languages.of(context).duration}',
                //         placeholder: '${Languages.of(context).duration}',
                //         validator: (value) {
                //           if (value == null || value.isEmpty) {
                //             return "Enter medicine dosage";
                //           }
                //           return null;
                //         },
                //         onSaved: (val) {
                //           dosage = val;
                //         },
                //       ),
                //       const SizedBox(
                //         height: 20,
                //       ),
                //       // FastChoiceChips(
                //       //   name: 'choice_chips',
                //       //   labelText: '${Languages.of(context).choiceChips}',
                //       //   alignment: WrapAlignment.center,
                //       //   chipPadding: const EdgeInsets.all(8.0),
                //       //   onSaved: (value) {
                //       //     days = value!;
                //       //   },
                //       //   chips: [
                //       //     FastChoiceChip(
                //       //       avatar: const Icon(Icons.calendar_view_week),
                //       //       selected: false,
                //       //       value: '${Languages.of(context).everyday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       value: '${Languages.of(context).monday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).tuesday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).wednesday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).thursday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).friday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).saturday}',
                //       //     ),
                //       //     FastChoiceChip(
                //       //       selected: false,
                //       //       value: '${Languages.of(context).sunday}',
                //       //     ),
                //       //   ],
                //       //   validator: (value) => value == null || value.isEmpty
                //       //       ? 'Please select at least one day'
                //       //       : null,
                //       // ),
                //       const SizedBox(
                //         height: 20,
                //       ),
                //       FastTimePicker(
                //         name: 'time',
                //         labelText: '${Languages.of(context).dosageTime}',
                //         onChanged: (TimeOfDay? value) {
                //           if (!dosage_time.contains(value)) {
                //             dosage_time.add(value!);
                //           }
                //           setState(() {});
                //         },
                //         validator: (value) {
                //           if (dosage_time.isEmpty) {
                //             return "Selct atleast one slot";
                //           }
                //           return null;
                //         },
                //       ),
                //       const SizedBox(
                //         height: 20,
                //       ),
                //       Wrap(
                //         spacing: 10,
                //         children: dosage_time
                //             .map((e) => Container(
                //                   child: Text(e.format(context))
                //                       .wrapCard(Colors.blue.shade200),
                //                 ))
                //             .toList(),
                //       ),
                //       LabelText("${Languages.of(context).uploadImage}"),
                //       Container(
                //               padding: const EdgeInsets.all(20),
                //               height: 200,
                //               decoration: BoxDecoration(
                //                   border: Border.all(width: 1),
                //                   borderRadius: BorderRadius.circular(20)),
                //               child: _image == null
                //                   ? Center(
                //                       child: IconButton(
                //                         icon: const Icon(
                //                           Icons.camera_alt,
                //                           size: 30,
                //                         ),
                //                         onPressed: () {
                //                           PopupSelector(context);
                //                         },
                //                       ),
                //                     )
                //                   : Image.file(
                //                       _image!,
                //                       fit: BoxFit.contain,
                //                     ))
                //           .roundCard(Colors.transparent),
                //       ElevatedButton(
                //         onPressed: () async {
                //           if (_formKey.currentState!.validate() &&
                //               _image != null) {
                //             _formKey.currentState!.save();
                //             log("$name $dosage $dosage_time $days");
                //             List time = [];
                //             for (int i = 0; i < dosage_time.length; i++) {
                //               time.add(
                //                   "${dosage_time[i].hour}:${dosage_time[i].minute}");
                //             }
                //             context.loaderOverlay.show();
                //             try {
                //               await MedicineHandler.addMedicines(name!, dosage!,
                //                   days.join(","), time.join(","), _image!);
                //             } catch (e) {
                //               log(e.toString());
                //             }
                //             context.loaderOverlay.hide();
                //           }
                //         },
                //         style: ElevatedButton.styleFrom(
                //             minimumSize: const Size(double.infinity, 50),
                //             backgroundColor: Colors.green),
                //         child: Text(
                //           "${Languages.of(context).addMedicine}",
                //           style: poppins.copyWith(
                //               color: Colors.white, fontWeight: FontWeight.w400),
                //         ),
                //       ).marginOnly(top: 10),
                //     ],
                //   ).marginSymmetric(horizontal: 20, vertical: 10),
                // ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  LabelText(String label) {
    return Text(
      label,
      style: poppins.copyWith(fontSize: 18, fontWeight: FontWeight.bold),
    ).marginAll(20);
  }

  PopupSelector(context) {
    SingleImagePicker picker = SingleImagePicker();
    showModalBottomSheet(
        context: context,
        builder: (BuildContext bc) {
          return SafeArea(
            child: Wrap(
              children: [
                ListTile(
                  leading: const Icon(
                    Icons.image,
                  ),
                  title: const Text(
                    "Choose from gallery",
                    style: TextStyle(),
                  ),
                  onTap: () async {
                    Navigator.pop(context);
                    _image = await picker.galleryPick();
                    setState(() {});
                  },
                ),
                ListTile(
                  leading: const Icon(
                    Icons.camera_enhance_rounded,
                  ),
                  title: const Text("Choose from camera", style: TextStyle()),
                  onTap: () async {
                    Navigator.pop(context);
                    _image = await picker.cameraPick();
                    setState(() {});
                  },
                ),
              ],
            ),
          );
        });
  }
}
