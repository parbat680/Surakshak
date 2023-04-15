class EventModel {
  String? sId;
  String? organiserEmail;
  String? name;
  String? day;
  String? date;
  String? organiser;
  String? organiserPhone;
  String? address;
  String? facilities;
  String? duration;
  bool? food;
  bool? pick;
  String? desc;
  int? iV;

  EventModel(
      {this.sId,
      this.organiserEmail,
      this.name,
      this.day,
      this.date,
      this.organiser,
      this.organiserPhone,
      this.address,
      this.facilities,
      this.duration,
      this.food,
      this.pick,
      this.desc,
      this.iV});

  EventModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    organiserEmail = json['organiserEmail'];
    name = json['name'];
    day = json['day'];
    date = json['date'];
    organiser = json['organiser'];
    organiserPhone = json['organiserPhone'];
    address = json['address'];
    facilities = json['facilities'];
    duration = json['duration'];
    food = json['food'];
    pick = json['pick'];
    desc = json['desc'];
    iV = json['__v'];
  }
}
