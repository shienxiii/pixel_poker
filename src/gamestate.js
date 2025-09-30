import { Player } from "./player.js";

export class GameState
{
    constructor(maxPlayers)
    {
        this.maxPlayers = maxPlayers;
        
        // Holds reference to all players currently in the room,
        // Including those who joined are waiting and in queue.
        // This array may extend beyond maxPlayer
        this.players = [];

        // Holds reference to all players currently playing.
        // Should not extend beyond maxPlayers.
        this.playing = [];
    }

    /**
     * Event to fire when a new player joins the room.
     * Queues the player to join the game on the next round
     * 
     * @param {String} playerName name of the player joining the game
     */
    addNewPlayer(playerName)
    {
        this.players.push(new Player(playerName));
    }

    /**
     * Event to fire when a player left the room.
     * Removes the player from players array and invalidate the player on the playing list.
     * 
     * @param {Player} player instance of player who left the game
     */
    onPlayerLeftRoom(player)
    {
        player.valid = false;
    }

    /**
     * Event to run prior to starting the next round.
     * Task include removing invalidated players from the table
     * and adding players from the queue
     */
    onPreRoundStart()
    {
        this.#removeInvalidatedPlayers();

        // try to move players not currently in playing array, limited to maxPlayers number of elements
        for(let i = 0; i < this.players.length && this.playing.length < this.maxPlayers; i++)
        {
            if(this.players[i].valid &&
                this.playing.indexOf(player[i]) == -1)
            {
                this.playing.push(players[i]);
            }
        }
    }

    /**
     * Event to run at the start of the round.
     */
    onRoundStart()
    {
        
    }

    #removeInvalidatedPlayers()
    {
        for(let i = this.player.length - 1; i >= 0; i--)
        {
            if(!this.player[i].valid)
            {
                this.#removePlayerFromPlaying(player[i]);
                this.player.splice(i, 1);
            }
        }
    }

    /**
     * Find and remove the given Player instance from the playing list.
     * @param {Player} player 
     */
    #removePlayerFromPlaying(player)
    {
        const index = this.playing.indexOf(player);
        if(index > -1)
        {
            this.playing.splice(index, 1);
        }
    }
}