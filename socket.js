const { Server } = require("socket.io");

function setupSocket(server) {
    const io = new Server(server);
     const onlineUsers = {};
    io.on("connection", (socket) => {
        socket.on("userConnected", (userID) => {
            console.log(userID.user)
            onlineUsers[userID.user] = socket.id
            console.log("Online Users after connection: ", onlineUsers);
        });

        // Handle sending messages
        socket.on("send_message", ({ senderID, receiverID, message }) => {
            console.log(onlineUsers)
            console.log(receiverID)
            const receiverSocketID = onlineUsers[receiverID];
            console.log(receiverSocketID)
            if (receiverSocketID) {
                // Emit message to receiver if they are online
                io.to(receiverSocketID).emit("receive_message", {senderID:senderID, msg:message });
            }
        });

        // Handle user disconnecting
        socket.on("disconnect", () => {
            for (let userID in onlineUsers) {
                if (onlineUsers[userID] === socket.id) {
                    delete onlineUsers[userID];
                    break;
                }
            }
            console.log("A user disconnected:", socket.id);
        });
    });

    return io;
}

module.exports = setupSocket;
