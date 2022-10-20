import { Injectable } from '@angular/core';
import { ref, set, get, DataSnapshot, remove, update } from "firebase/database";
import { ExerciseDTO } from '../models/DTO/ExerciseDTO';
import { Guid } from 'guid-typescript';
import { Database } from '@angular/fire/database';
import { Days } from '../models/enums/days.enum';
import { SeriesDTO } from '../models/DTO/SeriesDTO';

@Injectable()
export class FirebaseExerciseService {
    constructor(private readonly db: Database) {
    }

    public async addExercise(model: ExerciseDTO): Promise<ExerciseDTO> {
        model.id = Guid.create().toString();

        await set(ref(this.db, `exercises/${model.userId}/${model.id}`), model);

        return await this.getById(model.userId, model.id);
    }

    public async getAll(userId: string): Promise<Map<string, ExerciseDTO>> {
        const snapshot: DataSnapshot = await get(ref(this.db, `exercises/${userId}`));
        if(snapshot.exists()) {
            const result = new Map<string, ExerciseDTO>();
            snapshot.forEach(item => {
                const value = item.val() as ExerciseDTO;
                result.set(value.id, value);
            })
            return result;
        }
        return new Map<string, ExerciseDTO>();
    }

    public async getDaily(userId: string, day: Days): Promise<ExerciseDTO[]> {
        const allExercises = await this.getAll(userId);

        const result: ExerciseDTO[] = [];
        for(let item of allExercises.values()) {
            if(item.days.some(exerciseDay => exerciseDay == Days[day])) result.push(item);
        }

        return result;
    }

    public async getById(userId: string, exerciseId: string): Promise<ExerciseDTO> {
        const snapshot: DataSnapshot = await get(ref(this.db, `exercises/${userId}/${exerciseId}`));
        
        if(snapshot.exists()) return snapshot.val() as ExerciseDTO;
        return {} as ExerciseDTO;
    }
    
    public async markAsDone(exercise: ExerciseDTO, isDone: boolean): Promise<ExerciseDTO> {
        const exerciseToUpdate = await this.getById(exercise.userId, exercise.id);

        exerciseToUpdate.done = isDone 
            ? new Date().toLocaleString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'})
            : null;

        await update(ref(this.db, `exercises/${exercise.userId}/${exercise.id}`), exerciseToUpdate);

        return exerciseToUpdate;
    }

    public isDone(exercise: ExerciseDTO): boolean {
        if(!exercise.done) return false;

        const today = new Date().toLocaleString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'});

        return today == exercise.done;
    }

    public async addSeries(userId: string, exerciseId: string, series: SeriesDTO): Promise<SeriesDTO[]> {
        const exercise = await this.getById(userId, exerciseId);
        
        if(!exercise.series) exercise.series = [];

        exercise.series.push(series);

        await update(ref(this.db, `exercises/${userId}/${exerciseId}`), exercise);

        return exercise.series;
    }
}