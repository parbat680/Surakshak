import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:surakshak/bloc/locale/locale_bloc.dart';
import 'package:surakshak/models/user.dart';
import 'package:surakshak/services/repo/profile.dart';
import 'package:flutter/material.dart';
import 'package:styled_widget/styled_widget.dart';
import 'package:surakshak/utils/cache_language.dart';
import 'package:toggle_switch/toggle_switch.dart';

import '../../languages/language.dart';

class ProfileScreen extends StatefulWidget {
  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    ProfileHandler.getVolunteers();

    final page = ({required Widget child}) => Styled.widget(child: child)
        .padding(vertical: 30, horizontal: 20)
        .constrained(minHeight: MediaQuery.of(context).size.height - (2 * 30))
        .scrollable();

    return <Widget>[
      Text(
        '${Languages.of().userSettings}',
        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 32),
      ).alignment(Alignment.center).padding(bottom: 20),
      UserCard(),
      Settings(),
    ].toColumn().parent(page);
  }
}

class UserCard extends StatelessWidget {
  Widget _buildUserRow() {
    return FutureBuilder(
      future: ProfileHandler.getVolunteers(),
      builder: (context, AsyncSnapshot<UserModel> snapshot) {
        return <Widget>[
          const Icon(Icons.account_circle)
              .decorated(
                color: Colors.white,
                borderRadius: BorderRadius.circular(30),
              )
              .constrained(height: 50, width: 50)
              .padding(right: 10),
          <Widget>[
            Text(
              snapshot.data == null ? '' : snapshot.data!.name!,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ).padding(bottom: 5),
            Text(
              snapshot.data == null ? "" : 'Phone: ${snapshot.data!.phone}',
              style: TextStyle(
                color: Colors.white.withOpacity(0.6),
                fontSize: 12,
              ),
            ),
          ].toColumn(crossAxisAlignment: CrossAxisAlignment.start),
        ].toRow();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return <Widget>[
      _buildUserRow(),
    ]
        .toColumn(mainAxisAlignment: MainAxisAlignment.spaceAround)
        .padding(horizontal: 20, vertical: 10)
        .decorated(
            color: const Color(0xff3977ff),
            borderRadius: BorderRadius.circular(20))
        .elevation(
          5,
          shadowColor: const Color(0xff3977ff),
          borderRadius: BorderRadius.circular(20),
        )
        .height(100)
        .alignment(Alignment.center);
  }
}

class SettingsItemModel {
  final IconData icon;
  final Color color;
  final String title;
  final String description;
  // final BuildContext context;
  const SettingsItemModel({
    // required this.context,
    required this.color,
    required this.description,
    required this.icon,
    required this.title,
  });
}

List<SettingsItemModel> settingsItems = [
  // SettingsItemModel(
  //   icon: Icons.edit,
  //   color: Color(0xff8D7AEE),
  //   title: 'Edit Profile',
  //   description: 'view and edit profile details',
  // ),
  SettingsItemModel(
    // context: context,
    icon: Icons.settings,
    color: Color(0xffF468B7),
    title: Languages.of().settings,
    description: Languages.of().manageSettings,
  ),
  SettingsItemModel(
    icon: Icons.notifications,
    color: Color(0xff5FD0D3),
    title: Languages.of().notifications,
    description: Languages.of().news,
  ),
  SettingsItemModel(
    icon: Icons.question_answer,
    color: Color(0xffBFACAA),
    title: Languages.of().support,
    description: Languages.of().help,
  ),
  SettingsItemModel(
    icon: Icons.exit_to_app,
    color: Color(0xffFEC85C),
    title: Languages.of().logout,
    description: Languages.of().logoutAccount,
  ),
];

class Settings extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SettingsItemToggle(Icons.edit, Color(0xff8D7AEE), '${Languages.of().changeLanguage}',
            '${Languages.of().toggleLanguages}'),
        settingsItems
            .map((settingsItem) => SettingsItem(

                  settingsItem.icon,
                  settingsItem.color,
                  settingsItem.title,
                  settingsItem.description,
                ))
            .toList()
            .toColumn()
      ],
    );
  }
}

class SettingsItem extends StatefulWidget {
  const SettingsItem(this.icon, this.iconBgColor, this.title, this.description);

  final IconData icon;
  final Color iconBgColor;
  final String title;
  final String description;
  // final Icon

  @override
  _SettingsItemState createState() => _SettingsItemState();
}

class _SettingsItemState extends State<SettingsItem> {
  bool pressed = false;

