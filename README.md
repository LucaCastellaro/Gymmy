# Gymmy

Gestisci le tue sessioni in palestra con facilità.

Live [qui](https://gimmy-1075a.web.app/).

## Esempio

Dopo aver effettuato la login ti troverai nella tua scheda giornaliera, in cui vengono elencati gli esercizi che hai programmato per oggi. Se questa pagina è vuota, prova ad aggiungere un esercizio (vedi più avanti in questo documento).

### Esercizi

#### Aggiungere un nuovo esercizio
Puoi aggiungere un esercizio specificando:
- Nome
- Giorni della settimana in cui vuoi programmarlo
- (opzionale) Descrizione -> al momento non viene mostrato nella UI
- (opzionale) Link a un video, articolo o sito per riferimento -> al momento non viene mostrato nella UI

Dopo aver aggiunto l'esercizio, puoi vedere i suoi dettagli cliccando sul suo nome.

#### Modificare/eliminare esercizio
Puoi modificare/eliminare un esercizio con i pulsanti dedicati affianco al suo nome.

#### Segnare un esercizio come fatto/non fatto
Il terzo pulsante affianco al noome dell'esercizio, lo segnerà come fatto/non fatto oggi. Questo dato verrà salvato nel database.

#### Segnare tutti gli esercizi come fatti
Il pulsante affianco a quello per aggiungere un nuovo esercizio, segnerà tutti gli esercizi visualizzati come fatti oggi. Questo dato verrà salvato nel database.

### Serie

#### Aggiungere una nuova serie ad un esercizio
Dalla schermata di dettaglio esercizio puoi aggiungere serie all'esercizio, specificando:
- Ripetizioni
- Peso
- Pausa (in secondi)

#### Modificare/eliminare serie
Puoi modificare/eliminare una serie con i pulsanti dedicati affianco al suo nome.

#### Segnare come fatta una serie
Puoi segnare come fatta una serie spuntando la casella dedicata. Questo dato **NON** verrà salvato nel database.

#### Pausa di fine serie 
Puoi far partire una pausa al termine di una serie con il pulsante dedicato affianco al nome della serie. Dopo il numero di secondi che hai inserito in fase di creazione/modifica serie, partirà un suono di promemoria. Il pulsante di pausa cambierà in **fine pausa** ed inizierà a lampeggiare. Clicca su questo pulsante per fermare il suono e terminare la pausa.

#### Tornare alla home (scheda giornaliera)
Quando sei all'interno di un dettaglio esercizio, puoi tornare alla scheda giornaliera con il pulsante home in alto a destra.
