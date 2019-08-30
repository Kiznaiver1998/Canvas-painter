let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let actionStatus = false 
/* false 表示为默认铅笔模式，true 为橡皮模式*/
const lineWidth = 8

autoSetCanvasSize(canvas)
listenToMouse(canvas)

/* 设置 canvas 为页面大小 */
function autoSetCanvasSize(canvas){
	resize()
	window.onresize = resize
	function resize(){
		let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
		let pageWidth = document.documentElement.clientWidth
	    let pageHeight = document.documentElement.clientHeight
	    canvas.width = pageWidth
	    canvas.height = pageHeight
	    ctx.putImageData(imgData,0,0);
	}
}
/* 监听鼠标事件，让 canvas 绘图 */
function listenToMouse(canvas) {
	let lastPoint = {'x': undefined, 'y': undefined}
	/* 使用拖拽 DIV思想 */
	canvas.addEventListener('mousedown', start, false)
	function start(e) {
		let x = e.clientX
		let y = e.clientY
		if (actionStatus) {
			ctx.clearRect(x-10,y-10,20,20)
		}else{
			lastPoint = {'x':x, 'y': y}
		}
		document.addEventListener('mousemove', move, false);
		document.addEventListener('mouseup', end, false);
	}
	function move(e){
		let x = e.clientX
		let y = e.clientY
		if (actionStatus) {
			ctx.clearRect(x-25,y-25,50,50)
		}else{
			drawLine(lastPoint.x, lastPoint.y, x, y)
			lastPoint = {'x':x, 'y': y}
		}
	}
	function end(e){
		document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', end);
	}
}

function drawLine(x1,y1,x2,y2){
  ctx.beginPath()
  ctx.lineCap="round"
  ctx.moveTo(x1,y1)
  ctx.lineWidth = lineWidth
  ctx.lineTo(x2,y2)
  ctx.stroke()
  ctx.closePath() 
}
