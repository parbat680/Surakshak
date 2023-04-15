import 'package:get_storage/get_storage.dart';

class CacheData {
  GetStorage box = GetStorage();

  getToken() {
    return box.read("token");
  }

  void addToken(String token) {
    box.write("token", token);
  }

  void deleteToken(String token) {
    box.remove("token");
  }
}
