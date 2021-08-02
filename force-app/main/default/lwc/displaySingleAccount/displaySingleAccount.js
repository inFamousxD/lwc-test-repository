import { LightningElement, wire } from 'lwc';

// message channel
import messageChannel from '@salesforce/messageChannel/Account_Select__c';
import { subscribe, MessageContext } from 'lightning/messageService';

import getSingleAccount from '@salesforce/apex/AccountsController.getSingleAccount';

export default class DisplaySingleAccount extends LightningElement {
    id = 'Please select an account';
    subscription = null;
    defaults = true;

    @wire(MessageContext)
    messageContext;

    @wire(getSingleAccount, { id: '$id' })
    accounts;

    connectedCallback() {
        this.handleSubscribe();
    }

    handleSubscribe() {
        if (!this.subscription) 
            this.subscription = subscribe(this.messageContext, messageChannel, (message) => {
                this.id = message.message;
                this.defaults = false;
                // console.log(this.accounts.data);
            });
    }
}