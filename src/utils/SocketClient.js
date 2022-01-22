import {io} from 'socket.io-client'

class SocketClient {
    static socket = null

    static connectSocket = function(){
        return io('http://localhost:5000/')
    }
    static getSocket = function (){
        if(this.socket===null)
            this.socket = this.connectSocket()
        return this.socket
    }
}

export default SocketClient