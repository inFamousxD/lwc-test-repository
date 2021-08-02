import { LightningElement, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountsController.searchAccounts'

// message channel
import messageChannel from '@salesforce/messageChannel/Account_Select__c';
import { publish, MessageContext } from 'lightning/messageService';

const DELAY = 300;

export default class SearchAccounts extends LightningElement {
    search = '';
    message = '';

    // Might want to look at the apex class for more on this. pretty simple SOQL used.
    @wire(searchAccounts, { search: '$search' })
    accounts;

    @wire(MessageContext)
    messageContext;

    // Here, changes in input box are read. A timeout of DELAY is linked so that too many apex calls aren't made. 
    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const search = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.search = search;
        }, DELAY)
    }

    // This publishes current account name selected to the message channel. 
    // One thing to note - 
    //      Because this is a recursive DOM element, we iterate through all accounts found and create buttons for each one. 
    //      Read the html file, and notice for the button tag which is used to select the account is decorated with "data-id"
    //      Apparently for LWC, data-id is stored in the button element and then accessed by event.currentTarget.dataset.id 
    //      Remember - currentTarget instead of target. 
    //      Remember - id can be replaced with any variable name. Make sure to decorate with data-xyz where xyz is var name
    handleSelect(event) {
        console.log(event.currentTarget.dataset.id)
        this.message = { message: event.currentTarget.dataset.id}
        publish(this.messageContext, messageChannel, this.message);
    }
}