public with sharing class GetAllContacts {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccountsList(){
        return [
            SELECT Id, Name, Phone FROM Account WHERE Account.Phone!=NULL LIMIT 10
        ];
    }
}