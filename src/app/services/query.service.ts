import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class QueryService {
    private showQueryDialog: Subject<any>;

    constructor() {
        this.showQueryDialog = new Subject<any>();
    }

    public onShowDialog() {
        return this.showQueryDialog;
    }

    public emitShowDialog(data) {
        this.showQueryDialog.next(data);
    }
}