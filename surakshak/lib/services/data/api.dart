import 'dart:developer';
import 'dart:io';
import 'package:age_well/services/repo/cached.dart';
import 'package:dio/dio.dart';
import 'package:http_parser/http_parser.dart';

import '../../constants.dart';

enum Methods {
  // ignore: constant_identifier_names
  GET,
  // ignore: constant_identifier_names
  POST
}

class ApiHandler {
  final CacheData _cache = CacheData();

  Future makeApiCall({body, required Methods methods, endpoint, query}) async {
    if (methods == Methods.GET) {
      get(endpoint, query);
    } else if (methods == Methods.POST) {
      post(endpoint, body);
    }
  }

  Future<Response> post(String endpoint, Map<dynamic, dynamic> data) async {
    var dio = Dio();

    var response = await dio.post(
      "$url/$endpoint",
      data: data,
      options: Options(headers: {
        'content-type': 'application/json',
        'token': _cache.getToken()
      }),
    );
    log(response.toString());

    return response;
  }

  Future<Response> get(String endpoint, String query) async {
    var dio = Dio();

    var response = await dio.get(
      "$url/$endpoint/$query",
      options: Options(headers: {
        'content-type': 'application/json',
        'token': _cache.getToken()
      }),
    );

    return response;
  }

  uploadImage(File file, String endpoint, Map<String, String> formdata) async {
    String fileName = file.path.split('/').last;
    print(fileName);

    FormData data = FormData.fromMap({
      "image": await MultipartFile.fromFile(file.path,
          filename: fileName, contentType: MediaType('image', 'png')),
      "name": formdata['name'],
      "days": formdata['days'],
      "time": formdata['time'],
      "duration": formdata['duration']
    });

    Dio dio = Dio();

    var response = await dio.post("$url/$endpoint",
        data: data, options: Options(headers: {"token": _cache.getToken()}));

    return response;
  }
}
