export class Card
{
    constructor(rank, suit, sprite)
    {
        this.rank = rank;
        this.suit = suit;
        this.sprite = sprite;

        // NOTE TO SELF: This method is need to bind pointerdown event onto OnClicked() of this class
        this.sprite.addEventListener("pointerdown", ev => this.OnClicked());
    }

    ToggleClickable(canClick)
    {
        this.sprite.eventMode = canClick ? "static" : "none";
        this.sprite.cursor = "pointer";
    }

    OnClicked()
    {
        console.log(this);
    }
}