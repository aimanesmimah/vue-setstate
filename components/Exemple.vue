<template>
      <div id="exemple" >
          <section id="main" >
                <p class="title">Vue-setstate</p>
                <p class="subtitle">React setState function rewritten for vue.js</p>
                <p v-if="loading" class="info" >Loading...</p>
                <p v-else-if="isError" class="info" >No users could be loaded</p>
                <section v-else id="cards" >
                    <Card v-for="(item,index) in cards" :key="index" 
                        :item="item" :index="index" @removeCard="removeCard(index)" />
                </section>
          </section>
          <button class="github-link" v-on:click="redirectionClick" >
                    <img src="assets/Octocat.png" alt="" />
                    <span>View on GITHUB</span>
            </button>
      </div>
</template>

<script>
import Card from './Card.vue';
export default {
    name: 'Exemple',
    components:{
        Card
    },
    data(){
        return {
            loading: false,
            isError: false,
            cards: [],
            cardsCount: 0,
            showGithub: false,
            fetchUrl: 'https://randomuser.me/api/?results=50'
        }
    },
    mounted() {
        this.getRandomUsers()

        setTimeout(()=>{
            this.$setState(prevState=> !prevState.showGithub ? ({showGithub: true}): null)
        },1000)
    },
    methods: {
        getRandomUsers(){
            this.$setState({loading: true})
            this.$http.get(this.fetchUrl).then(res=>{
                  this.$setState({loading: false})
                    try {
                        var rows= JSON.parse(res.bodyText)
                        this.$setState({cards: rows.results , cardsCount: rows.info.results },function(prevState,current){
                            console.log(prevState)
                            console.log(current)
                        })
                    } catch (error) {
                        this.$setState({isError: true})                                                
                    }
                  
            })
            .catch(err=>{
                this.$setState({isError:true, loading: false},function(prevState,currentState){
                       console.log(prevState)
                       console.log(currentState)
                })
            })
        },
        removeCard(index){
            setTimeout(()=>{
                this.$setState({cards: this.cards.filter((item,i)=> i !== index ), cardsCount: this.cardsCount-- })
            },301)
        },
        redirectionClick(){
            window.location.href= 'https://github.com/froggy02/vue-setstate#readme'
        },
        vueDidUpdate(){
            console.log('vue did updated')
        },
    },
}
</script>

<style scoped>
#exemple{
    background-color: #E0E2DB;
    width: 100%;
    min-height: 100vh;
    text-align: center;
    padding-top: 50px;
    font-family: Arial, Helvetica, sans-serif
}

#main{
    position: relative;
    background-color: white;
    box-shadow: 0 0 3px #CCC ;
    width: 40%;
    height: 75vh;
    padding-top: 40px;
    margin: auto;
}

p{
    margin: 0;
    padding: 0;
}


.title{
    font-size: 35px;
    font-weight: bold;
    color: #8EB8E5
}

.subtitle{
    font-size: 15px;
    font-weight: 600;
    color: #8EB8E5;
    opacity: 0.5;
}

.info{
    margin-top: 100px;
    font-size: 30px;
    color: #8EB8E5;
}

#cards{
    position: relative;
    overflow-y: auto;
    max-height: 60vh ;
    width: 500px;
    margin: 30px auto;
}

.github-link{
    display: flex;
    flex-direction: row;
    height:50px;
    width: 150px;
    margin: 20px auto;
    padding: 0 20px;
    border: 1.5px solid black;
    border-radius: 20px;
    background: none;
    text-decoration: none;
    color : black;
    cursor: pointer;

    transition: all .3s ease-in;
}

.github-link:hover{
    background: #8EB8E5;
    color: white
}

.github-link:focus{
    outline: none
}

.github-link img{
    margin-top: 3px;
    width: 40px;
    height: 30px
}

.github-link span {
    align-self: center;
    /*border: 2px solid black;*/
    font-size: 15px
}
</style>


