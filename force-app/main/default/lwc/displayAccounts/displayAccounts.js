import { LightningElement, wire } from 'lwc';
import getAllAccountsList from '@salesforce/apex/GetAllContacts.getAllAccountsList';

export default class DisplayAccounts extends LightningElement {
    @wire(getAllAccountsList)
    accounts;
}