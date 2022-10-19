import { Injectable, OnInit } from '@angular/core';
import { ref, set, get, child, DataSnapshot, getDatabase, remove } from "firebase/database";
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

    public async getById(userId: string, exerciseId: string): Promise<ExerciseDTO> {
        const allExercises = await this.getAll(userId);
        return allExercises
            .find(xx => xx.id == exerciseId) 
            ?? {} as ExerciseDTO;
    }
    
    public async markAsDone(exercise: ExerciseDTO, isDone: boolean): Promise<ExerciseDTO> {
        const allExercises = await this.getAll(exercise.userId);

        const index = allExercises.findIndex(item => item.id == exercise.id);
        if(index < 0) return exercise;

        allExercises[index].done = isDone 
            ? new Date().toLocaleString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'})
            : null;

        await remove(ref(this.db, `exercises/${exercise.userId}`));

        await set(ref(this.db, `exercises/${exercise.userId}`), allExercises);

        return allExercises[index];
    }

    public isDone(exercise: ExerciseDTO) {
        if(!exercise.done) return false;

        const today = new Date().toLocaleString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'});

        return today == exercise.done;
    }
}