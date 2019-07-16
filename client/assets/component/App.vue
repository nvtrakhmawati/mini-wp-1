<template>
    <div class="app">
        <Login/>
        <Register/>
    </div> 
</template>

<script>
import Login from './Login'
import Register from './Register'

export default {
    components:{
        'Login': Login,
        'Register': Register
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>

</style>
