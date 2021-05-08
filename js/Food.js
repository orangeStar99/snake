function Food(gameSnake) {
    var self = this;
    //食物的位置
    //do while作用就是先创建个食物判断是否在蛇身上
    do {
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
    } while ((function () {
        //遍历蛇的row和col然后和新随机出来的row和col判断是否重合
        for (var i = 0; i < gameSnake.snake.body.length; i++) {
            if(gameSnake.snake.body[i].row == self.row && gameSnake.snake.body[i].col== self.col){
                return true;
            }
        }
        return false;
    })());
}

Food.prototype.render = function () {
    game.setHTML(this.row, this.col, "♥");
}