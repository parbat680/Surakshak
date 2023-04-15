import 'package:surakshak/models/event.dart';
import 'package:surakshak/services/repo/events.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:surakshak/view/widgets/event_card.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../languages/language.dart';

class EventsScreen extends StatefulWidget {
  const EventsScreen({super.key});

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  var _getEvents;

  @override
  void initState() {
    _getEvents = EventHandler.getEvents();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            Languages.of(context).eventsPage,
            style: poppins.copyWith(
                fontSize: 26, fontWeight: FontWeight.bold, color: Colors.black),
          ).marginSymmetric(horizontal: 20, vertical: 20),
          FutureBuilder(
              future: _getEvents,
              builder: (context, AsyncSnapshot<List<EventModel>> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                      child: const CircularProgressIndicator()
                          .marginOnly(top: 20));
                } else if (snapshot.hasData) {
                  List<EventModel> events = snapshot.data!;
                  return ListView.builder(
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: events.length,
                      itemBuilder: (context, index) {
                        return EventCard(
                          event: events[index],
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
