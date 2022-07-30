import { NgModule, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AuthModule } from '@angular/fire/auth';
import { FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        AuthModule,
        FirebaseAppModule,
    ],
    exports: [],
    declarations: [],
    providers: [FirebaseService],
})
export class SharedModule implements OnInit{
    ngOnInit(): void {
        const app = initializeApp(environment.firebase)
        console.log({app})
    } 
}
