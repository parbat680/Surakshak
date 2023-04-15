import 'package:flutter/material.dart';

extension Custom on Widget {
  Container roundCard(Color color, {double? margin}) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(10),
      margin: EdgeInsets.all(margin ?? 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: color,
      ),
      child: this,
    );
  }

  Container wrapCard(Color color, {double? margin}) {
    return Container(
      padding: const EdgeInsets.all(10),
      margin: EdgeInsets.all(margin ?? 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: color,
      ),
      child: this,
    );
  }

  Container margin(double margin) {
    return Container(
      margin: EdgeInsets.all(margin),
      child: this,
    );
  }
}
