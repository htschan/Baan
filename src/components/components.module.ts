import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
	declarations: [FileUploadComponent],
	imports: [
		CommonModule,
		PipesModule
	],
	exports: [FileUploadComponent]
})
export class ComponentsModule { }
