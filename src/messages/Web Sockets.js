const { sendMessage } = require("./sockets");

class WebSockets {
  connectedUsers = [];

  //adding a user to the list
  //check if the user is already present then prevent it
  addUser = (userId, socketId) => {
    !this.connectedUsers.some((user) => user.userId === userId) &&
      this.connectedUsers.push({ userId, socketId });
  };

  //finding the user socket id by using the userId
  findUserSocketId = (userId) => {
    return this.connectedUsers.find((user) => user.userId === userId);
  };
  //on connecting the socket
  connection(client) {
    console.log("A User is connected with socket id : ", client);

    //adding a user to the list of the online usesrs
    client.on("addUser", (userId) => {
      addUser(userId, client);
    });

    //sending the message to the other user
    client.on(sendMessage, (userId, message) => {
      const userSocket = findUserSocketId(userId);
      global.io.to(userSocket.socketId).emit(sendMessage, message);
    });

    //client disconnecting from the socket
    client.on("disconnect", () => {
      this.connectedUsers = this.connectedUsers.filter(
        (user) => user.socketId !== client.id
      );
    });

    // adding the client to online clients

    client.on("identity", (userId) => {
      this.connectedUsers.add({
        socketId: client.id,
        userId,
      });
    });

    //subscribing the users and other user

    client.on("subscribe", (chatRoomId, otherUserId = "") => {
      this.subscribeOtherUser(chatRoomId, otherUserId);
      client.join(chatRoomId);
    });

    //mute the chat room

    client.on("unsubscribe", (chatRoomId) => {
      client.leave(chatRoomId);
    });
  }

  subscribeOtherUser(chatRoomId, otherUserId) {
    const userSocket = this.connectedUsers.filter(
      (user) => user.userId === otherUserId
    );

    userSocket.map((userInfo) => {
      const socketConnection = global.io.sockets.connected(userInfo.socketId);
      if (socketConnection) {
        socketConnection.join(chatRoomId);
      }
    });
  }
}
module.exports = new WebSockets();
