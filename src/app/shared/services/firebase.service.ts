import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword, signOut, updateProfile} from '@angular/fire/auth';
import { LocalStorageConstants } from '../constants/localStorage.constants';
import { CreateUserDTO } from '../models/DTO/CreateUser.DTO';
import { LocalStorageService } from './localStorage.service';

@Injectable()
export class FirebaseService {
    constructor(
        private readonly auth: Auth, 
        private readonly localStorageService: LocalStorageService
    ) { }

    public async createUser(model: CreateUserDTO): Promise<void>{
        try{
            const credentials = await createUserWithEmailAndPassword(this.auth, model.email, model.password);
            await updateProfile(credentials.user, {
                displayName: `${model.firstName} ${model.lastName}`
            });
        }
        catch(ex){
            throw ex;
        }
    }

    public async signIn(email: string, password: string): Promise<void>{
        try{
            const credentials = await signInWithEmailAndPassword(this.auth, email, password);
            
            this.localStorageService.set(LocalStorageConstants.CurrentUser, credentials.user);
        }
        catch(ex){
            throw ex;
        }
    }

    public async signOut(){
        try{
            await signOut(this.auth);
            this.localStorageService.clear();
        }
        catch(ex){
            throw ex;
        }
    }
}