let css1= `
/* 
 * 面试官你好，我是滕娟
 * 只用文字作自我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
  transition: all 1s;
}
html{
  background: #eee;
}

#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/*我需要一点代码高亮*/

.token.selector{
  color: #690;
}

.token.property{
  color: #905;
}

/*加一些3D效果*/

#code{
  transform: rotate(360deg);
}

/*加一点呼吸效果*/

#code{
    animation: breath 1s infinite alternate-reverse;
}
/* 现在正式开始 */
  
/* 我需要一张白纸 */
 
#code-wrapper{
  width: 50%;
  left: 0;
  position: fixed;
  height: 100vh;
  padding: 16px;
}

#paper > .content{
  display: block;/*显示*/
}

`

//将code写入 html css标签
function writeCss(prefix ,code1, fn){
  let domCode = document.querySelector('#code')
  domCode.innerHTML= prefix || '' 
  let n=0;
  let timeid= setInterval(()=>{
      
    n+=1;
    domCode.innerHTML=Prism.highlight(prefix + code1.substring(0,n), Prism.languages.css);
    styleTag.innerHTML=prefix + code1.substring(0,n);
    domCode.scrollTop = domCode.scrollHeight //解决代码看不见问题
    if(n>= code1.length ){
      window.clearInterval(timeid) 
      fn&&fn.call()
    }
    
  },70)
  
}
//创建paper
function createPaper(fn){
  var paper = document.createElement('div')
  paper.id='paper'
  var content= document.createElement('pre')// pre标签才不会换行
  content.className="content"
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn&&fn.call()
}


//写入markdown
function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper > .content')
  let n=0;
  let timeid= setInterval(()=>{
      
    n+=1;
    domPaper.innerHTML=markdown.substring(0,n)// markdown 不需要高亮，markdown没有样式
    domPaper.scrollTop = domPaper.scrollHeight //解决代码看不见问题
    if(n>= markdown.length ){
      window.clearInterval(timeid) 
      fn&&fn.call()
    }
    
  },70)
 }

//markdown 转换成html
function convertMarkdownToHtml(fn){
  var div= document.createElement('div')
  div.className= 'html markdown-body'
  div.innerHTML=   marked(md)//转成html
  let markdownContainer= document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div) //div替换markdown
  fn && fn.call()
}


var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
`

var md = `
# 自我介绍
我叫 滕娟
1994 年 4 月出生
山东女子学校毕业
计算机科学与技术专业
希望应聘前端开发岗位

# 技能介绍
熟悉 JavaScript CSS

# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`


let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCss('', css1, ()=>{ // writeCss call the function
  console.log(1)
  createPaper(() => {
    console.log('paper有了')
    writeMarkdown(md, ()=> {
      console.log('写入markdown')
      writeCss(css1, css2, ()=>{
        convertMarkdownToHtml(()=>{
          console.log('转成html')
        

          writeCss(css1+css2, css3, ()=>{
            console.log('完成')
          })
        })
      })
      
    })
  })
})












