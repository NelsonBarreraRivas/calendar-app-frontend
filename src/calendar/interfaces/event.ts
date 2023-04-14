export interface Event {
    id: string;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    user: { uid: string, name: string}
}