  @override
  Widget build(BuildContext context) {
    final settingsItem =
        ({required Widget child}) => Styled.widget(child: child)
            .alignment(Alignment.center)
            .borderRadius(all: 15)
            .ripple()
            .backgroundColor(Colors.white, animate: true)
            .clipRRect(all: 25) // clip ripple
            .borderRadius(all: 25, animate: true)
            .elevation(
              pressed ? 0 : 20,
              borderRadius: BorderRadius.circular(25),
              shadowColor: const Color(0x30000000),
            ) // shadow borderRadius
            .constrained(height: 80)
            .padding(vertical: 12) // margin
            .gestures(
              onTapChange: (tapStatus) => setState(() => pressed = tapStatus),
              onTapDown: (details) => print('tapDown'),
              onTap: () => print('onTap'),
            )
            .animate(const Duration(milliseconds: 150), Curves.easeOut);

    final Widget icon = Icon(widget.icon, size: 20, color: Colors.white)
        .padding(all: 12)
        .decorated(
          color: widget.iconBgColor,
          borderRadius: BorderRadius.circular(30),
        )
        .padding(left: 15, right: 10);

    final Widget title = Text(
      widget.title,
      style: const TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 16,
      ),
    ).padding(bottom: 5);

    final Widget description = Text(
      widget.description,
      style: const TextStyle(
        color: Colors.black26,
        fontWeight: FontWeight.bold,
        fontSize: 12,
      ),
    );

    return settingsItem(
      child: <Widget>[
        icon,
        <Widget>[
          title,
          description,
        ].toColumn(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
        ),
        // trailingToggleButton,
      ].toRow(),
    );
  }
  // trailingToggleButton() {
  //   return ToggleButtons(
  //               direction: Axis.horizontal
  //               onPressed: (int index) {
  //                 setState(() {
  //                   // The button that is tapped is set to true, and the others to false.
  //                   for (int i = 0; i < _selectedWeather.length; i++) {
  //                     _selectedWeather[i] = i == index;
  //                   }
  //                 });
  //               },
  // }
}

class SettingsItemToggle extends StatefulWidget {
  const SettingsItemToggle(
      this.icon, this.iconBgColor, this.title, this.description);

  final IconData icon;
  final Color iconBgColor;
  final String title;
  final String description;
  // final Icon

  @override
  _SettingsItemToggleState createState() => _SettingsItemToggleState();
}

class _SettingsItemToggleState extends State<SettingsItemToggle> {
  bool pressed = false;
  late LocaleBloc _localeBloc;

  @override
  void initState() {
    _localeBloc = BlocProvider.of<LocaleBloc>(context);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final settingsItem =
        ({required Widget child}) => Styled.widget(child: child)
            .alignment(Alignment.center)
            .borderRadius(all: 15)
            .ripple()
            .backgroundColor(Colors.white, animate: true)
            .clipRRect(all: 25) // clip ripple
            .borderRadius(all: 25, animate: true)
            .elevation(
              pressed ? 0 : 20,
              borderRadius: BorderRadius.circular(25),
              shadowColor: const Color(0x30000000),
            ) // shadow borderRadius
            .constrained(height: 80)
            .padding(vertical: 12) // margin
            .gestures(
              onTapChange: (tapStatus) => setState(() => pressed = tapStatus),
              onTapDown: (details) => print('tapDown'),
              onTap: () => print('onTap'),
            )
            .animate(const Duration(milliseconds: 150), Curves.easeOut);

    final Widget icon = Icon(widget.icon, size: 20, color: Colors.white)
        .padding(all: 12)
        .decorated(
          color: widget.iconBgColor,
          borderRadius: BorderRadius.circular(30),
        )
        .padding(left: 15, right: 10);

    final Widget title = Text(
      widget.title,
      style: const TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 16,
      ),
    ).padding(bottom: 5);

    final Widget description = Text(
      widget.description,
      style: const TextStyle(
        color: Colors.black26,
        fontWeight: FontWeight.bold,
        fontSize: 12,
      ),
    );

    return settingsItem(
      child: <Widget>[
        icon,
        <Widget>[
          title,
          description,
        ].toColumn(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
        ),
        SizedBox(
          width: 7,
        ),
        trailingToggleButton(),
      ].toRow(),
    );
  }

  trailingToggleButton() {
    // Here, default theme colors are used for activeBgColor, activeFgColor, inactiveBgColor and inactiveFgColor
    return ToggleSwitch(
      initialLabelIndex: CacheLanguage.getLanguage() == 'en' ? 0 : 1,
      totalSwitches: 2,
      minWidth: 66,
      labels: ['English', 'Hindi'],
      onToggle: (index) {
        if (index == 0) {
          _localeBloc.add(ChangeLocaleInfo(locale: 'en'));
        } else {
          _localeBloc.add(ChangeLocaleInfo(locale: 'hn'));
        }
      },
    );
  }
}
