<template>
    <div class="play-board-area">

    <div class="player-panel">
        <p class="player-panel-label">誰が置くか選んでください</p>
        <div class="player-swatches">
            <button
                v-for="p in PLAYERS"
                :key="p.id"
                class="player-swatch"
                :class="{ 'player-swatch--active': currentPlayer === p.id }"
                :style="{ backgroundColor: p.color }"
                :aria-label="p.label"
                @click="currentPlayer = p.id"
            ></button>
        </div>
        <p class="hint">頂点をクリックして開拓地を置く/外す。すでにある開拓地から辺2つ分は離す必要があります。</p>
        <p v-if="blockedMessage" class="blocked-message">{{ blockedMessage }}</p>
    </div>

    <div class="board-scroll">
        <div class="board-canvas" :style="{ width: BOARD_WIDTH + 'px', height: BOARD_HEIGHT + 'px' }">

            <div
                class="hexagon"
                :class="`hexagon--${hex.resource}`"
                v-for="(hex, hi) in hexes"
                :key="hi"
                :style="{ left: hex.left + 'px', top: hex.top + 'px', width: HEX_W + 'px', height: HEX_H + 'px' }"
            >
                <div v-if="hex.number !== null" class="token" :class="{ 'token--hot': hex.number === 6 || hex.number === 8 }" :style="tokenStyle(hex.number)">
                    <span class="token-number" :style="{ fontSize: numberFontSize(hex.number) + 'px' }">{{ hex.number }}</span>
                    <span class="token-pips">{{ '•'.repeat(pips(hex.number)) }}</span>
                </div>
            </div>

            <button
                v-for="v in vertices"
                :key="v.id"
                class="vertex"
                :class="{ 'vertex--occupied': !!settlements[v.id] }"
                :style="{ left: v.x + 'px', top: v.y + 'px', backgroundColor: settlements[v.id] ? playerColor(settlements[v.id]) : undefined }"
                @click="toggleSettlement(v)"
            ></button>

        </div>
    </div>

    <div class="dice-panel">
        <button class="roll-button" @click="rollDice">サイコロを振る</button>
        <div class="dice-faces">
            <span class="die">{{ diceFace(die1) }}</span>
            <span class="die">{{ diceFace(die2) }}</span>
        </div>
        <div v-if="rolledSum !== null" class="roll-result">
            合計: <strong>{{ rolledSum }}</strong>
            <div v-if="rolledSum === 7" class="robber-alert">🥷 盗賊が出現!(資源はもらえません)</div>
            <template v-else>
                <div v-if="playerGains.length" class="player-gains">
                    <div class="player-gain-row" v-for="pg in playerGains" :key="pg.playerId">
                        <span class="player-gain-swatch" :style="{ backgroundColor: playerColor(pg.playerId) }"></span>
                        <span class="gain-item" v-for="g in pg.gains" :key="g.resource">
                            {{ resourceIcon(g.resource) }} {{ resourceLabel(g.resource) }} ×{{ g.count }}
                        </span>
                    </div>
                </div>
                <div v-else class="gains-none">この目に隣接する開拓地はありません</div>
            </template>
        </div>
    </div>

</div>
</template>


<script setup>

const HEX_W = 100;
const HEX_H = HEX_W * 200 / 173;
const ROW_PITCH = HEX_H * 0.75;
const BOARD_WIDTH = Math.max(...ROW_SIZES) * HEX_W;
const BOARD_HEIGHT = (ROW_SIZES.length - 1) * ROW_PITCH + HEX_H;

// two vertices closer than this are the same corner or true neighbors (edge length is ~58px);
// the next-nearest distinct corner is always ~100px away, so this threshold can't misfire
const ADJACENT_THRESHOLD = 65;

const PLAYERS = [
    { id: 'red', label: '赤', color: '#c0392b' },
    { id: 'blue', label: '青', color: '#2a5db0' },
    { id: 'white', label: '白', color: '#e8e8e8' },
    { id: 'orange', label: '橙', color: '#d9822b' },
];
const playerColor = (id) => PLAYERS.find(p => p.id === id)?.color;

const tokenStyle = (n) => {
    const size = 28 + pips(n) * 4;
    return { width: `${size}px`, height: `${size}px` };
};
const numberFontSize = (n) => 12 + pips(n) * 3;

const tiles = generateTiles();

const hexes = [];
{
    let idx = 0;
    ROW_SIZES.forEach((n, r) => {
        const rowTop = r * ROW_PITCH;
        const rowLeft = (BOARD_WIDTH - n * HEX_W) / 2;
        for (let i = 0; i < n; i++) {
            const left = rowLeft + i * HEX_W;
            hexes.push({ ...tiles[idx], left, top: rowTop, centerX: left + HEX_W / 2 });
            idx++;
        }
    });
}

const hexVertexPoints = (hex) => ([
    { x: hex.centerX, y: hex.top },
    { x: hex.left + HEX_W, y: hex.top + 0.25 * HEX_H },
    { x: hex.left + HEX_W, y: hex.top + 0.75 * HEX_H },
    { x: hex.centerX, y: hex.top + HEX_H },
    { x: hex.left, y: hex.top + 0.75 * HEX_H },
    { x: hex.left, y: hex.top + 0.25 * HEX_H },
]);

