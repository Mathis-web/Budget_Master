class Message {
    constructor(text) {
        this.text = text;
    }
}

class MessageSuccess extends Message {
    constructor(text) {
        super(text);
        this.isError = false
    }
}

class MessageError extends Message {
    constructor(text) {
        super(text);
        this.isError = true;
    }
}

export {MessageSuccess, MessageError};