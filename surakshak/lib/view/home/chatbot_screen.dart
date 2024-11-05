import 'package:dash_chat_2/dash_chat_2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gemini/flutter_gemini.dart';

class ChatBot extends StatefulWidget {
  const ChatBot({super.key});

  @override
  State<ChatBot> createState() => _ChatBotState();
}

class _ChatBotState extends State<ChatBot> {
  Gemini gemini = Gemini.instance;
  ChatUser currentUser = ChatUser(id: "1", firstName: "Vighnesh");
  ChatUser geminiUser = ChatUser(
      id: "2",
      firstName: "Gemini",
      profileImage:
          "https://play-lh.googleusercontent.com/dT-r_1Z9hUcif7CDSD5zOdOt4KodaGdtkbGszT6WPTqKQ-WxWxOepO6VX-B3YL290ydD=w240-h480-rw");
  List<ChatMessage> messages = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text(
            "Surakshak",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        body: _inputCard());
  }

  Widget _inputCard() {
    return DashChat(
      currentUser: currentUser,
      onSend: sendMessage,
      messages: messages,
      // typingUsers: [currentUser, geminiUser],
      inputOptions: InputOptions(inputDecoration: InputDecoration(
        fillColor: Colors.yellow
      ), textCapitalization: TextCapitalization.sentences),
    );
  }

  void sendMessage(ChatMessage chatMessage) {
    setState(() {
      messages = [chatMessage, ...messages];
    });

    try {
      String question = chatMessage.text;
      gemini.streamGenerateContent(question).listen((event) {
        ChatMessage? lastMessage = messages.firstOrNull;
        String response = event.content?.parts?.fold(
                "", (previous, current) => "$previous ${current.text}") ??
            "";
        response = response.replaceAll("*", "");
        if (lastMessage != null && lastMessage.user == geminiUser) {
          lastMessage = messages.removeAt(0);
          lastMessage.text += response;
          setState(() {
            messages = [lastMessage!, ...messages];
          });
        } else {
          // String response = event.content?.parts?.fold("", (previous, current) => "$previous$current") ?? "";
          ChatMessage message = ChatMessage(
              user: geminiUser, createdAt: DateTime.now(), text: response);
          setState(() {
            messages = [message, ...messages];
          });
        }
      });
    } catch (e) {}
  }
}
