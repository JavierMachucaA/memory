import { Owner } from "./owner.enum";

export interface Score {
    isPlayer1Turn: boolean;
    isPlayer2Turn: boolean;
    owner: Owner;
}