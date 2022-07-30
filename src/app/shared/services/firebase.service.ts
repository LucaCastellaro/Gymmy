import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithCredential, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';
import { CreateUserDTO } from '../models/DTO/CreateUserDTO';

@Injectable()
export class FirebaseService {
    constructor(private auth: Auth) { }

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
}