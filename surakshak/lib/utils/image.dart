import 'dart:io';

import 'package:image_picker/image_picker.dart';

class SingleImagePicker {
  cameraPick() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.camera);
    return File(picked!.path);
  }

  galleryPick() async {
    final picked = await ImagePicker().pickImage(source: ImageSource.gallery);
    return File(picked!.path);
  }
}
