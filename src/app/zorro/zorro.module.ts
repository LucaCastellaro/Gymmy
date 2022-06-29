import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const ngZorroModules = [
    NzButtonModule,
    NzInputModule,
    NzTypographyModule,
    NzCardModule,
    NzIconModule
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
