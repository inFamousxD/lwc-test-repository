public with sharing class AccountsController {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String search) {
        String searchKey = '%' + search + '%';
        return [
            SELECT Id, Name FROM Account WHERE Account.Name LIKE :searchKey LIMIT 4
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getSingleAccount(String id) {
        return [
            SELECT Id, Name, Phone, Type, BillingCountry, BillingState, BillingCity, BillingStreet, BillingPostalCode FROM Account WHERE Account.Id = :id LIMIT 1
        ]; 
    }
}
