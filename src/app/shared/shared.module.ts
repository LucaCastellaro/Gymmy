import { NgModule, OnInit } from '@angular/core';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { AuthModule } from '@angular/fire/auth';
import { FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './services/localStorage.service';
import { AuthGuard } from './guards/auth.guard';
import { getDatabase } from "firebase/database";
import { FirebaseExerciseService } from './services/firebase-exercise.service';
import { DatabaseModule } from '@angular/fire/database';
import { FirebaseSeriesService } from './services/firebase-series.service';


@NgModule({
    imports: [
        AuthModule,
        DatabaseModule,
        FirebaseAppModule,
    ],
    exports: [],
    declarations: [],
    providers: [
        FirebaseAuthService, 
        LocalStorageService, 
        AuthGuard, 
        FirebaseExerciseService,
        FirebaseSeriesService,
    ],
})
export class SharedModule implements OnInit{
    ngOnInit(): void {
        const app = initializeApp(environment.firebase)
        const database = getDatabase(app);
    } 
}
