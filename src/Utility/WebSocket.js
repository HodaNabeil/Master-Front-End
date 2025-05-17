class WebSocketInstance {
    constructor(Io) {
        this.socket = Io;
    }
    GetSocket() {
        return this.socket;
    }
    SetSocket(socket) {
        this.socket = socket;
    }
    On(eventName, callback) {
        this.socket.on(eventName, callback);
    }
    OnAny(CallBack) {
        this.socket.onAny((eventName, data) => {
          CallBack(eventName, data);
        });
    }
    Emit(eventName, data) {
        this.socket.emit(eventName, data);
    }
    Off(eventName, callback) {
        this.socket.off(eventName, callback);
    }
    RemoveListener(eventName, callback) {
        this.socket.removeListener(eventName, callback);
    }
    RemoveAllListeners(eventName) {
        this.socket.removeAllListeners(eventName);
    }
    Close() {
        this.socket.close();
    }
    Disconnect() {
        this.socket.disconnect();
    }
    Connect() {
        this.socket.connect();
    }
    OnError(CallBack) {
        this.socket.on("connect_error", () => {
            CallBack(true);
        });
    }
    GetAllSockets () {
       
    }
    IsConnected() {
        this.socket.connected;
    }
}

export default WebSocketInstance;
