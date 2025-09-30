import * as PIXI from "pixi.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { dealDeckToHand } from "./dealer.js";
import { Table } from "./table.js";
import { CARD_HEiGHT, CARD_WIDTH } from "./const.js";


(async() =>
{
    const app = new PIXI.Application();
    
    await app.init({
        resizeTo: window,
        backgroundColor: "#852928"
    });

    app.canvas.style.position = 'absolute';
    
    document.body.appendChild(app.canvas);

    PIXI.TexturePool.textureOptions.scaleMode = 'nearest';

    await PIXI.Assets.init({manifest: "./manifest.json"})    

    // create a new table, this is the central part of the game session
    // we want 6 players max on the table
    const table = new Table(6);
    app.stage.addChild(table.container);
    table.container.position.set(app.canvas.width / 2, app.canvas.height / 2);


    table.addNewPlayer("shien");
    table.addNewPlayer("fubuki");
    table.addNewPlayer("miko");
    table.addNewPlayer("suisei");
    table.addNewPlayer("azki");
    table.addNewPlayer("tokinosora");

    table.seatPlayers();

    const deck = new Deck();
    await deck.initializeSprites();
    deck.shuffleDeck();

    for(let i = 0; i < deck.cards.length; i++)
    {
        let x = i % 13 * deck.cards[i].sprite.width;
        let y = Math.floor(i / 13) * deck.cards[i].sprite.height;
        deck.cards[i].sprite.position.set(x + CARD_WIDTH / 2, y + CARD_HEiGHT / 2);
        
        deck.cards[i].toggleClickable(true)
        app.stage.addChild(deck.cards[i].sprite);
    }

    table.logSeats();

    
    table.seats.forEach(seat =>
    {
        if(seat.player == null) { return; }
        seat.player.dealCard(deck.cards.pop());
        seat.player.dealCard(deck.cards.pop());
        table.container.addChild(seat.container);        
    });

})()
