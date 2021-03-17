# Lazy Load Value

> 在做项目的过程中经常会遇到临时需求，修改某个文案，或者某段逻辑，然后过一段时间又下线，再过一段时间可能又要修改下再次上线。如果项目的规模不大还好，随手查找一下就改了，可如果项目规模较大，涉及到的模块较多，每次找着修改代码担心有遗漏或者觉得太麻烦，这时候你就会想，如果能有一种比较统一的处理方式应对这种需求就好了。

> 以下便是本人的思考和应对方案。

## 处理文案

对于需要定制化的文案，集中维护和处理。大多数的做法可能是在命名为 constants 的文件内定义常量，或者对象维护这种文案，亦或者干脆就在模块或者组件内定义常量来维护。

放在哪里要根据文案的辐射规模来决定，如果真的在很多模块内都用到了，最好提到统一的地方维护，不建议各自维护各自的。

举个例子：

```typescript
function A() {
  return <div>"你猜我在干什么？"</div>;
}

function B() {
  return <div>"你猜我在干什么？"</div>;
}

function C() {
  return <div>"你猜我在干什么？"</div>;
}

// ... 更多模块
```

假如有一天产品说，`你猜我在干什么？`不够接地气，需要改成`你猜我再弄啥嘞？`。通常情况下，你会全局搜索该文案，然后借助编辑器的全局替换功能，替换新的文案。然后你会发现，仅仅这一个文案，你就要更新进 30 多个文件，而且产品还给你说，等着一阵子土味风刮过去了，可能还要改回来。你会不会觉得很讨厌？而且还会有更多的文案甚至逻辑的需求提上来……

下面是借助`lazyLoadValue`的处理方式:

```typescript
export const youGuessWhatIamDoing = lazyLoadValue({
  value: "你猜我在干什么？", // 默认文案
  optionalValue: "你猜猜看?", // 土味文案
  condition: true, // 条件值为true的时候是optionalValue 反之是value
});

function A() {
  return <div>{youGuessWhatIamDoing}</div>;
}

function B() {
  return <div>{youGuessWhatIamDoing}</div>;
}

function C() {
  return <div>{youGuessWhatIamDoing}</div>;
}

// ... 更多模块

// 这样一来，当下次再让你改的时候，只需要改一个条件值的真假就行了

// 如果条件比较复杂，没问题
export const youGuessWhatIamDoing = lazyLoadValue({
  value: "你猜我在干什么？", // 默认文案
  optionalValue: "你猜猜看?", // 土味文案
  condition: () => {
    // do some logic
    return true; // or false
  },
});
```

## 处理逻辑（函数）

更让人讨厌的是在代码里为了定制化需求，在函数里各种加`if else`或者三元运算符,既违反单一职责原则，又让代码充满了花括号的嵌套，阅读起来费劲。

举个简单的例子：

```typescript
/**
 * 获取公司信息的函数
*/
const getChinaCompanyInfo = ()=>({...})

const getUSompanyInfo = ()=>({...})

let info;
if(isChina){
  info = getChinaCompanyInfo();
}else if(isUS){
  info = getUSompanyInfo();
}

//使用lazyLoadValue

const getChinaCompanyInfo = ()=>({...})
const getUSompanyInfo = ()=>({...})

const getCompanyInfo = lazyLoadValue({
  value: getChinaCompanyInfo,
  optionalValue: getUSompanyInfo,
  condition:()=>{
    return isUS;
  }
})

const info = getCompanyInfo();

// 当然这也有局限性，只能支持非此即彼的场景替换，但是把变化抽取出来维护，多少算一点进步吧

```
