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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CheckCircleOutline, PlusOutline, HomeOutline, ControlOutline } from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';

const icons = [ CheckCircleOutline, PlusOutline, HomeOutline, ControlOutline ];

const components = [
    AuthComponent,
    DashboardComponent,
    ExerciseDetailComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ZorroModule,
        ComponentsModule,
        NzCardModule,
        NzButtonModule,
        NzListModule,
        NzSelectModule,
        NzIconModule.forRoot(icons)
    ],
    exports: components,
    declarations: components,
    providers: [],
})
export class PagesModule { }
