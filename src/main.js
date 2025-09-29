import * as PIXI from "pixi.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { dealDeckToHand } from "./dealer.js";
import { Table } from "./table.js";


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

    table.addNewPlayer("shien");
    table.addNewPlayer("fubuki");
    table.addNewPlayer("miko");
    table.addNewPlayer("suisei");
    table.logPlayers();

    table.seatPlayers();
    table.seatPlayers();
    table.logSeats();



    const deck = new Deck();
    await deck.initializeSprites();
    deck.shuffleDeck();

    let player = new Player("shien");

    for(let i = 0; i < deck.cards.length; i++)
    {
        let x = i % 13 * deck.cards[i].sprite.width;
        let y = Math.floor(i / 13) * deck.cards[i].sprite.height;
        deck.cards[i].sprite.position.set(x, y);
        
        deck.cards[i].ToggleClickable(true)
        app.stage.addChild(deck.cards[i].sprite);
    }
})()
