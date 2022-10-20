export enum Days {
    Lunedì = 'Lunedì',
    Martedì = 'Martedì',
    Mercoledì = 'Mercoledì',
    Giovedì = 'Giovedì',
    Venerdì = 'Venerdì',
    Sabato = 'Sabato',
    Domenica = 'Domenica'
}

export const Today = () => {
    return Object.keys(Days)[new Date().getDay() - 1];
}