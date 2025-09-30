import { Container } from "pixi.js";
import * as ArrayFunctionLibrary from "./function_library/array_function_library.js";
import * as MathFunctionLibrary from "./function_library/math_function_library.js"
import { GameState } from "./gamestate";
import { Player } from "./player";

class Seat
{
    constructor()
    {
        this.player = null;
        this.isLocal = false;

        // this container is used to store visuals related to the seat,
        // such as player's hand, info UI, and action UI
        this.container = new Container();
    }

    /**
     * @param {Player} player The player instance to assign to this table
     */
    AssignPlayer(player)
    {
        if(this.player != null) { return false; }

        this.player = player;
        this.player.onSeated();
        return true;
    }
}

export class Table
{
    constructor(maxPlayers)
    {
        this.state = new GameState(maxPlayers);
        this.seats = [];
        this.container = new Container();

        const baseRotationSpread = 2 * Math.PI / maxPlayers;

        // Create the seat instances
        for(let i = 0; i < this.state.maxPlayers; i++)
        {
            const seat = new Seat();

            // determine the position to place the Seat's container
            const pos = MathFunctionLibrary.rotateAroundPivot(0, 200, 0, 0, baseRotationSpread * i);
            seat.container.position.set(pos.x, pos. y);

            this.seats.push(seat);
        }
    }

    /**
     * Try to add the new player to game state
     * @param {String} newPlayer 
     */
    addNewPlayer(newPlayer)
    {
        this.state.addNewPlayer(newPlayer);
    }

    seatPlayers()
    {
        const emptySeats = this.getEmptySeats();

        if(emptySeats.length == 0) { return; }

        // we want to seat any unseated players
        this.state.players.forEach(player =>
        {
            if(this.#playerAlreadySeated(player) || emptySeats.length == 0) { return; }

            const seat = ArrayFunctionLibrary.removeAt(emptySeats, 0);
            seat.AssignPlayer(player);

            // add the player's hand container
            seat.container.addChild(player.handContainer);
        });
        
    }

    getEmptySeats()
    {
        return this.seats.filter(seat => seat.player == null);
    }

    #playerAlreadySeated(player)
    {
        const index = this.seats.findIndex((seat) => 
        {
            return seat.player == player;
        });

        return index != -1;
    }

    logPlayers()
    {
        this.state.players.forEach(player => {
            player.logInfo();
        });
    }

    logSeats()
    {
        this.seats.forEach(seat => {
            console.log(seat);
        });
    }
}