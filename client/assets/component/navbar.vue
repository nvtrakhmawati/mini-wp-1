<template>
   <div class="ui borderless main menu">
        <div class="ui container">
            <div class="header item" id="logo" @click="$emit('show-home-page')">
                <img
                src="../src/macintosh-operating-systems-microsoft-word-computer-icons-microsoft-office-for-mac-2011-word-2013-icon-png.jpg"
                />
            </div>
            
            <a class="item" @click="$parent.page = 'article form'" v-if="isLogin">Create</a>
            <div class="right menu">
                <div class="item">
                    <div class="ui icon input">
                        <input
                          type="text"
                          placeholder="Search..."
                          v-model="$parent.search"
                          @keyup.enter.prevent="$emit('fetch-articles')"
                        />
                        <i class="search link icon"></i>
                    </div>
                </div>
                <a class="ui item" @click="$emit('logout')" v-if="isLogin">
                    Logout
                </a>
                <a class="ui item" @click="$parent.page = 'login form'" v-if="page !== 'login form' && page !== 'register form' && isLogin === false">
                    Login
                </a>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'navbar',
    props:{
        page: String,
        isLogin: Boolean
    }
}
</script>

<style scoped>

</style>
