import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { ZorroModule } from '../zorro/zorro.module';
import { AuthComponent } from './auth/auth.component';

const components = [
    AuthComponent
];

@NgModule({
    imports: [
        CommonModule,
        ZorroModule,
        ComponentsModule
    ],
    exports: components,
    declarations: components,
    providers: [],
})
export class PagesModule { }
