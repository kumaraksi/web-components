import { Notification } from "./notification";
import {EventBus} from '../../EventBus';

	const notificationContainer = document.createElement('template');
	notificationContainer.innerHTML = `
	<style>
	@keyframes slide-down {
		0% { opacity: 0; transform: translateY(-100%); }   
		100% { opacity: 1; transform: translateY(0); }
	}
	.notification{
		margin: 20px 0px;
		box-shadow: 1px 2px 4px 0px #716b6b;
		display:flex;
		align-items:center;
		justify-content:center;
		height:70px;
		max-height:70px;
		animation: slide-down .3s ease-out;
		background: var(--color-white)
	}

	.notification h1,
	.notification h2,
	.notification h3,
	.notification h4,
	.notification h5,
	.notification h6,
	.notification p
	{
		margin:5px 0px;
		padding:5px;
	}
	.notification p{
		font-size: 0.725rem;
		padding: 0px 5px;
		color:var(--color-black);
		}
	.notification .notification__title{
		padding: 5px 0px 0px 5px;
		margin: 0;
		line-height:1rem;
	}
	.notification .notification__body{
		flex:1;
		height:100%;
	}
	.notification .notification__icon{
		flex: 0.2;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.notification .notification__icon ion-icon{
		font-size:2rem;
	}
		:host{
		position: fixed;
		right: 10px;
		top: 10px;
		width: 300px;
	}

	.notification.info {
		border-left: 3px solid var(--color-light-blue);
		border-right: 3px solid var(--color-light-blue);
	}
	.notification.info .notification__title {
		color: var(--color-light-blue);	
	}
	.notification.info .notification__icon ion-icon {
		color:var(--color-light-blue)
	}

	.notification.warning {
		border-left: 3px solid var(--color-amber);
		border-right: 3px solid var(--color-amber);
	}
	.notification.warning .notification__title {
		color: var(--color-amber);
	}
	.notification.warning .notification__icon ion-icon {
		color: var(--color-amber)
	}

	.notification.error {
		border-left: 3px solid var(--color-danger);
		border-right: 3px solid var(--color-danger);
	}
	.notification.error .notification__title {
		color: var(--color-danger);
	}
	.notification.error .notification__icon ion-icon {
		color: var(--color-danger)
	}

	.notification.success {
		border-left: 3px solid var(--color-primary);
		border-right: 3px solid var(--color-primary);
	}
	.notification.success .notification__title {
		color: var(--color-primary);
	}
	.notification.success .notification__icon ion-icon {
		color: var(--color-primary)
	}

	</style>    
	<div class="notification-wrapper" id="notification-wrapper">
	</div>
	`;


export class NotificationWrapper extends HTMLElement{

	constructor(){
		super();
		this.maxNotifications = 5;
		this.notifications = 0;
		this.pendingNotifications = [];
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(notificationContainer.content.cloneNode(true));
		this.eventBus = EventBus.getInstance();
		this.eventBus.subscribe('createNotification',this.createNotification.bind(this));
		this.eventBus.subscribe('destroyNotification',this.removeNotification.bind(this));
	}

	redrawContainer(){
		this.shadowRoot.removeChild();
		for(const notif in this.notifications){
			this.shadowRoot.appendChild(notif.content.cloneNode(true))
		}
	}

	generateNotificationContainer(){
		return template;		
	}

	createNotification(type){
		this.notifications++;
		const notification = this.getNotificationTemplate(type);
		if(this.notifications <= this.maxNotifications){
			this.shadowRoot.appendChild(notification.content.cloneNode(true))
		}
		else{
			this.pendingNotifications.push(notification)
		}
	}
	
	removeNotification(evt){
		this.notifications--;
		if(this.pendingNotifications.length > 0){
			this.shadowRoot.appendChild(this.pendingNotifications[0].content.cloneNode(true))
			this.pendingNotifications = this.pendingNotifications.splice(1,this.pendingNotifications.length)	
		}
	}

	getNotificationTemplate(type){
		const temp = document.createElement('template')
		temp.innerHTML = `
			<notification-el type=${type}></notification-el>
		`;
		return temp;	
	}        

	// triggered once the element is added to the DOM.
	connectedCallback(){
		// document.querySelector('notification-el').addEventListener('notificationCreated', function (e) {
		//     console.log(e); // true
		// })
		console.log(this.eventBus)
	}
	
	// triggered once the element is removed to the DOM.
	disconnectedCallback(){
		
	}
	
}

(function(){
	window.customElements.define('notification-el', Notification);
	window.customElements.define('notification-component', NotificationWrapper);
})()
