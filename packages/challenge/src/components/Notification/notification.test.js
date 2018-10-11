import 'document-register-element'

import { Notification } from "./notification";
import { NotificationWrapper } from "./notification-component";

jest.mock('./notification');
jest.mock('./notification-component');


describe('test for notifications',()=>{
    test('initialize notifications', ()=>{
        const notification = new Notification();
        expect(Notification).toHaveBeenCalledTimes(1)    
    })
})

describe('test for notifications',()=>{
    test('initialize notification wrapper', ()=>{
        const wrapper = new NotificationWrapper();
        expect(NotificationWrapper).toHaveBeenCalledTimes(1)    
    })
})
