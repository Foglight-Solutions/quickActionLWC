import {LightningElement, api, track} from 'lwc';
import {CloseActionScreenEvent} from "lightning/actions";
import {getRecordNotifyChange} from 'lightning/uiRecordApi';
import getAccountRecord from "@salesforce/apex/ExampleController.getAccountRecord";
import saveRecord from "@salesforce/apex/ExampleController.saveRecord";

export default class ModalExample extends LightningElement {
    @api recordId;

    @track completedLoading;
    @track accountRecord;

    connectedCallback() {
        console.log('Leaving this here to prove that recordId is not populated ' +
            'quickly enough to put logic in the connectedCallback:  ', this.recordId);
    }

    renderedCallback() {
        // you will see this logging before the recordId is populated, and a second time when it is populated
        console.log('renderedCallback called with recordId ', this.recordId);
        if (!this.completedLoading && this.recordId) {

            let params = {
                "accountId": this.recordId
            };

            getAccountRecord(params).then(result => {
                this.accountRecord = result;
                this.completedLoading = true;
            }).catch(error => {
                console.log('Don\'t swallow errors like this in production', JSON.parse(JSON.stringify(error)));
            });
        }
    }

    onSaveClick() {
        let params = {
            "accountRecord": this.accountRecord
        };
        saveRecord(params).then(result => {
            if (result === true) {
                getRecordNotifyChange([{recordId: this.recordId}]);
                this.closeThisModal();
            } else {
                console.log('Don\'t swallow error results like this in production', JSON.parse(JSON.stringify(result)));
            }
        }).catch(error => {
            console.log('Don\'t swallow errors like this in production', JSON.parse(JSON.stringify(error)));
        });
    }

    closeThisModal() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}