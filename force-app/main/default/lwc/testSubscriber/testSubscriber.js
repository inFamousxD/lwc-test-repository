import { LightningElement, wire } from 'lwc';

// message channel import. use the message channel file name leaving anything after the first period. 
// Here the file name is Test_Channel.messageChannel-meta.xml, so we just pick Test_Channel__c. 
// Here __c doesn't mean a custom object.
import messageChannel from '@salesforce/messageChannel/Test_Channel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class TestSubscriber extends LightningElement {
    message = 'Nothing recieved yet.';
    
    // subscription variable. set to null at first
    subscription = null;

    /*
        Wire MessageContext imported from messageService to a local variable messageContext
    */
    @wire(MessageContext)
    messageContext;

    /*
        connectedCallbacks always run when the component (LWC) is mounted to the DOM. Similar to React's componentDidMount? callback.
        We use this so that a component only subscribes to the message channel if it actually exists in the DOM. 

        Can also use a constructor but this generally is better.
    */
    connectedCallback() {
        this.handleSubscribe();
    }

    /*
        Used to subscribe to the message channel.
        Define a subscription variable in the class, and check if you're already subscribed. (to avoid needless re-subs). 

        call subscribe function and pass messageContext, messageChannel and fetch the message in a callback arrow function. 
        When the message is received, the callback runs and you can use it to do whatever.
    */
    handleSubscribe() {
        if (!this.subscription) 
            this.subscription = subscribe(this.messageContext, messageChannel, (message) => {
                this.message = message.message;
            });
    }
}