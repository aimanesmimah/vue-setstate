The main idea behind the creation of this package is to leverage react setState function to update vue js components state. Thus using object payloads or mutator functions for that sake instead of writing reasignement expressions that could require many lines of code especially when you have to update many state property at once.
Also it provides some extra utilities like using async mutators and a callback function that executes after the dom is re-rendered and take the previous & current state as arguments.


The distribution file falls inside the dist folder under the name `vue-setstate.min.js`  ✌

## USAGE

* usage in a dependency system project (spa) that requires a build tool like webpack

```javascript
// app.js 
import Vue from 'vue';
import Exemple from './components/Exemple.vue';
import setState from './lib';

Vue.config.devtools= true 
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(setState)


var vue= new Vue({
    el: '#app', 
    components:{
        Exemple
    },
    template: '<Exemple />'
})
```

then you can call the `$setState` function inside your app components on `this` object

* usage within a project where vue.js is added incremently to templates

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vue set state distribution</title>
    <style>
        #app{
            text-align:center
        }
    </style>
</head>
<body>
    <div id="app">
        <h1>Vue.js set state</h1>
        <p>{{data}}</p>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.21/vue.min.js" ></script>
    <script src="./dist/vue-setstate.min.js" ></script>
    <script type="text/javascript" >
        var vue= new Vue({
            el: '#app',
            data: {
                data: 'Hello'
            },
            mounted:function(){

                setTimeout(()=>{
                    this.$setState(()=> Promise.resolve({ data: `What's up` }),function(prev,current){
                        console.log(prev,current)
                    })
                },1000)
            },
            methods: {}
        })
    </script>
</body>
</html>
```

## USE CASES 

**simple payload**
```javascript
    this.$setState({ name: "ayman", age: 25 },
        function(prevState,currentState){
            console.log(prevState,currentState)
        })
```

**simple mutator function**
```javascript
this.$setState( prevState =>  prevState.num === 1 ? null : 3 ) // using null to cancel the update
```

**asynchronous mutator**
```javascript
async function fetchAPI(){
    var res= await Promise.reolve('data')
    return res ? { 
        data: res
    } : null
}

this.$setState(fetchAPI)

// or 

this.$setState(
    prevState=> new Promise(resolve=> {
        setTimeout(()=>{
            resolve('data')
        },3000)
    })
)

```

## SCRIPTS

```bash
npm start # starting exemple in dev mode
npm build # building library
npm test # running test suites using karma and mocha for terminal reporting 
npm release # added for CI tasks 
```

