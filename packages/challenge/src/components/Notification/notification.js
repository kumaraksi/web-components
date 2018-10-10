import {EventBus} from '../../EventBus';
import {guid} from '../../Utils'
export class Notification extends HTMLElement{
	
	constructor(){
		super();
		this.handleClickEvent = this.handleClickEvent.bind(this);
		// const temp = document.importNode(t.content, true);

		const template = this.getTemplate();
		this.appendChild(template.content.cloneNode(true));
		this.displayTitle = this.querySelector('h6');
		this.eventClicked = new CustomEvent('eventClicked')
		this.createEvent = new CustomEvent('notificationCreated')
		this.destroy = new CustomEvent('destroyNotification');
		this.timer = null;
		this.eventBus = EventBus.getInstance();
		this.id = guid();
	}

	getTemplate(){
		const template = document.createElement('template');
		template.innerHTML = `
		<div class="notification ${this.type}" id=${this.id}>
			<div class="notification__icon">
				<ion-icon name="${this.getNotificationIcon()}" ></ion-icon>
			</div>
			<div class="notification__body">
				<h4 class="notification__title">
					${this.type}
				</h4>
				<p class="notification__desc">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			</div>
		</div>`;
		return template;
	}

	getNotificationIcon(){
		let icon = 'alert';
		switch(this.type){
			case 'info': icon = 'alert'
			break;
			
			case 'success': icon = 'checkmark-circle'
			break;
			
			case 'warning': icon = 'bug'
			break;
			
			case 'error': icon = 'close-circle'
			break;

			default: icon = 'alert'
		}
		return icon;
	}

	handleClickEvent(){
		this.dispatchEvent(this.eventClicked);
	}
	
	// triggered once the element is added to the DOM.
	connectedCallback(){
		this.timer = setTimeout(()=>{
			this.remove();
			this.eventBus.emit('destroyNotification')
		},3000)
	}
	
	// triggered once the element is removed to the DOM.
	disconnectedCallback(){
		
	}
		
	get type() {
		return this.getAttribute('type');
	}
	
	set type(newValue) {
		this.setAttribute('type', newValue);
	}
}