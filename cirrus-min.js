var cirrus={version:"0.1.1"};if(cirrus.init=function(t){var e={container:".container",width:"auto",height:"auto",margin:{top:20,right:20,bottom:50,left:50},type:"bar",subtype:"stacked",labelFormatterX:function(t){return t},tooltipFormatter:function(t){return t.data.y},axisXAngle:null,tickSize:8,minorTickSize:4,fringeSize:8,tickYCount:5,axisXTickSkip:"auto",continuousXAxis:!1,gutterPercent:10,renderer:"svg",scaleType:"time",outerPadding:0,showFringe:!1,showAxes:!0,showXGrid:!1,showYGrid:!1,showLegend:!1,autoTypeThreshold:30,chartTitle:null,axisXTitle:null,axisYTitle:null,colorList:cirrus.utils.defaultColors},i={width:null,height:null,chartWidth:500,chartHeight:500,data:null,visibleData:null,shapeLayout:null,scaleX:null,scaleY:null,axesLayout:{},legendLayout:{},fringeLayout:{},previousData:null,container:null,dataLayersToHide:[],outerPadding:null,gutterPercent:10,multipleTooltip:!0,continuousXAxis:!1,type:"bar",subtype:"stacked",events:d3.dispatch("hover","hoverOut","legendClick"),internalEvents:d3.dispatch("setHover","hideHover","resize","legendClick")};cirrus.utils.override(t,e);var r={};return r.initialize=cirrus.utils.once(function(t,e){var i=this;e.container=d3.select(t.container),e.container.html(cirrus.template.main),e.internalEvents.on("legendClick",function(t){e.dataLayersToHide=t,i.render()})}),r.setConfig=function(t){return cirrus.utils.override(t,e),this},r.getConfig=function(){return e},r._getConfig=function(){return i},r.resize=function(){return this.render(),this},r.downloadAsPNG=function(t){return cirrus.utils.convertToImage(e,i,t),this},r.setHovering=function(t){return i.internalEvents.setHover(t),this},r.hideHovering=function(){return i.internalEvents.hideHover(),this},r.render=function(t){return cirrus.data.validate(e,i,t)?(this.initialize.call(this,e,i),cirrus.automatic.config.call(this,e,i),i.scaleX=cirrus.scale.x(e,i),i.scaleY=cirrus.scale.y(e,i),i.scaleColor=cirrus.scale.color(e,i),i.shapeLayout=cirrus.layout.shape(e,i),i.axesLayout.x=cirrus.layout.axes.x(e,i),i.axesLayout.y=cirrus.layout.axes.y(e,i),i.legendLayout=cirrus.layout.legend(e,i),cirrus.component.chart(e,i),cirrus.component.shapes(e,i),cirrus.component.axisX(e,i),cirrus.component.axisY(e,i),cirrus.component.title(e,i),cirrus.component.legend(e,i),cirrus.interaction.hovering(e,i),this):(console.error("Invalid data",t),this)},d3.rebind(r,i.events,"on"),r},cirrus.utils={},cirrus.utils.override=function(t,e){for(var i in t)i in e&&(e[i]=t[i])},cirrus.utils.computeRandomNumericArray=function(t,e,i){return d3.range(t||0).map(function(){return~~(Math.random()*(i-e)+e)})},cirrus.utils.computeRandomTimeArray=function(t,e){var i=864e5,e=(new Date).getTime()-t*i;return d3.range(t||0).map(function(t,r){return e+r*i})},cirrus.utils.getRandomNumericData=function(t,e){var i=d3.range(t);return d3.range(e).map(function(e,r){var n=cirrus.utils.computeRandomNumericArray(t,10,100),a=d3.zip(i,n).map(function(t){return{x:t[0],y:t[1]}});return{name:"name"+r,values:a}})},cirrus.utils.defaultColors=["skyblue","orange","lime","orangered","violet","yellow","brown","pink"],cirrus.utils.getRandomTimeData=function(t,e){var i=(new Date).getTime(),r=cirrus.utils.computeRandomTimeArray(t,i);return d3.range(e).map(function(e,i){var n=cirrus.utils.computeRandomNumericArray(t,10,100),a=d3.zip(r,n).map(function(t){return{x:t[0],y:t[1]}});return{name:"name"+i,values:a}})},cirrus.utils.getRandomHeatmapData=function(t,e){var i=(new Date).getTime(),r=cirrus.utils.computeRandomTimeArray(t,i);return d3.range(e).map(function(e,i){var n=cirrus.utils.computeRandomNumericArray(t,10,100),a=d3.zip(r,n).map(function(t){return{x:t[0],y:i,color:t[1]}});return{name:"name"+i,values:a}})},cirrus.utils.throttle=function(t,e){var i=!1,r=null;return function(){i||(t.apply(this,arguments),i=!0,clearTimeout(r),r=setTimeout(function(){i=!1,t.apply(this,arguments)},e))}},cirrus.utils.convertToImage=function(t,e,i){var r=new MouseEvent("click",{view:window,bubbles:!0,cancelable:!1}),n=e.container.node(),a=(new XMLSerializer).serializeToString(n),o={width:n.offsetWidth,height:n.offsetHeight,rootFontSize:14},s='<svg xmlns="http://www.w3.org/2000/svg" width="'+o.width+'" height="'+o.height+'" font-size="'+o.rootFontSize+'"><foreignObject>'+a+"</foreignObject></svg>",c=document.createElement("canvas");c.width=o.width,c.height=o.height;var u=c.getContext("2d"),l=new Image;l.onload=function(){u.drawImage(l,0,0);var t=c.toDataURL("image/png");if(i)i.call(this,t);else{var e='<a href="'+t+'" download="converted-image">Download</a>',n=document.createElement("div");n.id="#png-container",n.innerHTML=e,n.querySelector("a").dispatchEvent(r)}},l.src="data:image/svg+xml;base64,"+btoa(s)},cirrus.utils.extractValues=function(t,e){return t.map(function(t){return t.values.map(function(t){return t[e]})})},cirrus.utils.once=function(t,e){var i;return function(){return t&&(i=t.apply(e||this,arguments),t=null),i}},cirrus.data={},cirrus.data.validate=function(t,e,i){var r=!1;if(i&&"object"==typeof i){var n=!1;if(i.forEach(function(t){n=n||!!t.values.length}),n){var a=JSON.parse(JSON.stringify(i));e.previousData=a,e.data=a,r=!0}}else e.previousData&&(e.data=e.previousData,r=!0);return e.data&&(e.visibleData=e.data.filter(function(t){return-1===e.dataLayersToHide.indexOf(t.name)})),r},cirrus.automatic={},cirrus.automatic.config=function(t,e){if("auto"===t.type){var i=e.data[0].values.length;i<t.autoTypeThreshold?(e.type="bar",e.continuousXAxis=!1,e.outerPadding="auto"):(e.type="line",e.continuousXAxis=!0)}else e.type=t.type,e.subtype=t.subtype;if("auto"!==t.width&&t.width||(e.width=e.container.node().offsetWidth),e.chartWidth=e.width-t.margin.left-t.margin.right,"auto"!==t.height&&t.height||(e.height=e.container.node().offsetHeight),e.chartHeight=e.height-t.margin.top-t.margin.bottom,"auto"===t.outerPadding||"bar"===t.type){var r=cirrus.utils.extractValues(e.data,"x");e.outerPadding=e.chartWidth/r[0].length/2}return"line"===e.type&&(e.outerPadding=0),"grid"===e.subtype&&(e.gutterPercent=0,e.multipleTooltip=!1),e.data.forEach(function(e,i){d3.keys(e.values[0]).indexOf("color")>-1?e.color=null:e.color||(e.color=t.colorList[i%t.colorList.length])}),this},cirrus.template={},cirrus.template.main='<div class="chart"><div class="title"></div><div class="axis-title-y"></div><div class="grid-x"></div><div class="grid-y"></div><div class="panel"><div class="shape"></div><div class="hovering"></div></div><div class="axis-x"></div><div class="axis-y"></div><div class="axis-title-x"></div><div class="legend"></div></div>',cirrus.layout={data:{},axes:{},fringes:{}},cirrus.layout.shape=function(t,e){var i=e.scaleY.copy(),r=e.scaleY.copy(),n=cirrus.utils.extractValues(e.visibleData,"y"),a=d3.transpose(n),o=null,s=e.chartWidth;e.visibleData[0].values.forEach(function(i,r){var n=i.x;"time"===t.scaleType?n=new Date(n):"ordinal"===t.scaleType&&(n=r);var a=e.scaleX(n)-e.scaleX(o);0!==r&&s>a&&(s=a),o=n}),s=Math.max(s,1);var c=e.chartHeight/e.visibleData.length;return e.visibleData.map(function(n,o){var u=null;return n.values.map(function(l,d){i.domain([0,d3.sum(a[d])]),r.domain([0,d3.max(a.map(function(t){return d3.sum(t)}))]);var p=l.x;"time"===t.scaleType?p=new Date(p):"ordinal"===t.scaleType&&(p=d);var h=s/100*e.gutterPercent,f={data:l,normalizedValue:l.y/e.scaleY.domain()[1],color:n.color||e.scaleColor(l.color),x:e.scaleX(p),y:e.chartHeight-e.scaleY(l.y),w:s-h,h:e.scaleY(l.y),centerX:e.scaleX(p)-s/2,stackedPercentY:e.chartHeight-i(d3.sum(a[d].slice(0,o+1))),stackedPercentH:i(l.y),gridY:e.chartHeight-c*l.y-c,gridH:c,stackedY:e.chartHeight-r(d3.sum(a[d].slice(0,o+1))),stackedH:r(l.y)};return f.previous=u||f,u=f,f})})},cirrus.layout.axes.x=function(t,e){var i=e.scaleX.copy();return e.continuousXAxis?i.ticks().map(function(t){return{key:t,x:i(t)}}):e.visibleData[0].values.map(function(e,r){var n=e.x;return"time"===t.scaleType?n=new Date(n):"ordinal"===t.scaleType&&(n=r),{key:e.x,x:i(n)}})},cirrus.layout.axes.y=function(t,e){var i=e.scaleY.copy(),r=e.scaleY.copy(),n=e.scaleY.copy(),a=cirrus.utils.extractValues(e.visibleData,"y"),o=d3.transpose(a),s=d3.max(d3.merge(a));i.domain([s,0]);var c=d3.max(o.map(function(t){return d3.sum(t)}));n.domain([c,0]);var u=d3.max(o.map(function(t){return d3.sum(t)}));return r.domain([u,0]),d3.range(t.tickYCount).map(function(e,r){var n=r*s/(t.tickYCount-1);return{label:n,stackedLabel:r*c/(t.tickYCount-1),labelY:i(n)}})},cirrus.layout.legend=function(t,e){return e.data.map(function(t){return{name:t.name,color:t.color}})},cirrus.layout.fringes.y=function(){},cirrus.attribute={bar:{},line:{},point:{},axis:{}},cirrus.attribute.bar.simple=function(t,e){return e.shapeLayout.map(function(t){return t.map(function(t){return{x:t.centerX,y:t.y,width:t.w,height:t.h,color:t.color}})})},cirrus.attribute.bar.percent=function(t,e){return e.shapeLayout.map(function(t){return t.map(function(t){return{x:t.centerX,y:t.stackedPercentY,width:t.w,height:t.stackedPercentH,color:t.color}})})},cirrus.attribute.bar.grid=function(t,e){return e.shapeLayout.map(function(t){return t.map(function(t){return{x:t.centerX,y:t.gridY,width:t.w,height:t.gridH,color:t.color}})})},cirrus.attribute.bar.stacked=function(t,e){return e.shapeLayout.map(function(t){return t.map(function(t){return{x:t.centerX,y:t.stackedY,width:t.w,height:t.stackedH,color:t.color}})})},cirrus.attribute.line.simple=function(t,e){return e.shapeLayout.map(function(t){return{points:t.map(function(t){return[t.x,t.y]}),color:t[0].color}})},cirrus.attribute.line.stacked=function(t,e){return e.shapeLayout.map(function(t){return{points:t.map(function(t){return[t.x,t.stackedY]}),color:t[0].color}})},cirrus.attribute.line.area=function(t,e){return e.shapeLayout.map(function(t,i){var r=t.map(function(t){return[t.x,t.stackedY]}),n=null;n=0===i?t.map(function(t){return[t.x,e.chartHeight]}).reverse():e.shapeLayout[i-1].map(function(t){return[t.x,t.stackedY]}).reverse();var a=r.concat(n);return{points:a,color:t[0].color}})},cirrus.attribute.axis.labelX=function(t){var e={};return e=t.axisXAngle<0?{left:function(t){return t.x-this.offsetWidth+"px"},"transform-origin":"100%",transform:"rotate("+t.axisXAngle+"deg)"}:t.axisXAngle>0?{left:function(t){return t.x+"px"},"transform-origin":"0%",transform:"rotate("+t.axisXAngle+"deg)"}:{left:function(t){return t.x-this.offsetWidth/2+"px"}},e.display=function(e,i){return i%t.axisXTickSkip?"none":"block"},e.top=t.tickSize+"px",e},cirrus.attribute.axis.tickX=function(t){var e=1;return{left:function(t){return t.x-e/2+"px"},width:e+"px",height:function(e,i){return(i%t.axisXTickSkip?t.minorTickSize:t.tickSize)+"px"}}},cirrus.attribute.axis.gridX=function(t,e){var i=1;return{top:t.margin.top+"px",left:function(e){return t.margin.left+e.x-i/2-this.offsetWidth+"px"},width:i+"px",height:function(i,r){return(r%t.axisXTickSkip?0:e.chartHeight)+"px"}}},cirrus.attribute.axis.fringeX=function(t){var e=d3.scale.linear().domain([0,1]).range(["yellow","limegreen"]);return{left:function(t){return t.x-t.w/2+"px"},width:function(t){return Math.max(t.w,1)+"px"},height:function(){return t.fringeSize+"px"},"background-color":function(t){return e(t.normalizedValue)}}},cirrus.attribute.axis.labelY=function(t){return{position:"absolute",left:function(){var e=this.offsetWidth;return t.margin.left-e-t.tickSize+"px"},top:function(t){var e=this.offsetHeight;return t.labelY-e/2+"px"}}},cirrus.attribute.axis.tickY=function(t){var e=1;return{width:t.tickSize+"px",height:e+"px",position:"absolute",left:t.margin.left-t.tickSize+"px",top:function(t){return t.labelY+"px"}}},cirrus.attribute.axis.gridY=function(t,e){var i=1;return{width:e.chartWidth+"px",height:i+"px",position:"absolute",left:t.margin.left+"px",top:function(e){return t.margin.top+e.labelY+"px"}}},cirrus.attribute.axis.fringeY=function(t){var e=d3.scale.linear().domain([0,1]).range(["yellow","limegreen"]),i=3;return{position:"absolute",left:t.margin.left-t.fringeSize+"px",top:function(t){return t.y-i/2+"px"},width:function(){return t.fringeSize+"px"},height:function(){return i+"px"},"background-color":function(t){return e(t.normalizedValue)}}},cirrus.interaction={},cirrus.interaction.hovering=function(t,e){var i=e.container.select(".hovering").style({width:e.chartWidth+"px",height:e.chartHeight+"px",position:"absolute",opacity:0});if(i.on("mousemove"))return this;i.on("mousemove",function(){var t=d3.mouse(this),i=e.shapeLayout[0].map(function(t){return t.x}),r=e.shapeLayout[0][0].gridH,n=Math.floor((e.chartHeight-t[1])/r);n=Math.min(n,e.chartHeight/r-1);var o=e.shapeLayout[0][0].w/2,s=d3.bisect(i,t[0]-o);s=Math.min(s,i.length-1);var c={mouse:t,x:i,idx:s,idxY:n};a(c),e.events.hover(c)}).on("mouseenter",function(){i.style({opacity:1})}).on("mouseout",function(){i.style({opacity:0}),e.events.hoverOut()});var r=cirrus.interaction.hoverLine(t,e),n=cirrus.interaction.tooltip(t,e);e.internalEvents.on("setHover",function(t){a(t)}),e.internalEvents.on("hideHover",function(){i.style({opacity:0})});var a=function(t){var a=e.shapeLayout[t.idxY][t.idx],o=e.shapeLayout.map(function(e){return e[t.idx]});e.multipleTooltip||(o=[o[t.idxY]]),i.style({opacity:1}),r(a),n(o)}},cirrus.interaction.tooltip=function(t,e){return function(i){var r=e.container.select(".hovering"),n=r.selectAll(".tooltip").data(i);n.enter().append("div").attr({"class":"tooltip"}).style({position:"absolute","pointer-events":"none","z-index":2}),n.html(function(e){return t.tooltipFormatter(e)}).style({left:function(t){return t.x+"px"},top:function(e){var i=e.stackedY;return"simple"===t.subtype?i=e.y:"percent"===t.subtype?i=e.stackedPercentY:"grid"===t.subtype&&(i=e.gridY),i+"px"},"background-color":function(t){return t.color}}),n.exit().remove()}},cirrus.interaction.hoverLine=function(t,e){var i=e.container.select(".hovering").append("div").attr({"class":"hover-line"}).style({position:"absolute",width:"1px",height:e.chartHeight+"px",left:t.margin.left+"px","pointer-events":"none"});return function(t){i.style({left:t.x+"px"})}},cirrus.scale={},cirrus.scale.x=function(t,e){var i=cirrus.utils.extractValues(e.visibleData,"x"),r=d3.merge(i),n=[e.outerPadding,e.chartWidth-e.outerPadding],a=null;return"time"===t.scaleType?(a=d3.time.scale().range(n),r=r.map(function(t){return new Date(t)}),a.domain(d3.extent(r))):"ordinal"===t.scaleType?(a=d3.scale.linear().range(n),a.domain([0,i[0].length-1])):(a=d3.scale.linear().range(n),a.domain(d3.extent(r))),a},cirrus.scale.y=function(t,e){var i=d3.merge(cirrus.utils.extractValues(e.visibleData,"y"));return d3.scale.linear().range([0,e.chartHeight]).domain([0,d3.max(i)])},cirrus.scale.color=function(t,e){var i=d3.merge(cirrus.utils.extractValues(e.visibleData,"color"));return d3.scale.linear().range(["yellow","red"]).domain([0,d3.max(i)])},cirrus.renderer={svg:null,canvas:null},cirrus.renderer.svg=function(t){var e={},i=d3.select(t).append("svg").attr({width:t.offsetWidth,height:t.offsetHeight}).style({position:"absolute"});return e.polygon=function(t){return i.append("path").attr({d:"M"+t.points.join("L"),fill:t.fill||"silver",stroke:t.stroke||"silver"}),this},e.rect=function(t){return path=i.append("rect").attr(t.rect).attr({fill:t.fill||"silver",stroke:t.stroke||"silver"}),this},e},cirrus.renderer.canvas=function(t){var e={},i=d3.select(t).append("canvas").attr({width:t.offsetWidth,height:t.offsetHeight}).style({position:"absolute"}),r=i.node().getContext("2d");return e.polygon=function(t){var e=t.fill;return"none"!==t.fill&&t.fill||(e="transparent"),r.fillStyle=e,r.strokeStyle=t.stroke,r.beginPath(),t.points.forEach(function(t,e){0===e?r.moveTo(t[0],t[1]):r.lineTo(t[0],t[1])}),r.fill(),r.stroke(),this},e.rect=function(t){return r.fillStyle=t.fill,r.strokeStyle=t.stroke,r.fillRect(t.rect.x,t.rect.y,t.rect.width,t.rect.height),this},e.circle=function(t){return r.fillStyle=t.fill,r.strokeStyle=t.stroke,context.beginPath(),context.arc(t.circle.x,t.circle.y,t.circle.r,0,2*Math.PI,!1),context.fill(),context.stroke(),this},e},cirrus.component={},cirrus.component.chart=function(t,e){{var i=e.container.select(".chart").style({position:"absolute",width:e.width+"px",height:e.height+"px"});i.select(".panel").style({position:"absolute",left:t.margin.left+"px",top:t.margin.top+"px",width:e.chartWidth+"px",height:e.chartHeight+"px"}),i.select(".shape").style({position:"absolute",width:e.chartWidth+"px",height:e.chartHeight+"px"})}},cirrus.component.shapes=function(t,e){var i=cirrus.attribute[e.type][e.subtype](t,e),r=e.container.select(".shape");r.html("");var n=cirrus.renderer[t.renderer](r.node());return i.forEach("line"===e.type?function(e){var i=null;i="area"===t.subtype?e.color:"none",n.polygon({points:e.points,fill:i,stroke:e.color})}:function(t){t.forEach(function(t){n.rect({rect:t,fill:t.color,stroke:t.color})})}),this},cirrus.component.title=function(t,e){t.chartTitle&&e.container.select(".title").html(t.chartTitle).style({width:"100%","text-align":"center"}),t.axisXTitle&&e.container.select(".axis-title-x").html(t.axisXTitle).style({top:function(){return e.height-this.offsetHeight+"px"},position:"absolute",width:"100%","text-align":"center"}),t.axisYTitle&&e.container.select(".axis-title-y").html(t.axisYTitle).style({transform:"rotate(-90deg) translate(-"+e.height/2+"px)","transform-origin":"0 0"})},cirrus.component.axisX=function(t,e){if(t.showAxes){var i=e.container.select(".axis-x").style({width:e.chartWidth+"px",height:t.margin.bottom+"px",position:"absolute",top:e.chartHeight+t.margin.top+"px",left:t.margin.left+"px","border-top":"1px solid black"});if(t.showFringe){var r=i.selectAll("div.fringe-x").data(e.shapeLayout[0]);r.enter().append("div").classed("fringe-x",!0).style({position:"absolute"}),r.style(cirrus.attribute.axis.fringeX(t,e)),r.exit().remove()}var n=i.selectAll("div.label").data(e.axesLayout.x);n.enter().append("div").classed("label",!0).style({position:"absolute"}),n.html(function(e,i){return t.labelFormatterX(e.key,i)}).style(cirrus.attribute.axis.labelX(t,e)),n.style(cirrus.attribute.axis.labelX(t,e)),n.exit().remove();var a=[];if("auto"===t.axisXTickSkip){var o=null;n[0].forEach(function(t,e){var i=!1;return o&&(i=parseFloat(t.style.left)-parseFloat(o.style.left)<t.offsetWidth),i?a.push(e):o=t,d3.select(t).style({opacity:+!i}),t.offsetWidth})}if(t.showXGrid){var s=e.container.select(".grid-x").selectAll("div.grid-line-x").data(e.axesLayout.x);s.enter().append("div").classed("grid-line-x",!0).style({position:"absolute"}).style({"background-color":"#eee"}),s.style(cirrus.attribute.axis.gridX(t,e)),"auto"===t.axisXTickSkip&&s.style({height:function(t,e){var i=-1!==a.indexOf(e);return(i?0:t.height)+"px"}}),s.exit().remove()}var c=i.selectAll("div.tick").data(e.axesLayout.x);c.enter().append("div").classed("tick",!0).style({position:"absolute"}).style({"background-color":"black"}),c.style(cirrus.attribute.axis.tickX(t,e)),"auto"===t.axisXTickSkip&&c.style({height:function(e,i){var r=-1!==a.indexOf(i);return(r?t.minorTickSize:t.tickSize)+"px"}}),c.exit().remove()}},cirrus.component.axisY=function(t,e){if(t.showAxes){var i=e.container.select(".axis-y").style({width:t.margin.left+"px",height:e.chartHeight+"px",position:"absolute",top:t.margin.top+"px",left:"0px","border-right":"1px solid black"});if(t.showFringe){var r=i.selectAll("div.fringe-y").data(e.shapeLayout[0]);r.enter().append("div").classed("fringe-y",!0).style({position:"absolute"}),r.style(cirrus.attribute.axis.fringeY(t,e)),r.exit().remove()}if(t.showYGrid){var n=e.container.select(".grid-y").selectAll("div.grid-line-y").data(e.axesLayout.y);n.enter().append("div").classed("grid-line-y",!0).style({position:"absolute"}).style({"background-color":"#eee"}),n.style(cirrus.attribute.axis.gridY(t,e)),n.exit().remove()}var a=i.selectAll("div.label").data(e.axesLayout.y);a.enter().append("div").classed("label",!0),a.html(function(e){return"simple"===t.subtype||"grid"===t.subtype?e.label:e.stackedLabel}).style(cirrus.attribute.axis.labelY(t,e)),a.exit().remove();var o=i.selectAll("div.tick").data(e.axesLayout.y);o.enter().append("div").classed("tick",!0).style({"background-color":"black"}),o.style(cirrus.attribute.axis.tickY(t,e)),o.exit().remove()}},cirrus.component.legend=function(t,e){if(!t.showLegend)return this;var i=e.container.select(".legend").style({position:"absolute"}),r=i.selectAll("p.legend-item").data(e.legendLayout);r.enter().append("p").classed("legend-item",!0).each(function(t){var i=this,n=d3.select(this).append("a").style({cursor:"pointer"}).on("click",function(){var t=d3.select(i);d3.select(i).classed("unchecked",!t.classed("unchecked"));var n=[];r.each(function(t){this.classList.contains("unchecked")&&n.push(t.name)}),e.events.legendClick(n),e.internalEvents.legendClick(n)});n.append("span").attr({"class":"legend-color"}).style({display:"inline-block",width:"10px",height:"10px","border-radius":"5px","background-color":function(t){return t.color}}),n.append("span").attr({"class":"legend-name"}).style({display:"inline-block"}).html(function(){return t.name})}),r.exit().remove(),i.style({left:function(){return e.width-this.offsetWidth+"px"}})},"function"==typeof define&&define.amd)define(cirrus);else if("object"==typeof module&&module.exports){var d3=require("d3");module.exports=cirrus}