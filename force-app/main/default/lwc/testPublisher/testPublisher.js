import { LightningElement, wire } from 'lwc';

// message channel import. use the message channel file name leaving anything after the first period. 
// Here the file name is Test_Channel.messageChannel-meta.xml, so we just pick Test_Channel__c. 
// Here __c doesn't mean a custom object.
import messageChannel from '@salesforce/messageChannel/Test_Channel__c';
import { MessageContext, publish } from 'lightning/messageService';

export default class TestPublisher extends LightningElement {
    message = '';

    /*
        Wire MessageContext imported from messageService to a local variable messageContext
    */
    @wire(MessageContext)
    messageContext;

    /*
        this method just assigns whatever is in the textbox to message variable.
    */
    handleText(event) {
        this.message = event.target.value;
    }
    
    /* 
        Publish the message to message channel.
        Call publish, pass messageContext, messageChannel and the message to be passed. Remember to create a JSON with the same name as
        defined in the Message Channel fieldName
    */
    handlePublish() {
        let message = {message: this.message};
        publish(this.messageContext, messageChannel, message);
    }
}