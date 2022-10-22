import { SeriesDTO } from "./SeriesDTO";

export interface ExerciseDTO {
	id: string,
	userId: string,
	title: string,
	series: KeyValuePair<SeriesDTO>,
	days: string[],
	link?: string | null,
	descr?: string | null,
	done?: string | null
}

export interface KeyValuePair<T> extends Iterable<T> {
	[key:string]: T
}