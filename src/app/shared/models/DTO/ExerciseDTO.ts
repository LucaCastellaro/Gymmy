import { SeriesDTO } from "./SeriesDTO";

export interface ExerciseDTO {
	id: string,
	userId: string,
	title: string,
	series: SeriesDTO[],
	days: string[],
	link?: string | null,
	descr?: string | null,
	done?: string | null
}