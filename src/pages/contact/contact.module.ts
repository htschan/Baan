import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';

@NgModule({
    declarations: [
        ContactPage
    ],
    entryComponents: [
        ContactPage
    ],
    imports: [
        IonicPageModule.forChild(ContactPage)
    ],
})
export class ContactPageModule { }
