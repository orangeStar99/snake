function Snake() {
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 }
    ];
    //设置运动方向
    this.direction = "R";
    //即将改变的方向，防止出现掉头情况
    this.willDirection = "R";
}
//蛇的运动
Snake.prototype.update = function () {
    //当前的direction接收一下willDirection
    this.direction = this.willDirection;
    switch (this.direction) {
        case 'R':
            //右
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
            break;
        case 'D':
            //下
            this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
            break;
        case 'L':
            //左
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
            break;
        case 'U':
            //上
            this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
            break;
    }
    //死亡的判定
    //触边（超出了表格的边缘）
    if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
        alert("游戏结束!你的得分为"+game.score+"分");
        this.body.shift();
        clearInterval(game.timer);
    }
    //自己撞到自己也会死亡
    for (var i = 1; i < this.body.length; i++) {
        //当前蛇的头部和身体的row和col重合
        if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row) {
            alert("游戏结束!你的得分为"+game.score+"分");
            this.body.shift();
            clearInterval(game.timer);
        }
    }
    //蛇吃食物
    //判断如果蛇头没有和食物重合就代表没有吃到食物，就尾删，重合了就代表吃到了，就不进行尾删
    if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
        //此时情况只有头部增加尾部没有删除
        //创建新的食物
        game.food = new Food(game);
        //加分
        game.score++;
        //让帧编号归0，因为蛇会往前冲一下
        game.f = 0;
    } else {
        this.body.pop();
    }
    //蛇不同方向的运动
};
//蛇的方向改变（防止原地掉头）
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d;
}
Snake.prototype.render = function () {
    //蛇头
    game.setColor(this.body[0].row, this.body[0].col, '-webkit-radial-gradient(center center,pink,red)');
    //蛇的身体
    for (var i = 1; i < this.body.length; i++) {
        game.setColor(this.body[i].row, this.body[i].col, '-webkit-radial-gradient(center center,orange,red)');
    }
}