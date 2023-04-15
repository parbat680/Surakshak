class VolunteerModel {
  String? sId;
  String? name;
  String? password;
  int? age;
  String? email;
  String? phone;
  int? iV;

  VolunteerModel(
      {this.sId,
      this.name,
      this.password,
      this.age,
      this.email,
      this.phone,
      this.iV});

  VolunteerModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    password = json['password'];
    age = json['age'];
    email = json['email'];
    phone = json['phone'];
    iV = json['__v'];
  }
}
