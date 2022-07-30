import { NgModule, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AuthModule } from '@angular/fire/auth';
import { FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './services/localStorage.service';

@NgModule({
    imports: [
        AuthModule,
        FirebaseAppModule,
    ],
    exports: [],
    declarations: [],
    providers: [FirebaseService, LocalStorageService],
})
export class SharedModule implements OnInit{
    ngOnInit(): void {
        const app = initializeApp(environment.firebase)
        console.log({app})
    } 
}