const vertexMap = new Map();
hexes.forEach((hex, hexId) => {
    hexVertexPoints(hex).forEach(point => {
        const key = `${Math.round(point.x)}_${Math.round(point.y)}`;
        if (!vertexMap.has(key)) {
            vertexMap.set(key, { id: key, x: point.x, y: point.y, hexIds: [] });
        }
        vertexMap.get(key).hexIds.push(hexId);
    });
});
const vertices = [...vertexMap.values()];
const verticesById = Object.fromEntries(vertices.map(v => [v.id, v]));

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const currentPlayer = ref('red');
const settlements = reactive({});
const blockedMessage = ref('');
let blockedTimer = null;

const toggleSettlement = (vertex) => {
    if (settlements[vertex.id] === currentPlayer.value) {
        delete settlements[vertex.id];
        return;
    }
    if (settlements[vertex.id]) {
        showBlocked('他のプレイヤーの開拓地があるため置けません');
        return;
    }
    const tooClose = Object.keys(settlements).some(id => distance(verticesById[id], vertex) < ADJACENT_THRESHOLD);
    if (tooClose) {
        showBlocked('隣接する頂点には置けません(2辺分離してください)');
        return;
    }
    settlements[vertex.id] = currentPlayer.value;
};

const showBlocked = (message) => {
    blockedMessage.value = message;
    clearTimeout(blockedTimer);
    blockedTimer = setTimeout(() => { blockedMessage.value = ''; }, 2000);
};

const die1 = ref(1);
const die2 = ref(1);
const rolledSum = ref(null);

const rollDice = () => {
    die1.value = 1 + Math.floor(Math.random() * 6);
    die2.value = 1 + Math.floor(Math.random() * 6);
    rolledSum.value = die1.value + die2.value;
};

const playerGains = computed(() => {
    if (rolledSum.value === null || rolledSum.value === 7) return [];
    return PLAYERS
        .map(player => {
            const ownedVertexIds = Object.keys(settlements).filter(id => settlements[id] === player.id);
            const counts = {};
            ownedVertexIds.forEach(id => {
                verticesById[id].hexIds.forEach(hexId => {
                    const hex = hexes[hexId];
                    if (hex.number === rolledSum.value && hex.resource !== 'desert') {
                        counts[hex.resource] = (counts[hex.resource] || 0) + 1;
                    }
                });
            });
            const gains = Object.entries(counts).map(([resource, count]) => ({ resource, count }));
            return { playerId: player.id, gains };
        })
        .filter(pg => pg.gains.length > 0);
});

</script>



<style scoped>

.play-board-area{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.player-panel{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
}

.player-panel-label{
    margin: 0;
    font-size: 13px;
}

.player-swatches{
    display: flex;
    gap: 8px;
}

.player-swatch{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #999;
    cursor: pointer;
    padding: 0;
}

.player-swatch--active{
    border-color: #222;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #222;
}

.hint{
    max-width: 480px;
    text-align: center;
    font-size: 12px;
    color: #666;
    margin: 0;
}

.blocked-message{
    color: #b3261e;
    font-size: 12px;
    margin: 0;
}

.board-scroll{
    max-width: 100%;
    overflow-x: auto;
}

.board-canvas{
    position: relative;
}

.hexagon{
    position: absolute;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.hexagon--forest{
    background-color: #2f6b2f;
}

.hexagon--hills{
    background-color: #c1602c;
}

.hexagon--mountains{
    background-color: #8a97a0;
}

.hexagon--fields{
    background-color: #e3b23c;
}

.hexagon--pasture{
    background-color: #a9c25d;
}

.hexagon--desert{
    background-color: #e4d5a8;
}

.token{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f2e6c9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.token-number{
    font-weight: bold;
    line-height: 1;
    color: #2b2b2b;
}

.token--hot .token-number{
    color: #b3261e;
}

.token-pips{
    font-size: 9px;
    line-height: 1;
    letter-spacing: 1px;
    color: #2b2b2b;
}

.token--hot .token-pips{
    color: #b3261e;
}

.vertex{
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -8px;
    margin-top: -8px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    background-color: rgba(0, 0, 0, 0.25);
    padding: 0;
    cursor: pointer;
    z-index: 3;
}

.vertex:hover{
    background-color: rgba(0, 0, 0, 0.45);
}

.vertex--occupied{
    width: 22px;
    height: 22px;
    margin-left: -11px;
    margin-top: -11px;
    border-color: #222;
}

.dice-panel{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
}

.roll-button{
    padding: 8px 22px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    background-color: #3a6b3a;
    color: #fff;
    cursor: pointer;
}

.roll-button:hover{
    background-color: #2f5a2f;
}

.dice-faces{
    display: flex;
    gap: 10px;
    font-size: 42px;
    line-height: 1;
}

.roll-result{
    text-align: center;
}

.robber-alert{
    color: #b3261e;
    font-weight: bold;
    margin-top: 4px;
}

.player-gains{
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 6px;
    align-items: center;
}

.player-gain-row{
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
}

.player-gain-swatch{
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #333;
}

.gain-item{
    background-color: #f2e6c9;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 13px;
    white-space: nowrap;
}

.gains-none{
    color: #666;
    font-size: 13px;
    margin-top: 4px;
}

</style>
