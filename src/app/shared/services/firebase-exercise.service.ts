import { Injectable } from '@angular/core';
import { ref, set, get, DataSnapshot, remove, update } from "firebase/database";
import { ExerciseDTO } from '../models/DTO/ExerciseDTO';
import { Guid } from 'guid-typescript';
import { Database } from '@angular/fire/database';
import { Days } from '../models/enums/days.enum';

@Injectable()
export class FirebaseExerciseService {
    constructor(private readonly db: Database) {
    }

    public async delete(model: ExerciseDTO): Promise<ExerciseDTO> {
        await remove(ref(this.db,`exercises/${model.userId}/${model.id}`));

        return model;
    }

    public async add(model: ExerciseDTO): Promise<ExerciseDTO> {
        model.id = Date.now();

        console.debug('exercise.add', model);

        await set(ref(this.db, `exercises/${model.userId}/${model.id}`), model);

        return await this.getById(model.userId, model.id);
    }

    public async getAll(userId: string): Promise<Map<number, ExerciseDTO>> {
        const snapshot: DataSnapshot = await get(ref(this.db, `exercises/${userId}`));
        if(snapshot.exists()) {
            const result = new Map<number, ExerciseDTO>();

            const temp: ExerciseDTO[] = [];

            snapshot.forEach(item => {
                const value = item.val() as ExerciseDTO;
                temp.push(value);
                result.set(value.id, value);
            })

            temp.sort(item => item.id)
                .forEach(item => {
                    result.set(item.id, item);
                });

            return result;
        }
        return new Map<number, ExerciseDTO>();
    }

    public async getDaily(userId: string, day: string): Promise<ExerciseDTO[]> {
        const allExercises = await this.getAll(userId);

        const result: ExerciseDTO[] = [];
        for(let item of allExercises.values()) {
            if(item.days.some(exerciseDay => exerciseDay == day)) result.push(item);
        }

        return result;
    }

    public async getById(userId: string, exerciseId: number): Promise<ExerciseDTO> {
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

    public async update(exercise: ExerciseDTO): Promise<ExerciseDTO> {
        if(!exercise.series) exercise.series = [];
        if(!exercise.done) exercise.done = null;
        if(!exercise.link) exercise.link = null;


        await update(ref(this.db, `exercises/${exercise.userId}/${exercise.id}`), exercise);
        return exercise;
    }
}