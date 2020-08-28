export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen:{
            width:10,
            height:10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }
    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }
    
    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }
    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];
    }

    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player){
                console.log('Moving player Up');
                if (player.y > 0){
                    player.y--;
                }
            },
            ArrowRight(player) {
                console.log('Moving player Right');
                if (player.x < state.screen.width -1) {
                    player.x++;
                }
            },
            ArrowDown(player) {
                console.log('Moving player Down');
                if (player.y < state.screen.height -1){
                    player.y++;
                }
            },
            ArrowLeft(player) {
                console.log('Moving player Left');
                if (player.x > 0) {
                    player.x--;
                }
            }
        }

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed];

        if (moveFunction && player){
            moveFunction(player);
            checkForFruitCollizion(command.playerId)
        }
    }

    function checkForFruitCollizion(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`);
                removeFruit({fruitId:fruitId});
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
    }
}