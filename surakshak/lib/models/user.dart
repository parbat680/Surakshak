class UserModel {
  String? name;
  int? age;
  String? email;
  String? phone;

  UserModel({this.name, this.age, this.email, this.phone});

  UserModel.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    age = json['age'];
    email = json['email'];
    phone = json['phone'];
  }
}
