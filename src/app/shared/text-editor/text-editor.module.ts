import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextEditorComponent } from './text-editor.component';
import { QuillModule } from 'ngx-quill'




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        QuillModule.forRoot()
    ],
    declarations: [
        TextEditorComponent
    ],
    exports: [TextEditorComponent],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class TextEditorModule { }