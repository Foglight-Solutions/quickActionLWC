import {LightningElement, api} from 'lwc';
import {getRecordNotifyChange} from "lightning/uiRecordApi";
import doHeadlessExampleWork from "@salesforce/apex/ExampleController.doHeadlessExampleWork";

export default class HeadlessExample extends LightningElement {

    @api recordId;

    @api
    async invoke() {
        let params = {
            "accountId": this.recordId
        };

        // optionally you can put alerts or anything else you like in here
        doHeadlessExampleWork(params).then(result => {
                console.log('Got Result from Randomization:  ', JSON.parse(JSON.stringify(result)));
                getRecordNotifyChange([{recordId: this.recordId}]);
            }
        ).catch(error => {
                console.log('Got ERROR from Randomization:  ', JSON.parse(JSON.stringify(error)));
            }
        );
    }
}