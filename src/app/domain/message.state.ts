import { Activity } from "./activity.enum";
import { CardEntity } from "./card.entity";
import { FlipCard } from "./flipCard.entity";

export interface Message {
    activity: Activity;
    stackCard?: CardEntity; 
    flipCard?: FlipCard;
}