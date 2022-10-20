import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';

const ngZorroModules = [
    NzButtonModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    NzIconModule,
    NzToolTipModule,
    NzListModule,
    NzSpinModule,
    NzEmptyModule,
    NzTableModule,
    NzCheckboxModule,
    NzDrawerModule,
    NzFormModule
  ];

@NgModule({
    imports: [
      CommonModule,
      ...ngZorroModules
    ],
    exports: ngZorroModules,
    declarations: [],
    providers: [],
})
export class ZorroModule { }
