import { Injectable, OnInit } from '@angular/core';
import { ref, set, get, child, DataSnapshot, getDatabase } from "firebase/database";
import { ExerciseDTO } from '../models/DTO/ExerciseDTO';
import { Guid } from 'guid-typescript';
import { Database } from '@angular/fire/database';
import { Days } from '../models/enums/days.enum';

@Injectable()
export class FirebaseExerciseService {
    constructor(private readonly db: Database) {
    }

    public async add(model: ExerciseDTO): Promise<void> {
        let exercises = await this.getAll(model.userId);

        model.id = Guid.create().toString();
        exercises.push(model);

        await set(ref(this.db, `exercises/${model.userId}`), exercises);
    }

    public async getAll(userId: string): Promise<ExerciseDTO[]> {
        const snapshot: DataSnapshot = await get(ref(this.db, `exercises/${userId}`));
        if(snapshot.exists()) return snapshot.val() as ExerciseDTO[];
        return [];
    }

    public async getDaily(userId: string, day: Days): Promise<ExerciseDTO[]> {
        const allExercises = await this.getAll(userId);
        
        return allExercises
            .filter(exercise => exercise.days.some(exerciseDay => exerciseDay == Days[day]));
    }
    
}