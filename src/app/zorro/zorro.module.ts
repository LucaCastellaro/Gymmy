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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

const ngZorroModules = [
  NzIconModule,
  NzButtonModule,
  NzInputModule,
  NzTypographyModule,
  NzCardModule,
  NzToolTipModule,
  NzListModule,
  NzSpinModule,
  NzEmptyModule,
  NzTableModule,
  NzCheckboxModule,
  NzDrawerModule,
  NzFormModule,
  NzSelectModule,
  NzPopconfirmModule,
  NzDividerModule,
  NzMessageModule,
  NzDropDownModule
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
