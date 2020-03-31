//helper
const getTimestamp = () => new Date().getTime();

class ChatService {
    constructor(){
        this.chats = [];
    }

    async create(body){
        if(!body.message) {
            const err = new Error("Message shouldn't be empty");
            err.status = 400;
            return Promise.reject(err);
        }
        const data = {
            message: body.message || "", 
            timestamp: getTimestamp(),
            delivered: true
        }
        this.chats.push(data);

        return Promise.resolve(data);
    }

    async find(){
        return Promise.resolve(this.chats);
    }
}

module.exports = ChatService;