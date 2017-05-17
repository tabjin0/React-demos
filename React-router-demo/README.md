React-router-demo-note

所有的系统都需要路由，只要系统不是一个页面。一个酷游基本上对应着一个页面或者一个资源。
比如，react-router，vue-router，后端的koa-router

demo效果：
localhost:8080/#/?_k=cb8quf
这边#的意思就是HTML的锚点链接，#后面是真正的路由，#后面的斜线就是根目录
1. 安装react-router
安装 react-router 
npm install react-router —save
完成之后可查看package.json的变化
"dependencies": {
    "react": "^15.3.1",
    "react-addons-perf": "^15.4.2",
    "react-addons-pure-render-mixin": "^15.5.2",
    "react-dom": "^15.3.1",
    "react-router": "^4.1.1"
  }
确认成功安装

2. 创建页面
创建以下几个页面
./app/containers/App.jsx  所有页面的爸爸页面

./app/containers/Home   主页

./app/containers/List    列表页

./app/containers/Detail    详情页

./app/containers/NotFound   404页面

注意App.jsx中的代码目前是这样子的，而且放在这里有点多余，但是在正式的项目开发中，这个文件很有用，而且这个文件和’react-router‘也将会结合的很好。
注意：不要在./app/index.jsx添加备用的模块，试了试把common.js文件删除之后，其他地方没有问题，就是报错，所以不要乱添加备用模块。

在这边，./app.index.jsx是入口文件，App.jsx是模板文件，一般像这样的App.jsx用来放公共的头和尾。

3. 配置router

创建 `./app/router/routeMap.jsx` 文件，主要代码如下，详细的代码看源文件。
**jsx
class RouteMap extends React.Component {
    updateHandle() {
    console.log('router变化之后触发')
    //一般统计PV
    }
    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                {/*默认是Home，如果是只访问根的话，就定位在Home*/}
                    <Route path='list' component={List}/>
                {/*如果是访问根后面List，就定位在List*/}
                    <Route path='detail/:id' component={Detail}/>
                {/*如果是根后面加detail，/:id对应一个参数，*/}
                    <Route path='*' component={NotFound}/>
                {/*如果上面的都没有匹配到，就会匹配到NotFound*/}
                </Route>
            </Router>
        )
    }
}
**
每个<Route/>最外层必须写一个<Router></Router>
this.props.history是从外面传进来的
注意，代码中`path='detail/:id'`，最后一个标记表示参数，例如`/detail/123`这个`123`就是参数，具体的使用在下文详解。
还要注意，`<Route>`是可以嵌套的，上面的代码中只嵌套了一层，在后面的项目开发中，可能会嵌套层次多一些，不过是一个道理
最后，routerMap被入口文件./app/index.js引用。

4. 使用router
`./app/index.jsx`中的代码如下，这样就使用了我们刚才定义的`routeMap`组件
**jsx
import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'

import RouteMap from './router/routeMap'

render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
)
**
注意这里的`hashHistory`，规定用 url 中的 hash 来表示 router 例如`localhost:8080/#/list`。与之对应的还有一个`browserHistory`也可用，它就不使用 hash ，直接可以这样`localhost:8080/list`表示。但是后者需要服务器端支持，我们这里用前者。两者在前端开发中，使用起来都是一样的，只是表示形式不一样。目前搜索引擎对这种`localhost:8080/#/list`比较友好。其实这些app内部搜索是屏蔽外部搜索引擎的。
到此为止就可以`npm start`运行看效果了。

到此为止，配置组件和router之间的关系完成。
5. 页面跳转
从给一个页面跳转到另一个页面，有两种方法。第一种是 `<Link>` 跳转，例如在 Home 页面中的代码。（其实这个`<Link>`渲染完了就是html中的`<a>`）
**
import React from 'react'
import { Link } from 'react-router'

class Home extends React.Component {
    render() {
        return (
            <div>
                <p>Home</p>
                <Link to="/list">to list</Link>
            </div>
        )
    }
}
export default Home
**

另一个方法是使用 js 跳转，例如在 List 页面中
**jsx
import React from 'react'
import { hashHistory } from 'react-router'

class List extends React.Component {
    render() {
        const arr = [1, 2, 3]
        return (
            <ul>
                {arr.map((item, index) => {
                    return <li key={index} onClick={this.clickHandler.bind(this, item)}>js jump to {item}</li>
                })}
            </ul>
        )
    }
    clickHandler(value) {
        hashHistory.push('/detail/' + value)
    }
}
export default List

7. 获取参数
Detail 页面需要获取 url 中的`id`参数，否则配置这个参数就无用了。可以使用 `this.props.params.id` 获取，可查看 Detail 的源码。
