export class EventBus{
    static instance;
    constructor(){
        if(EventBus.instance){
            return EventBus.instance 
        }
        this.handlers = [];
        EventBus.instance = this;
    }
    static getInstance(){
        return new EventBus();
    }
    subscribe(eventName,handler){
        const eventHanlder = {
            event:eventName,
            handler:handler
        }
        this.handlers.push(eventHanlder)
    }

    emit(eventName,payload){
        const emitEvents = this.handlers.filter((handler)=>handler.event === eventName)
        for(const handlers of emitEvents){
            handlers.handler(payload);
        }
    }
}