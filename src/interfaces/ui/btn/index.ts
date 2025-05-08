import { MouseEvent } from "react";

export interface BtnProps {
    type: 'submit' | 'button' | 'reset',
    text: string,
    actionWithDateEvent: boolean,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}