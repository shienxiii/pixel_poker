import { Container } from "pixi.js";
import { CARD_WIDTH } from "./const";

export class Player
{
    constructor(name)
    {
        this.name = name;
        this.hand = [];
        this.valid = true;
        this.handContainer = null;
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

    /**
     * Receive a single card
     * @param {Card} card 
     */
    dealCard(card)
    {
        this.hand.push(card);
        this.handContainer.addChild(card.sprite);

        this.#arrangeHandSprite();
    }

    #arrangeHandSprite()
    {
        // calculate where to start calculate and place the card on the container
        const spaceNeeded = CARD_WIDTH * this.hand.length;
        const startX = -(spaceNeeded / 2) + (CARD_WIDTH / 2);

        for(let i = 0; i < this.hand.length; i++)
        {
            this.hand[i].sprite.position.set(startX + (i * CARD_WIDTH), 0);
        }
    }
    
    logInfo()
    {
        console.log(`name: ${this.name} | valid: ${this.valid}`);
    }
}