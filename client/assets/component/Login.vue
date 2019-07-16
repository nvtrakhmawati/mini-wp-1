<template>
    <div id="sign-in-form" v-show="page === 'login-form'">
          <h2 class="ui blue image header">
            <div class="content">
              Log-in to your account
            </div>
          </h2>
          <form class="ui large form" @submit.prevent="login">
            <div class="ui raised segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    v-model="loginForm.email"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="loginForm.password"
                  />
                </div>
              </div>
              <div class="ui fluid large blue submit button" onclick="login()">Login</div>
            </div>

            <div class="ui error message"></div>
          </form>
          <br />
          <div
            class="g-signin2"
            data-width="405"
            data-height="40"
            data-longtitle="false"
            data-onsuccess="onSignIn"
          ></div>

          <div class="ui message">
            New to us? <a id="sign-up-show" >Sign Up</a>
          </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            loginForm:{
                email: '',
                password: ''
            }
        }
    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
        })
        this.checkLogin()
    },
    methods:{
        login(){
            axios({
                url: `http://localhost:3000/users/login`,
                method: 'POST',
                data: {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                }
            })
            .then(({ data }) => {
                localStorage.token = data.token
                    this.isLogin = true
                    this.loginUser = {
                        _id: data._id,
                        name: data.name,
                        email: data.email
                    }
            })
            .catch((err)=> {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>

</style>
