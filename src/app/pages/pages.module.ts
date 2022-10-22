import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ComponentsModule } from '../components/components.module';
import { ZorroModule } from '../zorro/zorro.module';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { 
  CheckCircleOutline, 
  PlusOutline, 
  HomeOutline, 
  ControlOutline,
  LinkOutline
} from '@ant-design/icons-angular/icons';

const icons = [ 
  CheckCircleOutline, 
  PlusOutline, 
  HomeOutline, 
  ControlOutline,
  LinkOutline
];

const components = [
    AuthComponent,
    DashboardComponent,
    ExerciseDetailComponent
];

@NgModule({
    imports: [
        CommonModule,
        NzIconModule.forRoot(icons),
        FormsModule,
        ReactiveFormsModule,
        ZorroModule,
        ComponentsModule,
        NzCardModule,
        NzButtonModule,
        NzSelectModule
    ],
    exports: components,
    declarations: components,
    providers: [],
})
export class PagesModule { }
