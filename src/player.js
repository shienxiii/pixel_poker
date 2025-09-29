import { Container } from "pixi.js";

export class Player
{
    constructor(name)
    {
        this.name = name;
        this.hand = [];
        this.valid = true;
    }

    /**
     * Event to run when player is assigned a seat
     */
    onSeated()
    {
        // This is the container used to store the sprite
        // of the card that is currently held by this player instance
        this.handContainer = new Container();
    }
    
    logInfo()
    {
        console.log(`name: ${this.name} | valid: ${this.valid}`);
    }
}