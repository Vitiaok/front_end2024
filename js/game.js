var myGameArea = {
    canvas: null,
    canvasCreated: false,
    keys: {}, // Об'єкт для зберігання стану натиснутих клавіш

    start: function () {
        var container = document.querySelector('.smallBlock');

        // Перевіряємо, чи вже існує canvas в container і чи не був він створений раніше
        if (!this.canvas || !this.canvasCreated) {
            // Якщо canvas не існує або ще не був створений, створюємо його
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");
            container.appendChild(this.canvas);
            this.canvasCreated = true;
        }

        // Оновлюємо розміри canvas, враховуючи padding та розмір екрану
        var computedStyle = getComputedStyle(container);
        var paddingTop = parseInt(computedStyle.paddingTop);
        var paddingRight = parseInt(computedStyle.paddingRight);
        var paddingBottom = parseInt(computedStyle.paddingBottom);
        var paddingLeft = parseInt(computedStyle.paddingLeft);

        var containerWidth = container.clientWidth;
        var containerHeight = container.clientHeight;

        // Задаємо розміри канвасу відносно розміру вікна та враховуючи padding
        this.canvas.width = containerWidth - paddingLeft - paddingRight;
        this.canvas.height = containerHeight - paddingTop - paddingBottom;

        // Додаємо обробники подій клавіатури
        window.addEventListener('keydown', function (e) {
            myGameArea.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        });

        this.interval = setInterval(updateGameArea, 20);
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function() {
        // Перевіряємо, чи натиснута відповідна клавіша і встановлюємо швидкість руху
        if (myGameArea.keys && myGameArea.keys[37]) {this.speedX = -3; }
        if (myGameArea.keys && myGameArea.keys[39]) {this.speedX = 3; }
        if (myGameArea.keys && myGameArea.keys[38]) {this.speedY = -3; }
        if (myGameArea.keys && myGameArea.keys[40]) {this.speedY = 3; }

        // Перевіряємо, чи натискання клавіші закінчилося і скидаємо швидкість руху
        if (!myGameArea.keys[37] && !myGameArea.keys[39]) {this.speedX = 0; }
        if (!myGameArea.keys[38] && !myGameArea.keys[40]) {this.speedY = 0; }


        if (this.y + this.speedY >= myGround.y - this.height) {
            this.speedY = 0;
            this.y = myGround.y - this.height;
        }

        if (this.x + this.speedX >= 0 && this.x + this.speedX <= myGameArea.canvas.width - this.width) {
            this.x += this.speedX;
        }
        if (this.y + this.speedY >= 0 && this.y + this.speedY <= myGameArea.canvas.height - this.height) {
            this.y += this.speedY;
        }
    };
    
}

function groundComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        myGameArea.context.fillStyle = color;
        myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
    };
}

var myGround;

function FallingBlock(width, height, color, x, y, speedY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.newPos = function() {
        this.y += this.speedY;
        if (this.y > myGameArea.canvas.height) {
            this.y = 0 - this.height; // Перезапускаємо блок, якщо він вийшов за межі екрану
            this.x = Math.floor(Math.random() * (myGameArea.canvas.width - this.width)); // Змінюємо його позицію
        }
    };
}

var fallingBlocks = [];

function generateFallingBlocks() {
    var width = 50;
    var height = 20;
    var color = "blue";
    var speedY = 2; // Швидкість падіння блоків

    setInterval(function() {
        var x = Math.floor(Math.random() * (myGameArea.canvas.width - width));
        var y = -height; // Початкова позиція блока зверху
        var newBlock = new FallingBlock(width, height, color, x, y, speedY);
        fallingBlocks.push(newBlock);
    }, 2000); // Генерувати нові блоки кожні 2 секунди
}

function updateGameArea() {
    myGameArea.clear();
    myGround.update();
    myGamePiece.newPos();
    myGamePiece.update();
    for (var i = 0; i < fallingBlocks.length; i++) {
        fallingBlocks[i].newPos();
        fallingBlocks[i].update();
    }
}

window.onload = function() {
    myGameArea.start();
    myGamePiece = new component(120, 30, "red", 10, myGameArea.canvas.height-100);
    myGround = new groundComponent(myGameArea.canvas.width, 20, "green", 0, myGameArea.canvas.height - 20);
    generateFallingBlocks();
};












