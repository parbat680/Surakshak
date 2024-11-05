import 'dart:developer';

import 'package:surakshak/extensions/card.dart';
import 'package:surakshak/languages/language.dart';
import 'package:surakshak/models/volunteer.dart';
import 'package:surakshak/services/repo/volenteers.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:url_launcher/url_launcher.dart';

class VolunteerCard extends StatelessWidget {
  const VolunteerCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          Languages.of().volunteers,
          style: poppins.copyWith(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const Divider(),
        FutureBuilder(
            future: VolenteerHelper.getVolunteers(),
            builder: (context, AsyncSnapshot<List<VolunteerModel>> snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              } else if (snapshot.hasData) {
                List<VolunteerModel> v = snapshot.data!;
                return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: v.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(
                          v[index].name ?? "NA",
                          style: poppins.copyWith(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          v[index].phone ?? "NA",
                          style: poppins.copyWith(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        trailing: IconButton(
                          icon: const Icon(Icons.call),
                          color: Colors.green,
                          onPressed: () {
                            try {
                              launchUrl(
                                Uri(scheme: 'tel', path: v[index].phone),
                                mode: LaunchMode.externalApplication,
                              );
                            } catch (e) {
                              log("calling error");
                            }
                          },
                        ),
                      );
                    });
              }
              return const Text("Error");
            }),
      ],
    ).roundCard(Colors.grey.shade300).marginSymmetric(horizontal: 20, vertical: 20);
  }
}
