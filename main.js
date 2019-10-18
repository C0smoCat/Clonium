'use strict';
//
//Put your saves to array
//
const levels = [
    '/0300000320////0330000310/',
    '-000000-0300000320////0330000310-000000-',
    '/0300000310/0032003300/0340000350/--------',
    '000-----0300-----00000---//---00000-----0310-----000',
    '-000000-0300000320/000--000000--000/0330000310-000000-',
    '-00--00-0300--0320/--0000----0000--/0330--0310-00--00-',
    '000--0000300000310/-000000--000000-/0320000330000--000',
    '-00--00-0300000320/-00--00--00--00-/0330000310-00--00-',
    '------------------0000----30000----00031----0000------------------',
    '----------0000---0000300--000000--000000--0310000---0000----------',
    '000-----0300-----000000----0000----0000----000000-----0310-----000',
    '-00131300-/002100220010001-1-001110001-1-00110023002000/-00121200-',
    '------------------00320----30000----00031----03300------------------',
    '-000000-0300-003200000-00000-000-00-000-00000-000003300-0310-000000-',
    '---------000000--03000320--00--00--00--00--03300310--000000---------',
    '---------000000--03000320--000000--000000--03300310--000000---------',
    '-000000-0300000320000--00000-00-0000-00-00000--0000330000310-000000-',
    '----------0000---03000310--000000--000000--03200330---0000----------',
    '----------300031---000000-320000000000000033-000000---340035----------',
    '-1-1-1-1-1-1--/001100100010001-1-001110001-1-00110011001000/-1-1-1-1-1-1--',
    '-000000-03000003200001-1-000001-2-2-1-00001-2-2-1-000001-1-0000330000310-000000-',
    '0-0-0-0--30-32-34-00-31-33-35--30-32-34-00-31-33-35--30-32-34-00-31-33-35--0-0-0-0',
    '000--00003001-1-0310001-1-1-1-00-1-1-2-2-1-1---1-1-2-2-1-1--001-1-1-1-0003201-1-0330000--000',
    '-002-2-00-03001-1-0310002-2-2-2-002-1-2---2-1-2-2-1-2---2-1-2-002-2-2-2-0003201-1-0330-002-2-00-',
    '-00--00-0300000320/--0000----0000--/0330000310-00--00-',
    '-00-----01000000-/000-00000000-000/-00000110-----00-',
    '-00-----01000000-0002-2-2-00002--2-2-00002-2--2-00002-2-2-000-00000110-----00-',
    '000--0000300--0310000--000000--000000--000/0300000310/',
    '--1-321----1-0000001-31000000341-002-2-001-1-002-2-001-30000000351-0000001----1-331---',
    '---------1-1-1-351-1---30000034--1-02-2-01---1-02-2-01---31000033--1-1-321-1-1----------',
    '-002-2-00-/00301-1-32002-01---1-02-2-01---1-02-00331-1-3100/-002-2-00-',
    '-00-----030000---00002-3-000003-3-0000003-3-000003-2-0000---000310-----00-',
    '-------------------0310----00000---3003-032---00000----0330----------',
    '-------------------0310----00000---3003-032---00000-----------------',
    '--------------------------00000---3003-031---00000-----------------',
    '-----------300-----0000---002-2-031--3302-2-00---0000-----032-----------',
    '---------3-030003---000000--002-2-031--3302-2-00--000000--3-003203----------',
    '---------3-0202003---000000--2302-2-021--2302-2-021--000000--3-0222203----------',
    '-----------2020-----0000---2302-2-021--2302-2-021---0000-----2222-----------',
    '--000-----1-301----01-1-1-1-1-0-0331-3-1-310-01-1-1-1-1-0---1-321------000-----------',
    '/030000031000-1-1--00001-3-3-1-00001-3-3-1-0000-1-1--000320000330/',
    '--------00----000300--0310/-001-1-00---01-1-0-----00-----------',
    '-1-1-1-1-1-1----------000--0000300000310//---------1-1-1-1-1-1--',
    '/0100000100/--1-1-1-1-----1-1-1-1---/0110000110/'
];
//Player colors
const cls_ = ["#8300DB", "#D65200", "#00DE07", "#AA9900", "#0000D9", "#E00083", "#D90000"];
let cls;
let map;
let tableCells;
let tableW = 8;
let tableH = 8;
let playerCount = 6;
let playerId = 0;
let poll = undefined;
let creativeMode = false;
let creativeCells = undefined;
let creativeSelect = -1;
let game = true;
let randSequence = false;
let animPool = [];
let animPoolDivs = [];
let animDiv;
let timerCell = undefined;
let isTimerOn = false;
let timeRemainingMax = 20;
let timeRemaining = timeRemainingMax;

