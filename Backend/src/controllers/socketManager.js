import { Server, Socket } from "socket.io"

let connections = {}
let messages = {}
let timeOnline= {}


export const connectToSocket = (server)=>{
    const io= new Server(server, {
        "cors" :{
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: "*",//not to do in prodn, we are doing this since its only development
            credentials: "true"
        }
    }
    );

    io.on("connection", (socket)=>{
        
        console.log("new user connected");
        
        socket.on("join-call", (path)=>{

            if(connections[path]=== undefined){
                connections[path]=[];
            }
            connections[path].push(socket.id)

            timeOnline[socket.id]= new Date();

            // connections[path].forEach(element => {
            //     io.to(element)
            // });
            console.log("connections", connections);

            for(let a=0; a< connections[path].length; a++){
                // console.log(`connections[path][${a}]`,connections[path][a]); for debugging
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
            }

            if(messages[path] !== undefined){
                for(let i=0; i<messages[path].length; i++){
                    io.to(socket.id).emit("chat-message", messages[path][i]['data'],
                        messages[path][i]['sender'], messages[path][i]['socket-id-sender']
                    )
                }
            }

        });

        socket.on("signal", (toId, message)=>{
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender, socketIdSender)=>{
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }
        });

        socket.on("disconnect", ()=>{

            let varDiffTime = Math.abs(timeOnline[socket.id] - new Date());

            var key
            for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){

                for(let i=0; i<v.length ; i++){
                    if(v[i]===socket.id){
                        key=k

                        for(let i=0; i<connections[key].length; i++){
                            io.to(connections[key][i]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index,1)

                        if(connections[key].length===0){
                            delete connections[key]
                        }
                        
                    }
                }
            }
            
        });

    });

    return io;
}