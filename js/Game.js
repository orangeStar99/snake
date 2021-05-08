function Game() {
    // 创建表格
    this.row = 20;
    this.col = 20;
    //分数
    this.score = 0;
    // 初始化节点
    this.init();
    // 实例化蛇类
    this.snake = new Snake();
    //初始化食物
    this.food = new Food(this);
    //执行定时器任务
    this.start();
    //键盘的事件监听
    this.bindEvent()
}
Game.prototype.init = function () {
    this.dom = document.createElement('table');
    var tr, td;
    // 遍历行和列上树
    for (var i = 0; i < this.row; i++) {
        tr = document.createElement("tr");
        for (var j = 0; j < this.col; j++) {
            td = document.createElement("td");
            // console.log(tr);
            tr.appendChild(td);
            this.dom.appendChild(tr);
        }
        document.getElementById("app").appendChild(this.dom);
    }
}
Game.prototype.clear = function () {
    //遍历表格，擦除画布
    for (var i = 0; i < this.row; i++) {
        for (var j = 0; j < this.col; j++) {
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = 'transparent';
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = '';
        }
    }
}
//设置颜色的方法
Game.prototype.setColor = function (row, col, color) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
}
//渲染食物
Game.prototype.setHTML = function (row, col, html) {
    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
};
//设置键盘事件监听
Game.prototype.bindEvent = function () {
    var self = this;
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            //左
            case 37:
                //先进行判断如果朝右走不能按左键
                if (self.snake.direction == 'R') return;
                self.snake.changeDirection("L");
                break;
            //上
            case 38:
                if (self.snake.direction == 'D') return;
                self.snake.changeDirection("U");
                break;
            //右
            case 39:
                if (self.snake.direction == 'L') return;
                self.snake.changeDirection("R");
                break;
            //下
            case 40:
                if (self.snake.direction == 'U') return;
                self.snake.changeDirection("D");
                break;
        }
    }
};
Game.prototype.start = function () {
    //帧编号
    this.f = 0;
    this.timer = setInterval(function () {
        //定时器的核心就是游戏的渲染本质，清屏-更新-渲染
        game.f++;
        document.getElementById("f").innerHTML = "帧编号：" + game.f;
        document.getElementById("score").innerHTML = "分数：" + game.score;
        //清除屏幕
        game.clear();
        //蛇的更新
        //蛇的更新速度
        var during = game.snake.body.length < 45 ? 45 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        //蛇的渲染
        game.snake.render();
        //渲染食物
        game.food.render();
    }, 20)
}
