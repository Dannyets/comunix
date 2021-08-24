export enum MessageType {
    Single,
    Broadcast,
}

export interface Payload {
    message: string;
    type: MessageType
}