<template>
    <div :class="`card item-${index}`"  v-on:mouseover="showRemove= true" v-on:mouseleave="showRemove= false" >
        <button v-show="showRemove" class="remove" v-on:click="remove" >x</button>
        <p class="card-title" >{{item.name.first}} {{item.name.last}}</p>
        <div class="content" >
            <section class="thumbnail">
                <img :src="item.picture.large" alt="" />
            </section>
            <section class="infos" >
                  <p> <span>Gender: </span> {{item.gender}} </p>
                  <p><span>Email: </span> {{item.email}} </p>
                  <p><span>Phone: </span>{{item.phone}}</p>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props:{
        item:{
            type:Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showRemove: false
        }
    },
    methods: {
        remove(){
            console.log(this.index)
            $(`.item-${this.index}`).addClass('leave')
            setTimeout(()=>{
                $(`.item-${this.index}`).removeClass('leave')
            },300)

            this.$emit('removeCard')
        }
    },
}
</script>
<style scoped>
.card{
    position: relative;
    width: 90%;
    height: 150px;
    border-radius: 20px;
    box-shadow: 0 0 3px #bbb;
    background-color: rgba(142, 184, 229, 0.4);
    color: white;
    margin: 10px auto;
    padding: 10px;
}

.leave {
    animation: card-leave .3s ease-out
}

@keyframes card-leave {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to{
        transform: translateX(-100px);
        opacity: 0
    }
}

.remove{
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    background: none;
    border: 2px solid white ;
    border-radius: 25px;
    font-size: 10px;
    cursor: pointer;
    animation: remove-enter .3s ease-in ;
}

.remove:hover{
    transition: all .3s ease-in-out; 
    background: white;
    color: #8EB8E5;
    font-weight: 600
}

.remove:focus{
    outline: none
}

@keyframes remove-enter {
    0%{
        opacity: 0 ;
        transform: translateY(-3px)
    }

    100%{
        opacity: 1;
        transform: translateY(0)
    }
}




.content{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
}

.card-title{
    margin: 0;
    font-size: 25px;
    letter-spacing: 2px
}

.thumbnail > img{
    height: 100px;
    border-radius: 5px;
    box-shadow: 0 0 3px #888;
    border:2px solid white;
}

.infos {
    text-align: left;
    margin-left: 30px;
    margin-left: 30px;
    color: black;
}

.infos  p {
    margin: 10px 0
}

.infos p span{
    font-weight: 600;
}
</style>