function GenMap() {
    let tableDiv = document.createElement('table');
    tableDiv.style.fontFamily = "Righteous";
    tableDiv.border = 0;
    tableDiv.style.margin = 'auto';
    tableH = Math.min(tableH, 8);
    tableCells = [];
    map = [];
    tableDiv.style.borderSpacing = '0.5vmin';
    creativeCells = [];
    for (let y = 0; y < tableH; y++) {
        tableCells[y] = [];
        map[y] = [];
        let row = tableDiv.insertRow();
        row.id = 'row' + y;
        for (let x = 0; x < tableW; x++) {
            let cell = row.insertCell();
            tableCells[y][x] = cell;
            tableCells[y][x].className = 'dot';
            cell.oncontextmenu = function (evt) {
                evt = evt || window.event;
                evt.cancelBubble = true;
                ClickDot(true, x, y);
                return false;
            };
            cell.onclick = function (evt) {
                ClickDot(false, x, y);
            };
            map[y][x] = new Dot();
        }
        if (y < tableH) {
            creativeCells[y] = [];
            let cell = row.insertCell();
            creativeCells[y][0] = cell;
            creativeCells[y][0].className = 'dot creativedot';
            cell.oncontextmenu = function (evt) {
                evt = evt || window.event;
                evt.cancelBubble = true;
                return false;
            };
        }
    }

    creativeCells[0][0].innerText = 'New game';
    creativeCells[0][0].onclick = function (evt) {
        if (game) {
            LoadMap(levels[Rand(0, levels.length)]);
            UpdateMap();
        }
    };
    creativeCells[1][0].innerText = 'Editor';
    creativeCells[1][0].onclick = function (evt) {
        ToggleCreative();
    };
    creativeCells[2][0].innerText = 'Bot';
    creativeCells[2][0].onclick = function (evt) {
        if (game) {
            Bot();
        }
    };
    creativeCells[3][0].innerText = 'Random sequence\n' + (randSequence ? 'ON' : 'OFF');
    creativeCells[3][0].style.fontSize = '2.5vmin';
    creativeCells[3][0].onclick = function (evt) {
        randSequence = !randSequence;
        creativeCells[3][0].innerText = 'Random sequence\n' + (randSequence ? 'ON' : 'OFF');
        creativeCells[3][0].style.boxShadow = (randSequence ? 'inset rgba(0, 0, 0, 0.1) 0px 0px 10px' : '');
    };

    creativeCells[4][0].innerText = (isTimerOn ? creativeMode ? 'Timer\nPAUSE' : `Timer\n${Math.floor(timeRemaining)}` : 'Timer\nOFF');
    creativeCells[4][0].onclick = function (evt) {
        isTimerOn = !isTimerOn;
        timeRemaining = timeRemainingMax;
        creativeCells[4][0].innerText = (isTimerOn ? creativeMode ? 'Timer\nPAUSE' : `Timer\n${Math.floor(timeRemaining)}` : 'Timer\nOFF');
        timerCell.style.color = "";
    };
    timerCell = creativeCells[4][0];

    for (let y = 5; y < tableH - 1; y++) {
        creativeCells[y][0].className = '';
    }

    creativeCells[tableH - 1][0].innerHTML = "<a href=\"https://github.com/C0smoCat/Clonium\">GitHub\nand\nRules</a>";

    animDiv = document.createElement('animDiv');
    document.body.appendChild(animDiv);

    document.body.appendChild(tableDiv);
    document.body.style.margin = 0;

    LoadMap(levels[Rand(0, levels.length)]);
    UpdateMap();
}

