# Canvas-painter

## 体验

项目地址：https://kiznaiver1998.cn/Canvas-painter/

源码地址：https://github.com/Kiznaiver1998/Canvas-painter

## 使用

```bash
npm install live-server -g
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
ctx.clearRect(x,y,width,height)擦除画布
参数：x, y, width, height

/* 绘制线条 */
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke()
ctx.closePath();

canvas.toDataURL("image/png")
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

   会出现线断掉的情况，十分不好看

   ![](https://s2.ax1x.com/2019/08/30/mj5Qpt.png)

   后来参考了一些博客，发现了一篇[解决方案](https://www.cnblogs.com/mysnk/p/6362245.html)。

   使用 `lineCap="round"` 使拐角顺滑，即可解决。

2. 当我给 `<ul>` 标签监听事件后，点非 `<li>` 也会触发事件，所以要进行判断：

   ```js
   colors.addEventListener('click',function(e){
   	if (e.target.tagName.toLowerCase() === 'li') {
   		let colorsList = document.querySelectorAll('#colors li');
   		ctx.fillStyle = colorPaints[e.target.id]
   		ctx.strokeStyle = colorPaints[e.target.id]
   		for (let element of colorsList){
   			element.classList.remove('active')
   		}
   		e.target.classList.add('active')
   	}
   },false);
   ```

3. 出现 BUG 选定其他颜色后，resize 会重置画色为黑色？？

4. 当我给 `<ul>` 标签监听事件后，点非 `<span>` 也会触发事件：

   ```js
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
   ```


5. 当点击下载后，canvas 画布中的线条会变的很不清晰，并且我发现了快速 resize 的过程中，也会有这样的问题。

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

   （Google 了很多模糊的原因，大多都是 1px 通过修改坐标轴的问题...由于我还没搞懂这东西模糊的原因是啥...所以采取了比较粗暴的方案）