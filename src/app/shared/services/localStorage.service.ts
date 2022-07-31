import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../constants/localStorage.constants';

@Injectable()
export class LocalStorageService {
    constructor() { }

    public set<T>(key: string, value: T): void{
        localStorage.setItem(key, JSON.stringify(value));
    }

    public get<T>(key: string): T | null {
        const value: string | null = localStorage.getItem(key);
        if(!value) return null;

        return JSON.parse(value);
    }

    public clear(): void {
        localStorage.clear();
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem(LocalStorageConstants.CurrentUser);
    }
}