function ToggleCreative() {
    if (creativeMode) {
        for (let y = 0; y < Math.min(tableH, 8); y++) {
            creativeCells[y][1].style.display = "none";
        }
        console.info(`Save your map: \'${SaveMap()}\'`);
    }
    else {
        if (creativeSelect < 0) {
            for (let y = 0; y < Math.min(tableH, 8); y++) {
                let cell = document.getElementById('row' + y).insertCell();
                creativeCells[y][1] = cell;
                creativeCells[y][1].className = 'dot';
                creativeCells[y][1].style.borderColor = '#aaa';
                creativeCells[y][1].style.cursor = 'pointer';
                creativeCells[y][1].style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
                creativeCells[y][1].style.color = '#eeea';
                creativeCells[y][1].innerText = '+1';
                cell.oncontextmenu = function (evt) {
                    evt = evt || window.event;
                    evt.cancelBubble = true;
                    CreativeClick(true, y);
                    return false;
                };
                cell.onclick = function (evt) {
                    CreativeClick(false, y);
                };
            }

            creativeCells[0][1].className = "dot sel3";
            creativeCells[0][1].bgColor = '#ddd';
            creativeCells[0][1].style.color = '#aaaa';
            creativeCells[1][1].bgColor = '#eee';
            creativeCells[1][1].style.color = '#aaaa';
            creativeCells[1][1].innerText = '0';
            creativeCells[2][1].bgColor = cls[0];
            creativeCells[3][1].bgColor = cls[1];
            creativeCells[4][1].bgColor = cls[2];
            creativeCells[5][1].bgColor = cls[3];
            creativeCells[6][1].bgColor = cls[4];
            creativeCells[7][1].bgColor = cls[5];
            creativeSelect = 0;
        }
        else {
            for (let y = 0; y < Math.min(tableH, 8); y++) {
                creativeCells[y][1].style.display = '';
            }
        }
    }
    creativeMode = !creativeMode;
    creativeCells[1][0].style.boxShadow = (creativeMode ? 'inset rgba(0, 0, 0, 0.1) 0px 0px 10px' : '');
    timerCell.innerText = (isTimerOn ? creativeMode ? 'Timer\nPAUSE' : `Timer\n${Math.floor(timeRemaining)}` : 'Timer\nOFF')
    UpdateMap();
}

function UpdateMap() {
    timeRemaining = timeRemainingMax;
    timerCell.style.color = "";
    let f = 0;
    let c = 0;
    for (let y = 0; y < tableH; y++) {
        for (let x = 0; x < tableW; x++) {
            if (map[y][x].isWall) {
                tableCells[y][x].innerText = '';
                tableCells[y][x].bgColor = '#eee';
                tableCells[y][x].className = 'dot';
                tableCells[y][x].style.borderColor = (creativeMode ? '#ddd' : '#eee');
            }
            else if (map[y][x].value > 0 && map[y][x].player >= 0) {
                if (poll[playerId] === map[y][x].player && game) {
                    switch (map[y][x].value) {
                        case 1:
                            tableCells[y][x].className = 'dot sel1';
                            break;
                        case 2:
                            tableCells[y][x].className = 'dot sel2';
                            break;
                        default:
                            tableCells[y][x].className = 'dot sel3';
                            break;
                    }
                    f++;
                }
                else {
                    tableCells[y][x].className = 'dot';
                }
                tableCells[y][x].innerText = map[y][x].value;
                tableCells[y][x].style.borderColor = cls[map[y][x].player];
                tableCells[y][x].bgColor = cls[map[y][x].player];
                tableCells[y][x].style.color = '#eee';
                c++;
            }
            else {
                tableCells[y][x].style.borderColor = '#0000';
                tableCells[y][x].style.color = '#aaa';
                tableCells[y][x].innerText = (map[y][x].value > 0 ? map[y][x].value : '');
                tableCells[y][x].className = 'dot';
                tableCells[y][x].bgColor = '#ddd';
            }
        }
    }
    if (f <= 0 && c > 0 && game) {
        if (playerId + 1 < playerCount) {
            playerId++;
        }
        else {
            RandPoll();
        }
        UpdateMap();
    }
}

function ClickDot(rb, x, y) {
    if (!game) {
        return;
    }
    if (rb) {
        if (x === 0 && y === tableH - 1 && game) {
            AnimateInOut();
        }
        else if (map[y][x].value > 0 && map[y][x].player === poll[playerId]) {
            OpenDot(x, y);
            if (playerId + 1 < playerCount) {
                playerId++;
            }
            else {
                RandPoll();
            }
            UpdateMap();
        }
    }
    else if (creativeMode) {
        if (creativeSelect === 0) {
            if (map[y][x].player >= 0) {
                map[y][x].value = 0;
            }
            else if (map[y][x].value < 3) {
                map[y][x].value++;
            }
            else {
                map[y][x].value = 0;
            }
            map[y][x].player = -1;

        }
        else if (creativeSelect === 1) {
            map[y][x].value = -1;
        }
        else {
            if (0 < map[y][x].value && map[y][x].value < 3) {
                map[y][x].value++;
            }
            else {
                map[y][x].value = 1;
            }
            map[y][x].player = creativeSelect - 2;
        }
        UpdateMap();
    }
    else if (map[y][x].value > 0 && map[y][x].player === poll[playerId]) {
        OpenDot(x, y);
        if (playerId + 1 < playerCount) {
            playerId++;
        }
        else {
            RandPoll();
        }
        DoAnimation();
    }
}

