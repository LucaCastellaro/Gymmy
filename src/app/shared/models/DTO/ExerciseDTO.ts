export interface ExerciseDTO {
    id: string,
    userId: string,
	title: string,
	series: number,
	reps: number,
	weight: number,
	pauseSeconds: number,
	days: number[],
	link?: string | null,
	descr?: string | null,
	done?: Date | null
}