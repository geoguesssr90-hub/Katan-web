<template>
    <div class="honeycomb-image-area">

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
                <div v-if="gains.length" class="gains">
                    <span class="gain-item" v-for="g in gains" :key="g.resource">
                        {{ resourceIcon(g.resource) }} {{ resourceLabel(g.resource) }} ×{{ g.count }}
                    </span>
                </div>
                <div v-else class="gains-none">この目のタイルはありません</div>
            </template>
        </div>
    </div>

    <div class="legend">
        <div class="legend-item" v-for="r in legendResources" :key="r.type">
            <span class="legend-swatch" :class="`hexagon--${r.type}`"></span>{{ r.label }}
        </div>
    </div>

	<div class="hexagon-wrapper">
		<div v-for="(row, ri) in rows" :key="ri" class="hex-row">
            <div
                class="hexagon"
                :class="[`hexagon--${tile.resource}`, { 'hexagon--active': isActive(tile) }]"
                v-for="(tile, ti) in row"
                :key="ti"
            >
                <div v-if="tile.number !== null" class="token" :class="{ 'token--hot': tile.number === 6 || tile.number === 8 }" :style="tokenStyle(tile.number)">
                    <span class="token-number" :style="{ fontSize: numberFontSize(tile.number) + 'px' }">{{ tile.number }}</span>
                    <span class="token-pips">{{ '•'.repeat(pips(tile.number)) }}</span>
                </div>
            </div>
		</div>
	</div>
</div>
</template>


<script setup>

const legendResources = RESOURCES.map(r => ({ type: r.type, label: resourceLabel(r.type) }));

const tokenStyle = (n) => {
    const size = 28 + pips(n) * 4; // 32px (2/12) up to 48px (6/8)
    return { width: `${size}px`, height: `${size}px` };
};
const numberFontSize = (n) => 12 + pips(n) * 3; // 15px (2/12) up to 27px (6/8)

const tiles = generateTiles();
const rows = sliceIntoRows(tiles);

const die1 = ref(1);
const die2 = ref(1);
const rolledSum = ref(null);

const rollDice = () => {
    die1.value = 1 + Math.floor(Math.random() * 6);
    die2.value = 1 + Math.floor(Math.random() * 6);
    rolledSum.value = die1.value + die2.value;
};

const isActive = (tile) => rolledSum.value !== null && tile.number === rolledSum.value;

const gains = computed(() => {
    if (rolledSum.value === null || rolledSum.value === 7) return [];
    const counts = {};
    tiles.forEach(tile => {
        if (tile.number === rolledSum.value) {
            counts[tile.resource] = (counts[tile.resource] || 0) + 1;
        }
    });
    return Object.entries(counts).map(([resource, count]) => ({ resource, count }));
});

</script>



<style scoped>

.dice-panel{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
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

.gains{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-top: 6px;
}

.gain-item{
    background-color: #f2e6c9;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 14px;
    white-space: nowrap;
}

.gains-none{
    color: #666;
    font-size: 13px;
    margin-top: 4px;
}

.legend{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 12px;
}

.legend-item{
    display: flex;
    align-items: center;
    gap: 4px;
}

.legend-swatch{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 3px;
}

.hexagon-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hex-row{
    display: flex;
    flex-direction: row;
}

/* each row overlaps the previous one by a quarter of the hexagon's
   height so the pointed tops/bottoms nest into the row above/below */
.hex-row + .hex-row{
    margin-top: -29px;
}

.hexagon{
    position: relative;
    width: 100px;
    aspect-ratio: 173/200;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, filter 0.2s ease;
}

.hexagon--active{
    filter: drop-shadow(0 0 6px #ffd54a) drop-shadow(0 0 10px #ffd54a);
    transform: scale(1.06);
    z-index: 2;
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

</style>
