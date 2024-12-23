import 'dart:async';
import 'dart:developer';

import 'package:loader_overlay/loader_overlay.dart';
import 'package:surakshak/theme/fontStyles.dart';
import 'package:chat_gpt_sdk/chat_gpt_sdk.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:surakshak/utils/speech.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Bot Gpt',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const GPTPage(),
    );
  }
}

class GPTPage extends StatefulWidget {
  const GPTPage({super.key});

  @override
  State<GPTPage> createState() => _GPTPageState();
}

class _GPTPageState extends State<GPTPage> {
  RxBool isLoading = false.obs;
  List<String> history = [];

  @override
  void initState() {
    super.initState();
    openAI = OpenAI.instance.build(
        // token: "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",
        token:
            "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",
        // baseOption: HttpSetup(receiveTimeout: 60 * 1000),
        baseOption: HttpSetup(receiveTimeout: const Duration(seconds: 10)),
        enableLog: true);
  }

  late OpenAI openAI;

  ///t => translate
  final tController = StreamController.broadcast();
  final TextEditingController _prompt = TextEditingController();

  void _chatGpt3ExampleStream() async {
    context.loaderOverlay.show();
    history.add(_prompt.text);

    final request = ChatCompleteText(
      messages: [
        Map.of({
          "role": "user",
          "content": _prompt.text
        }) // Setting the prompt in message format
      ],
      maxToken: 200,
      model: GptTurboChatModel(),
    );

    _prompt.text = "";

    // openAI.onCompleteStream(request: request).listen((it) {
    //   _prompt.clear();
    //   debugPrint(it.toString());
    //   isLoading(false);
    //   history.add(it!.choices.last.text);
    //   setState(() {});
    // }).onError((err) {
    //   print(err.toString());
    // });
    openAI.onChatCompletionSSE(request: request).listen((it) {
      // Clear the prompt and hide loader
      _prompt.clear();
      debugPrint(it.toString());
      isLoading(false);

      // Add the response content to the history
      if (it.choices != null && it.choices!.isNotEmpty) {
        history.add(it.choices!.first.message!.content);
      }

      // Trigger UI update
      setState(() {});
    }).onError((err) {
      // Handle errors
      print(err.toString());
    });
    context.loaderOverlay.hide();
  }

  // late OpenAI openAI;

  // ///t => translate
  // final tController = StreamController<CTResponse?>.broadcast();
  // final TextEditingController _prompt = TextEditingController();

  // void _chatGpt3ExampleStream() async {
  //   context.loaderOverlay.show();
  //   history.add(_prompt.text);

  //   final request = ChatCompleteText(messages: [
  //     Map.of({"role": "user", "content": "Your prompt here"})
  //   ], model: kChatGptTurboModel, maxToken: 200);

  //   _prompt.text = "";

  //   // openAI.onCompleteStream(request: request).listen((it) {
  //   //   _prompt.clear();
  //   //   debugPrint(it.toString());
  //   //   isLoading(false);
  //   //   history.add(it!.choices.last.text);
  //   //   setState(() {});
  //   // }).onError((err) {
  //   //   print(err.toString());
  //   // });
  //   openAI.onChatCompletionSSE(request: request).listen((it) {
  //     _prompt.clear();
  //     debugPrint(it.toString());
  //     isLoading(false);

  //     if (it!.choices.isNotEmpty) {
  //       history.add(it.choices.last.message
  //           .content); // Accessing 'content' from 'message'
  //     }

  //     setState(() {});
  //   }).onError((err) {
  //     print(err.toString());
  //   });
  //   context.loaderOverlay.hide();
  // }

  @override
  void dispose() {
    _prompt.dispose();

    // openAI.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: LoaderOverlay(
        overlayColor: Colors.transparent,
        child: Scaffold(
          backgroundColor: Colors.grey.shade300,
          body: Container(
            margin: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                    child: ListView.builder(
                        itemCount: history.length,
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemBuilder: (context, index) {
                          return Container(
                            child: Text(history[index]),
                          );
                        })),
                // Expanded(
                //   child: StreamBuilder<CTResponse?>(
                //       stream: tController.stream,
                //       builder: (context, snapshot) {
                //         if (snapshot.hasData) {
                //           return SingleChildScrollView(
                //             child: Text(
                //               snapshot.data!.choices.last.text,
                //               style: poppins.copyWith(fontSize: 18),
                //             ),
                //           );
                //         } else if (snapshot.data == null) {
                //           return Text(
                //             "Ask me Anything you want",
                //             style: poppins.copyWith(fontSize: 18),
                //           );
                //         }

                //         return Text("loading");
                //       }),
                // ),
                _inputCard(MediaQuery.of(context).size),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _inputCard(Size size) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      alignment: Alignment.bottomCenter,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey),
        color: Colors.grey,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Flexible(
            flex: 4,
            child: TextField(
              decoration: const InputDecoration(
                  border: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  disabledBorder: InputBorder.none,
                  focusColor: Colors.white),
              controller: _prompt,
              maxLines: 6,
              minLines: 1,
              style: TextStyle(color: Colors.white),
              cursorColor: Colors.white,
              textInputAction: TextInputAction.newline,
              keyboardType: TextInputType.multiline,
            ),
          ),
          Flexible(
            flex: 1,
            child: IconButton(
                onPressed: () {
                  _chatGpt3ExampleStream();
                },
                icon: Icon(
                  Icons.send,
                  size: 25,
                  color: Colors.white,
                )),
          ),
          Flexible(
            flex: 1,
            child: IconButton(
                onPressed: () async {
                  SpeachToText speachToText = SpeachToText(
                      context: context,
                      onResult: (value) {
                        _prompt.text = value;
                        _chatGpt3ExampleStream();
                      });
                },
                icon: const Icon(
                  Icons.mic,
                  size: 25,
                  color: Colors.white,
                )),
          )
        ],
      ),
    );
  }
}