function CreativeClick(rb, y) {
    if (!rb) {
        creativeCells[creativeSelect][1].className = 'dot';
        creativeCells[y][1].className = 'dot sel3';
        creativeSelect = y;
    }
}

function OpenDot(x, y, pId) {
    if (arguments.length < 3) {
        pId = poll[playerId];
    }
    if (!map[y][x].isWall) {
        if (map[y][x].value + 1 >= 4) {
            map[y][x].value -= 3;
            if (y + 1 < tableH && !map[y + 1][x].isWall) {
                animPool.push({x1: x, x2: x, y1: y, y2: y + 1, player: pId});
            }
            if (y - 1 >= 0 && !map[y - 1][x].isWall) {
                animPool.push({x1: x, x2: x, y1: y, y2: y - 1, player: pId});
            }
            if (x + 1 < tableW && !map[y][x + 1].isWall) {
                animPool.push({x1: x, x2: x + 1, y1: y, y2: y, player: pId});
            }
            if (x - 1 >= 0 && !map[y][x - 1].isWall) {
                animPool.push({x1: x, x2: x - 1, y1: y, y2: y, player: pId});
            }
        }
        else {
            map[y][x].player = pId;
            map[y][x].value++;
        }
    }
}

function DoAnimation() {
    UpdateMap();
    if (animPool.length <= 0) {
        return;
    }
    game = false;
    let fixAnimPool = [];
    let nextWave = [];
    for (let i = 0; i < animPool.length; i++) {
        let c1 = GetCoords(tableCells[animPool[i].y1][animPool[i].x1]);
        let c2 = GetCoords(tableCells[animPool[i].y2][animPool[i].x2]);
        fixAnimPool.push({
            x1: c1.left,
            x2: c2.left,
            y1: c1.top,
            y2: c2.top
        });
        nextWave.push({x: animPool[i].x2, y: animPool[i].y2, player: animPool[i].player});
    }
    animPool = [];
    while (fixAnimPool.length > animPoolDivs.length) {
        let div = document.createElement('animate');
        div.className = 'dot';
        div.innerText = '+1';
        div.style.fontFamily = "Righteous";
        div.style.position = 'absolute';
        div.style.color = '#eeea';
        animPoolDivs.push(div);
        animDiv.appendChild(div);
    }
    for (let i = 0; i < fixAnimPool.length; i++) {
        animPoolDivs[i].style.display = '';
        animPoolDivs[i].style.left = fixAnimPool[i].x1 + 'px';
        animPoolDivs[i].style.top = fixAnimPool[i].y1 + 'px';
        animPoolDivs[i].style.borderColor = cls[fixAnimPool[i].player];
        animPoolDivs[i].style.backgroundColor = cls[nextWave[i].player];
    }
    let start = Date.now();
    let timer = setInterval(function () {
        let timePassed = Date.now() - start;
        if (timePassed >= 750) {
            clearInterval(timer);
            for (let i = 0; i < animPoolDivs.length; i++) {
                animPoolDivs[i].style.display = 'none';
            }
            for (let i = 0; i < nextWave.length; i++) {
                OpenDot(nextWave[i].x, nextWave[i].y, nextWave[i].player);
            }
            DoAnimation();
            if (animPool.length <= 0) {
                game = true;
                UpdateMap();
            }

            return;
        }
        let per = (timePassed / 750);
        for (let i = 0; i < fixAnimPool.length; i++) {
            animPoolDivs[i].style.left = fixAnimPool[i].x1 * (1 - per) + fixAnimPool[i].x2 * per + 'px';
            animPoolDivs[i].style.top = fixAnimPool[i].y1 * (1 - per) + fixAnimPool[i].y2 * per + 'px';
            animPoolDivs[i].style.boxShadow = `0 0 2vmin rgba(0,0,0,${((per >= 0.5) ? (1 - per) : per) * 2 * 0.8})`;
        }
    }, 20);
}

function GetCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}

function SaveMap() {
    let save = '';
    for (let y = 0; y < tableH; y++) {
        let row = '';
        let fill = false;
        for (let x = 0; x < tableW; x++) {
            if (map[y][x].value === 0) {
                row += '0';
            }
            else if (map[y][x].value === -1) {
                row += '-';
                fill = true;
            }
            else {
                row += map[y][x].value;
                row += (map[y][x].player < 0 ? '-' : map[y][x].player);
                fill = true;
            }
        }
        if (fill) {
            save += row;
        } else {
            save += '/';
        }
    }
    return save;
}

