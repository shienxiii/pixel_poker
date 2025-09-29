import { GameState } from "./gamestate";
import { Player } from "./player";

class Seat
{
    constructor()
    {
        this.player = null;
        this.isLocal = false;
    }

    /**
     * 
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

        // Create the seat instances
        for(let i = 0; i < this.state.maxPlayers; i++)
        {
            this.seats.push(new Seat());
        }
    }

    /**
     * Try to add the new player to game state
     * @param {string} newPlayer 
     */
    addNewPlayer(newPlayer)
    {
        this.state.onPlayerJoinedRoom(newPlayer);
    }

    seatPlayers()
    {
        const emptySeats = this.getEmptySeats();

        // CONTINUE HERE

        if(emptySeats.length == 0)
        {
            console.log("no empty seat");
            return;
        }

        this.state.players.forEach(player =>
        {
            if(this.playerAlreadySeated(player) || emptySeats.length == 0)
            {
                console.log(`${player.name} already seated`);
                return;
            }

            emptySeats[0].player = player;
            console.log(emptySeats[0]);
            emptySeats.splice(0, 1);
        });

        console.log(`empty seats remaning: ${emptySeats.length}`);
    }

    getEmptySeats()
    {
        //return this.seats.filter(function(seat) {return seat.player == null; });
        return this.seats.filter(seat => seat.player == null);
    }

    playerAlreadySeated(player)
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