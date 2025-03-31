const { Server } = require("socket.io");

function setupSocket(server) {
    const io = new Server(server);
     const onlineUsers = {};
    io.on("connection", (socket) => {
        socket.on("userConnected", (userID) => {

            onlineUsers[userID.user] = socket.id
            
        });

        // Handle sending messages
        socket.on("send_message", ({ senderID, receiverID, message }) => {
            
            const receiverSocketID = onlineUsers[receiverID];
        
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

        });
    });

    return io;
}

module.exports = setupSocket;
