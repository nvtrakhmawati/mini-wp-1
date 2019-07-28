<template>
    <div class="app">
        <navbar
          :is-login="isLogin"
          :page="page"
          @logout="logout"
          @fetch-articles="fetchArticles"
          @show-home-page="showHomePage"  
        ></navbar>

        <transition
            enter-active-class="animated slideInRight">
            <article-form
            v-if="page === 'article form'"
            :article="article"
            :old-article="oldArticle"
            @show-home-page="showHomePage"
            @old-article="oldArticle = $event"
            @fetch-article="fetchArticles"
            ></article-form>
        </transition>

        <transition 
            enter-active-class="animated fadeIn">
            <template v-if="page === 'home' || page === 'search'">
                <div class="ui divided items container" style="margin-top: 5rem;">
                <div v-if="page === 'search'">
                    <h1 class="ui header">Search Result:</h1>
                    <br />
                </div>

                <article-card 
                    v-for="(article, index) in articles" 
                    :key="index"
                    :index="index"
                    :article="article"
                    @view-article="viewArticle"
                    @fetch-articles="fetchArticles"
                ></article-card>
                </div>
            </template>
        </transition>

        <transition 
            enter-active-class="animated fadeInLeft">
            <article-detail
                v-if="page === 'article'"
                :article="article"
                :user-email="userEmail"
                @edit-article="editArticle"
                @delete-article="deleteArticle"
            ></article-detail>
        </transition>

        <login-form 
            v-if="page === 'login form'"
            @show-home-page="showHomePage"
            @is-login="isLogin = $event"
        ></login-form>   

        <signup-form
        v-if="page === 'register form'" 
        ></signup-form>
    </div>
</template>

<script>
import navbar from './navbar.vue'
import loginForm from './Login'
import regsiter from './register'
import addArticle from './addArticle'
import card from './card'
import articleDetail from './articleDetail'
import axios from '../axios'

export default {
    components:{
        navbar,
        'login-form' :loginForm,
        'signup-form': regsiter,
        'article-form': addArticle,
        'article-card': card,
        'article-detail': articleDetail
    },
    data(){
        return{
            isLogin: localStorage.getItem('accesstoken') ? true : false,
            userEmail: localStorage.getItem('email'),
            page: 'home',
            search: '',
            articles: [],
            // ARTICLE
            oldArticle: '',
            article: '',
        }
    },
    created() {
        axios({
            method: 'get',
            url:'/articles'
        })
            .then(({ data }) => {
                this.articles = data
            })
            .catch(err => {
                console.log(err)
                swal(err.response.data.message)
            })
    },
    methods: {
        fetchArticles(tag) {
            this.oldArticle = ''
            let query = '';
            let searching = false

            if (this.search.length > 0) {
                query = `?title=${this.search}`

                searching = true
            } else if (tag) {
                this.search = '';
                query = `?tags=${tag}`

                searching = true
                this.search = tag
            }

            if (searching) {
                this.page = 'search'
            }

            axios({
                method: 'get',
                url: '/articles' + query
            })
                .then(({ data }) => {
                    this.articles = data
                    this.search = ''
                })
                .catch(err => {
                    console.log(err)
                    swal(err.response.data.message)
                })
        },
        createdAt(date) {
            return new Date(date).toString().substring(0, 10)
        },
        logout() {
            localStorage.clear();
            this.isLogin = false;
        },
        // PAGES CONFIG
        showHomePage() {
            this.fetchArticles();
            this.page = 'home'
        },
        showArticleForm() {
            this.page = 'article form'
            this.oldArticle = ''
        },
        // VIEW ARTICLE
        viewArticle(i) {
            const article = this.articles[i]
            this.article = article
            this.page = 'article'
        },
        // EDIT ARTICLE
        editArticle() {
            this.oldArticle =  this.article
            this.page = 'article form'
        },
        // DELETE ARTICLE
        deleteArticle(id) {
            console.log(id)
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios({
                            url: `/articles/${id}`,
                            method: 'delete',
                            headers: {
                                accesstoken: localStorage.getItem('accesstoken')
                            }
                        })
                            .then(({ data }) => {
                                this.showHomePage();
                                this.fetchArticles();
                                
                                swal("Article deleted!", {
                                    icon: "success",
                                });
                            })
                            .catch(err => {
                                if (err.response) {
                                    swal(err.response.data.message)
                                } else {
                                    console.log(err)
                                }
                            })
                    }
                });
        }
    }
}
</script>

<style scoped>

</style>
