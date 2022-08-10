import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ComponentsModule } from '../components/components.module';
import { ZorroModule } from '../zorro/zorro.module';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CheckCircleOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

const icons = [ CheckCircleOutline, PlusOutline ];

const components = [
    AuthComponent,
    DashboardComponent
];

@NgModule({
    imports: [
        CommonModule,
        ZorroModule,
        ComponentsModule,
        NzCardModule,
        NzButtonModule,
        NzListModule,
        NzIconModule.forRoot(icons)
    ],
    exports: components,
    declarations: components,
    providers: [],
})
export class PagesModule { }
