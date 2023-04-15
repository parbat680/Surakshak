class MedModel {
  String? seniorId;
  String? name;
  String? days;
  String? time;
  int? duration;
  String? image;
  String? sId;
  int? iV;

  MedModel(
      {this.seniorId,
      this.name,
      this.days,
      this.time,
      this.duration,
      this.image,
      this.sId,
      this.iV});

  MedModel.fromJson(Map<String, dynamic> json) {
    seniorId = json['seniorId'];
    name = json['name'];
    days = json['days'];
    time = json['time'];
    duration = json['duration'];
    image = json['image'];
    sId = json['_id'];
    iV = json['__v'];
  }
}
