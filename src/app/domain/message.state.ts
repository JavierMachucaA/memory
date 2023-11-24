import { Activity } from "./activity.enum";
import { CardEntity } from "./card.entity";
import { Score } from "./changeTurn.entity";
import { FlipCard } from "./flipCard.entity";
import { LockCard } from "./lockCard.entity";

export interface Message {
    activity: Activity;
    stackCard?: CardEntity; 
    flipCard?: FlipCard;
    score?: Score;
    lockCard?:LockCard;
}