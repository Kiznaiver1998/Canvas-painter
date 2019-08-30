# Canvas-painter

## 使用

```bash
npm run server //启动live-server服务器
```

## 需求分析

因为自己写算法题的时候还是想随手画一点东西

用 PPT 又太麻烦了

所以做一个可以自己乱涂乱画的网站 😁~~（正好可以练习 canvas 使用）~~

- [ ] 可以乱涂乱画
- [ ] 有一个色盘可以改颜色
- [ ] 可以调整线的粗细

## 开始动手干

1. 首先我们想要的是一个整面的大画板

2. 开始使用 Canvas 绘图

```js
ctx.clearRect(x,y,width,height)擦除画布
参数：x, y, width, height

ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke()
ctx.closePath();
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

