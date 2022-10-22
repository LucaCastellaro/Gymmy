import { Injectable } from '@angular/core';
import { Database, DataSnapshot, get, ref, remove, update } from '@angular/fire/database';
import { Guid } from 'guid-typescript';
import { SeriesDTO } from '../models/DTO/SeriesDTO';

@Injectable()
export class FirebaseSeriesService {
    constructor(private readonly db: Database) {
    }

    public async add(userId: string, exerciseId: number, series: SeriesDTO): Promise<number> {
        series.id = Date.now()

        await update(ref(this.db, `exercises/${userId}/${exerciseId}/series/${series.id}`), series);

        return series.id;
    }

    public async delete(series: SeriesDTO): Promise<boolean> {
        const snapshot = await get(ref(this.db, `exercises/${series.userId}/${series.exerciseId}/series/${series.id}`))

        if(!snapshot.exists()) return false;

        await remove(ref(this.db, `exercises/${series.userId}/${series.exerciseId}/series/${series.id}`))

        return true;
    }

    public async update(series: SeriesDTO): Promise<boolean> {
        const snapshot = await get(ref(this.db, `exercises/${series.userId}/${series.exerciseId}/series/${series.id}`))

        if(!snapshot.exists()) return false;

        await update(ref(this.db, `exercises/${series.userId}/${series.exerciseId}/series/${series.id}`), series)

        return true;
    }
}