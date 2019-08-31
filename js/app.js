let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let actionStatus = false
/* false 表示为默认铅笔模式，true 为橡皮模式*/
let lineWidth = 8

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
			ctx.clearRect(x-10,y-10,20,20)
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
/* 使用 Canvas 画线 */
function drawLine(x1,y1,x2,y2){
  ctx.beginPath()
  ctx.lineCap="round"
  ctx.moveTo(x1,y1)
  ctx.lineWidth = lineWidth
  ctx.lineTo(x2,y2)
  ctx.stroke()
  ctx.closePath() 
}

/* icon 点击事件 */
const colorPaints = {
	'black': 'black',
	'red': '#ef7977',
	'yellow': '#f9eda5',
	'green': '#99c091',
	'blue': '#6daad7'
}

colors.addEventListener('click',function(e){
	if (e.target.tagName.toLowerCase() === 'li') {
		let colorsList = document.querySelectorAll('#colors li')
		ctx.fillStyle = colorPaints[e.target.id]
		ctx.strokeStyle = colorPaints[e.target.id]
		for (let element of colorsList){
			element.classList.remove('active')
		}
		e.target.classList.add('active')
	}
},false);

line.addEventListener('click', function(e){
	console.log(e.target.tagName)
	if (e.target.tagName.toLowerCase() === 'li') {
		lineWidth = ((e.target.id === 'small') && 2) ||
					((e.target.id === 'middle') && 5) || 
					((e.target.id === 'big') && 8)	
		let lineList = document.querySelectorAll('#line li')
		for (let element of lineList){
			element.classList.remove('active')
		}
		e.target.classList.add('active')
	}
}, false)

/* 清空画布 */
clear.onclick = function(){
	ctx.clearRect(0, 0, canvas.width,canvas.height)
}
eraser.onclick=function (){ 
    actionStatus = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
brush.onclick=function (){
    actionStatus = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

/* 模拟点击 a 标签实现下载 */
download.onclick=function(){
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let url = canvas.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'canvas画板.png'
  a.target = '_self'
  a.click()
  a.remove()  
  ctx.putImageData(imgData,0,0);
}