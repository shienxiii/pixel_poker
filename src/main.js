import * as PIXI from "pixi.js";
import { Deck } from "./deck.js";


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

    // initialize manifest.json as that's where reference to all assets are
    await PIXI.Assets.init({manifest: "/manifest.json"})    

    const deck = new Deck();
    await deck.InitializeSprites();

    for(let i = 0; i < deck.cards.length; i++)
    {
        let x = i % 13 * deck.cards[i].sprite.width;
        let y = Math.floor(i / 13) * deck.cards[i].sprite.height;
        deck.cards[i].sprite.position.set(x, y);
        
        deck.cards[i].ToggleClickable(true)
        app.stage.addChild(deck.cards[i].sprite);
    }
})()
