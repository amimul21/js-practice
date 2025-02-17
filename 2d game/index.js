var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = 2;
    var dy = -2;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 5;
    var brickColumnCount = 3;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;

    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }
    function collisionDetection() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                        dy = -dy;
                        b.status = 0;
                    }
                }
            }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                alert("GAME OVER");
                document.location.reload();
            }
        }

        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        x += dx;
        y += dy;
    }

    setInterval(draw, 10);


// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function drawPaddle() {
//     ctx.beginPath();
//     ctx.rect(paddleX, canvas.height-paddleHeight , paddleWidth, paddleHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();

// }

// function draw() {
//     ctx.clearRect(0,0, canvas.width, canvas.height );
//     drawBall();
//     drawPaddle();

//     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//         dx = -dx;
//     }
    
//     if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//         dy = -dy;
//     }
//     x += dx;
//     y += dy;
// }

// setInterval(draw, 10);










// title: Finishing up
// slug: Games/Tutorials/2D_Breakout_game_pure_JavaScript/Finishing_up
// tags:
//   - Beginner
//   - Canvas
//   - Games
//   - JavaScript
//   - Tutorial
//   - lives
//   - requestAnimationFrame
// ---
// <div>{{GamesSidebar}}</div>

// <p>{{Previous("Games/Workflows/2D_Breakout_game_pure_JavaScript/Mouse_controls")}}</p>

// <div class="summary">
// <p>This is the <strong>10th and final step</strong> of the <a href="/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript">Gamedev Canvas tutorial</a>. You can find the source code as it should look after completing this lesson at <a href="https://github.com/end3r/Gamedev-Canvas-workshop/blob/gh-pages/lesson10.html">Gamedev-Canvas-workshop/lesson10.html</a>.</p>
// </div>

// <p><span class="seoSummary">There's always room for improvements in any game we write. For example, we can offer more than one life to the player. They could make a mistake or two and still be able to finish the game. We could also improve our code rendering.</span></p>

// <h2 id="Giving_the_player_some_lives">Giving the player some lives</h2>

// <p>Implementing lives is quite straightforward. Let's first add a variable to store the number of lives in the same place where we declared our other variables:</p>

// <pre class="brush: js">var lives = 3;</pre>

// <p>Drawing the life counter looks almost the same as drawing the score counter — add the following function to your code, below the <code>drawScore()</code> function:</p>

// <pre class="brush: js">function drawLives() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Lives: "+lives, canvas.width-65, 20);
// }</pre>

// <p>Instead of ending the game immediately, we will decrease the number of lives until they are no longer available. We can also reset the ball and the paddle positions when the player begins with their next life. So, in the <code>draw()</code> function replace the following three lines:</p>

// <pre class="brush: js">alert("GAME OVER");
// document.location.reload();
// clearInterval(interval); // Needed for Chrome to end game
// </pre>

// <p>With this, we can add slightly more complex logic to it as given below:</p>

// <pre class="brush: js">lives--;
// if(!lives) {
//     alert("GAME OVER");
//     document.location.reload();
//     clearInterval(interval); // Needed for Chrome to end game
// }
// else {
//     x = canvas.width/2;
//     y = canvas.height-30;
//     dx = 2;
//     dy = -2;
//     paddleX = (canvas.width-paddleWidth)/2;
// }</pre>

// <p>Now, when the ball hits the bottom edge of the screen, we're subtracting one life from the <code>lives</code> variable. If there are no lives left, the game is lost; if there are still some lives left, then the position of the ball and the paddle are reset, along with the movement of the ball.</p>

// <h3 id="Rendering_the_lives_display">Rendering the lives display</h3>

// <p>Now you need to add a call to <code>drawLives()</code> inside the <code>draw()</code> function and add it below the <code>drawScore()</code> call.</p>

// <pre class="brush: js">drawLives();
// </pre>

// <h2 id="Improving_rendering_with_requestAnimationFrame">Improving rendering with requestAnimationFrame()</h2>

// <p>Now let's work on something that is not connected to the game mechanics, but to the way it is being rendered. {{domxref("window.requestAnimationFrame", "requestAnimationFrame")}} helps the browser render the game better than the fixed framerate we currently have implemented using {{domxref("WindowOrWorkerGlobalScope/setInterval", "setInterval()")}}. Replace the following line:</p>

// <pre class="brush: js">var interval = setInterval(draw, 10);</pre>

// <p>with:</p>

// <pre class="brush: js">draw();</pre>

// <p>and remove each instance of:</p>

// <pre class="brush: js">clearInterval(interval); // Needed for Chrome to end game
// </pre>

// <p>Then, at the very bottom of the <code>draw()</code> function (just before the closing curly brace), add in the following line, which causes the <code>draw()</code> function to call itself over and over again:</p>

// <pre class="brush: js">requestAnimationFrame(draw);</pre>

// <p>The <code>draw()</code> function is now getting executed again and again within a <code>requestAnimationFrame()</code> loop, but instead of the fixed 10 milliseconds frame rate, we are giving control of the framerate back to the browser. It will sync the framerate accordingly and render the shapes only when needed. This produces a more efficient, smoother animation loop than the older <code>setInterval()</code> method.</p>

// <h2 id="Compare_your_code">Compare your code</h2>

// <p>That's all — the final version of the game is ready and set to go !</p>

// <p>{{JSFiddleEmbed("https://jsfiddle.net/raymondjplante/dfh2tpu1/","","395")}}</p>

// <div class="note">
// <p><strong>Exercise</strong>: change the number of lives and the angle the ball bounces off the paddle.</p>
// </div>

// <h2 id="Game_over_-_for_now!">Game over - for now!</h2>

// <p>You've finished all the lessons - congratulations! By this point, you should now know the basics of canvas manipulation and the logic behind simple 2D games. Now it's a good time to learn some frameworks and continue game development. You can check out this series' counterpart, <a href="/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser">2D breakout game using Phaser</a> or the <a href="/en-US/docs/Games/Tutorials/HTML5_Gamedev_Phaser_Device_Orientation">Cyber Orb built in Phaser</a> tutorial. You can also look through the <a href="/en-US/docs/Games">Games section on MDN</a> for inspiration and more knowledge.</p>

// <p>You could also go back to <a href="/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript">this tutorial series' index page</a>. Have fun coding!</p>

// <p>{{Previous("Games/Workflows/2D_Breakout_game_pure_JavaScript/Mouse_controls")}}</p>
