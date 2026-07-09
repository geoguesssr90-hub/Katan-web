export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// resource-tile counts on a real Catan board (19 hexes total)
export const RESOURCES = [
    { type: 'forest', count: 4 },
    { type: 'hills', count: 3 },
    { type: 'mountains', count: 3 },
    { type: 'fields', count: 4 },
    { type: 'pasture', count: 4 },
    { type: 'desert', count: 1 },
];

export const RESOURCE_LABELS = { forest: '木材', hills: 'レンガ', mountains: '鉱石', fields: '小麦', pasture: '羊毛', desert: '砂漠' };
export const RESOURCE_ICONS = { forest: '🌲', hills: '🧱', mountains: '⛏️', fields: '🌾', pasture: '🐑', desert: '🏜️' };
export const resourceLabel = (type) => RESOURCE_LABELS[type];
export const resourceIcon = (type) => RESOURCE_ICONS[type];

// the 18 number tokens that go on every tile except the desert
export const NUMBERS = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

// number of ways to roll each value with 2d6 - drives pip dots and token/number sizing
export const PIPS = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1 };
export const pips = (n) => PIPS[n] ?? 0;

export const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
export const diceFace = (n) => DICE_FACES[n - 1];

// the board reads top-to-bottom as rows of 3, 4, 5, 4, 3 hexes
export const ROW_SIZES = [3, 4, 5, 4, 3];

export const generateTiles = () => {
    const resources = shuffleArray(RESOURCES.flatMap(r => Array(r.count).fill(r.type)));
    const numbers = shuffleArray([...NUMBERS]);
    let ni = 0;
    return resources.map(resource => (
        resource === 'desert'
            ? { resource, number: null }
            : { resource, number: numbers[ni++] }
    ));
};

export const sliceIntoRows = (tiles) => {
    const rows = [];
    let start = 0;
    for (const size of ROW_SIZES) {
        rows.push(tiles.slice(start, start + size));
        start += size;
    }
    return rows;
};
