import * as PIXI from "pixi.js";
import { CARD_HEiGHT, CARD_WIDTH, RANK, SPRITE_SQUARE_EDGE, X_MARGIN, Y_MARGIN, SUIT } from "./const";
import { Card } from "./card";

export class Deck
{
    constructor()
    {
        this.width = 40;
        this.height = 60;
    }

    async initializeSprites()
    {
        this.cardAssets = await PIXI.Assets.loadBundle("playing_cards");
        this.#parseCardSpritesheetFront(this.cardAssets.playing_cards_small);
    }

    #parseCardSpritesheetFront(textureSource)
    {
        // NOTE: card spritesheet are arranged in 64x64 inclusive of empty spaces
        // NOTE 2: Check note in /images/cards/note.txt for more info

        this.cards = [];

        for(let row = 0; row < 4; row++)
        {
            const y = (row * SPRITE_SQUARE_EDGE) + Y_MARGIN;
            for(let column = 0; column < 13; column++)
            {
                const x = (column * SPRITE_SQUARE_EDGE) + X_MARGIN;

                const frame = new PIXI.Rectangle(x, y, CARD_WIDTH, CARD_HEiGHT);
                
                this.#addCardSprite(RANK[column], SUIT[row], textureSource, frame);
            }
        }
    }

    #addCardSprite(rank, suit, textureSource, frame)
    {
        const cardFrame = new PIXI.Texture({source: textureSource, frame: frame});
        const cardSprite = PIXI.Sprite.from(cardFrame);
        cardSprite.anchor.set(0.5);
        cardSprite.position
        this.cards.push(new Card(rank, suit, cardSprite));
    }

    shuffleDeck()
    {
        // shuffle the deck using Fisher-Yates shuffle algorithm
        for(let i = this.cards.length - 1; i >= 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}