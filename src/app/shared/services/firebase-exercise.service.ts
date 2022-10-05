import { Injectable, OnInit } from '@angular/core';
import { ref, set, get, child, DataSnapshot, getDatabase } from "firebase/database";
import { ExerciseDTO } from '../models/DTO/ExerciseDTO';
import { Guid } from 'guid-typescript';
import { Database } from '@angular/fire/database';

@Injectable()
export class FirebaseExerciseService {
    constructor(private readonly db: Database) {
    }

    public async add(model: ExerciseDTO): Promise<void> {
        let exercises = await this.getByUser(model.userId);

        model.id = Guid.create().toString();
        exercises.push(model);

        await set(ref(this.db, `exercises/${model.userId}`), exercises);
    }

    public async getByUser(userId: string): Promise<ExerciseDTO[]> {
        let snapshot: DataSnapshot = await get(ref(this.db, `exercises/${userId}`));
        if(snapshot.exists()) return snapshot.val() as ExerciseDTO[];
        return [];
    }
    
}