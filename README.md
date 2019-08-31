# Canvas-painter

description: "乱涂乱画的小 demo"

## 体验

Live Demo：https://kiznaiver1998.cn/Canvas-painter/

源码地址：https://github.com/Kiznaiver1998/Canvas-painter

## 使用

```bash
npm run server //启动live-server服务器
```

## 需求分析

因为自己写算法题的时候还是想随手画一点东西

用 PPT 又太麻烦了

所以做一个可以自己乱涂乱画的网站 😁~~（正好可以练习 canvas 使用）~~

- [x] 可以乱涂乱画
- [x] 有一个色盘可以改颜色
- [x] 可以调整线的粗细

## 开始动手干

1. 首先我们想要的是一个整面的大画板

2. 开始使用 Canvas 绘图

```js
canvas.toDataURL("image/png")将画布转为 url 用于下载

context.clearRect(x,y,width,height)擦除画布
参数：x, y, width, height

/* 绘制线条 */
context.beginPath();
context.moveTo(20,20);
context.lineTo(200,20);
context.stroke()
context.closePath();

/* 保存画布，恢复画布 */
context.getImageData
context.putImageData
```

## 遇到的坑

1. 画线的时候使用

   ```js
   ctx.beginPath()
   ctx.moveTo(x1,y1) 
   ctx.lineWidth = lineWidth
   ctx.lineTo(x2,y2)
   ctx.stroke()
   ctx.closePath()
   ```

   会出现线断掉的情况，十分不好看（解决）

   ![](https://s2.ax1x.com/2019/08/30/mj5Qpt.png)

   后来参考了一些博客，发现了一篇[解决方案](https://www.cnblogs.com/mysnk/p/6362245.html)。

   使用 `lineCap="round"` 使拐角顺滑，即可解决。

3. 出现 BUG 选定其他颜色后，resize 会重置画色为黑色？？（解决）

   ```js
   /* 因为是新换了一块画布，再 put 上去，所以我们还需要填充之前的画布颜色 */
   function resize(){
       let tmpFill = ctx.fillStyle
       let tmpStroke = ctx.fillStyle
       let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
       let pageWidth = document.documentElement.clientWidth
       let pageHeight = document.documentElement.clientHeight
       canvas.width = pageWidth
       canvas.height = pageHeight
       ctx.putImageData(imgData,0,0)
       ctx.fillStyle = tmpFill
       ctx.strokeStyle = tmpStroke
   }
   ```

4. 当我给 `<ul>` 标签监听事件后， 没有很好的办法禁止点击 `<span>` 触发事件的问题：（解决）

   ```html
   <ul id="line">
       <li id="big" class="active"><span></span></li>    
       <li id="middle"></li>
   	<li id="small"></li>
   </ul>
   #line li.active{
	    transform:scale(1.6);
	    padding: 4px 0;
	}
	```
	
	最开始我们的 HTML 结构是这样的，因为考虑到我们后续有可能增加 `<li>` 标签，所以我们是对 `<ul` 进行事件监听，但当用户点击 `span` 标签的时候就不能达到效果。我第一想到的方法有两点：
	
	* 判断点击的是 span 标签，用它的 parentNode 进行操作。
	* 把 span 标签去掉，使用 `::after` 伪类做线条
	
	最后我选择了使用伪类做，因为用 parentNode 感觉很僵硬，而且多了很多代码，不好拓展...
	
5. 当点击下载后，canvas 画布中的线条会变的很不清晰，并且我发现了快速 resize 的过程中，也会有这样的问题。（临时解决，不太清楚导致这问题的具体原因）

   ```js
   let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
   /* 我使用的方法是先把画布存起来，在操作结束后再 put 上去*/
   let url = canvas.toDataURL("image/png")
   let a = document.createElement('a')
   document.body.appendChild(a)
   a.href = url
   a.download = 'canvas画板.png'
   a.target = '_self'
   a.click()
   a.remove()  
   ctx.putImageData(imgData,0,0);
   ```

   （Google 了很多模糊的原因，大多都是 1px 通过修改坐标轴的问题...由于我还没搞懂这东西模糊的原因是啥...所以采取了比较粗暴的方案，把初始画布存起来，再盖上）

6. 发现手机端是用不了的（尴尬），突然想起来移动端是没有 mouse 事件的，应该使用 `document.body.ontouchstart !== undefined` 判断移动端或者是使用`document.hasOwnProperty("ontouchstart")`，由于谷歌开发者工具模拟手机的时候都不支持，所以我最终选择了：

   ```javascript
   if (!("ontouchstart" in window)) {
   		canvas.addEventListener('mousedown', start, false)
   		function start(e) {...}
   		function move(e){...}
   		function end(e){...}
   	}else{
   		canvas.addEventListener('touchstart', start, false)
   		function start(e) {...}
   		function move(e){...}
   		function end(e){...}
   	}
   ```

   结果：
   
   ![](https://s2.ax1x.com/2019/08/31/mv7eO0.png)



Loading...

（等我还想到啥再写写写😊）