import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { it_IT } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { RoutesConstants } from './shared/constants/routes.constants';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddExerciseComponent } from './pages/add-exercise/add-exercise.component';
import { getDatabase, provideDatabase } from '@angular/fire/database';

const routes: Routes = [
  {
    component: AuthComponent,
    path: RoutesConstants.Auth,
    canActivate: [AuthGuard]
  },
  {
    component: DashboardComponent,
    path: RoutesConstants.Dashboard,
    canActivate: [AuthGuard]
  },
  {
    component: AddExerciseComponent,
    path: RoutesConstants.AddExercise,
    canActivate: [AuthGuard]
  },

];

registerLocaleData(it);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()),
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: NZ_I18N, useValue: it_IT }],
  bootstrap: [AppComponent]
})
export class AppModule {}
