import './index.scss';
import './components/Notification/notification';
import './components/Notification/notification-component';
import './components/devesh/devesh';
import { EventBus } from "./EventBus";


document.addEventListener("DOMContentLoaded", function () {
    const eventBus = EventBus.getInstance();;
    console.log(eventBus.handlers)
    document.querySelector('notification-component').addEventListener('eventClicked', function (e) {
        console.log(e); // true
    })
    document.getElementById('btn-container').addEventListener('click',(evt)=>{
        eventBus.emit('createNotification',evt.target.dataset.type);
    })
});