function RandPoll(ignoreSettings) {
    if (arguments.length < 1) {
        ignoreSettings = false;
    }
    playerId = 0;
    if (randSequence || ignoreSettings) {
        poll = [];
        for (let i = 0; i < playerCount; i++) {
            poll.splice(Rand(0, poll.length + 1), 0, i);
        }
    }
    else if (poll === undefined || poll === []) {
        poll = [0, 1, 2, 3, 4, 5];
    }
}

function LoadMap(save) {
    let free = false;
    let symbol = 0;
    for (let y = 0; y < tableH; y++) {
        for (let x = 0; x < tableW; x++) {
            if (free) {
                map[y][x].value = 0;
            }
            else if (save[symbol] === '/') {
                map[y][x].value = 0;
                free = true;
                symbol++;
            }
            else if (save[symbol] === '0') {
                map[y][x].value = 0;
                symbol++;
            }
            else if (save[symbol] === '-' || save[symbol] === undefined) {
                map[y][x].value = -1;
                symbol++;
            }
            else {
                map[y][x].value = parseInt(save[symbol]);
                map[y][x].player = (save[symbol + 1] === '-' ? -1 : parseInt(save[symbol + 1]));
                symbol += 2;
            }
        }
        free = false;
    }
    //Rand colors
    cls = [];
    for (let i = 0; i < cls_.length; i++) {
        cls.splice(Rand(0, cls.length + 1), 0, cls_[i]);
    }
    if (creativeSelect >= 0 && game) {
        for (let i = 0; i < playerCount; i++) {
            creativeCells[i + 2][1].bgColor = cls[i];
        }
    }
    RandPoll(true);
}

function Bot(animate) {
    let f = [];
    for (let y = 0; y < tableH; y++) {
        for (let x = 0; x < tableW; x++) {
            if (map[y][x].value > 0 && map[y][x].player === poll[playerId]) {
                f.push({x: x, y: y});
            }
        }
    }
    if (f.length > 0) {
        let fr = f[Rand(0, f.length)];
        if (arguments.length > 0 && !animate) {
            OpenDot(fr.x, fr.y);
            if (playerId + 1 < playerCount) {
                playerId++;
            }
            else {
                playerId = 0;
                RandPoll();
            }
            game = true;
            UpdateMap();
        }
        else {
            BotClick(fr.x, fr.y);
        }
    }
}

function BotClick(x, y) {
    game = false;
    let start = Date.now();

    let timer = setInterval(function () {
        let timePassed = Date.now() - start;
        if (timePassed >= 750) {
            clearInterval(timer);
            tableCells[y][x].style.fontSize = '';
            tableCells[y][x].style.boxShadow = '';
            OpenDot(x, y);
            if (playerId + 1 < playerCount) {
                playerId++;
            }
            else {
                playerId = 0;
                RandPoll();
            }
            game = true;
            DoAnimation();
            return;
        }
        let progress = timePassed / 750;
        let max = 6.25;
        if (progress < .5) {
            let pow = Math.pow(progress * 2, 2);
            tableCells[y][x].style.fontSize = max * (1 - pow) + 4 * pow + 'vmin';
            tableCells[y][x].style.boxShadow = 'inset 0 0 2vmin rgba(0,0,0,' + 0.4 * pow + ')';
            creativeCells[2][0].style.boxShadow = 'inset 0 0 2vmin rgba(0,0,0,' + 0.2 * pow + ')';
        }
        else {
            let pow = Math.pow((progress - 0.5) * 2, 2);
            tableCells[y][x].style.fontSize = 4 * (1 - pow) + max * pow + 'vmin';
            tableCells[y][x].style.boxShadow = 'inset 0 0 2vmin rgba(0,0,0,' + 0.4 * (1 - pow) + ')';
            creativeCells[2][0].style.boxShadow = 'inset 0 0 2vmin rgba(0,0,0,' + 0.2 * (1 - pow) + ')';
        }

    }, 20);
}

function Rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Lerp(a, b, t) {
    return a + (b - a) * t;
}

class Dot {
    get isWall() {
        return this.value === -1;
    }

    constructor() {
        this.player = -1;
        this.value = 0;
    }
}

window.onload = function () {
    GenMap();
    setInterval(function () {
        if (isTimerOn && game && !creativeMode) {
            if (timeRemaining > 0) {
                timeRemaining -= 0.5;
                timerCell.innerText = `Timer\n${Math.floor(timeRemaining)}`;
                if (timeRemaining <= 5) {
                    timerCell.style.color = (timeRemaining % 1 === 0) ? "" : "red";
                }
            } else {
                Bot();
                timeRemaining = timeRemainingMax;
                timerCell.style.color = "";
            }
        }
    }, 500);
};