public with sharing class ExampleController {

	@AuraEnabled
	public static Boolean doHeadlessExampleWork (Id accountId) {

		update new Account(
				Id = accountId,
				Name = String.valueOf(Math.random() * 1000)
		);

		// if we reach this point, we've succeeded
		return true;
	}

	@AuraEnabled
	public static Account getAccountRecord (Id accountId) {
		return [
				SELECT Id,
						Name
				FROM Account
				WHERE Id = :accountId
		];
	}

	@AuraEnabled
	public static Boolean saveRecord (Account accountRecord) {

		// we're doing this since we didn't wire up any of the form on the modal and this shows an update happened
		accountRecord.Name = String.valueOf(Math.random() * 100000);

		update accountRecord;

		// if we reach this point, we've succeeded
		return true;
	}

}