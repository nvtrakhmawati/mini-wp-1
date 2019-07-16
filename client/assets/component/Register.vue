<template>
   <div id="sign-up-form" v-show="page === 'register-form'">
          <h2 class="ui blue image header">
            <div class="content">
              Create new account
            </div>
          </h2>
          <form class="ui large form" @submit.prevent="register">
            <div class="ui raised segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    id="registerForm.name"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="mail icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    id="registerForm.email"
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
                    id="registerForm.password"
                  />
                </div>
              </div>
              <div class="ui fluid large blue submit button">Sign Up</div>
            </div>

            <div class="ui error message"></div>
          </form>
          <div class="ui message">
            Already have account? <a id="sign-in-show">Sign in</a>
          </div>
    </div> 
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            registerForm: {
                name: '',
                email: '',
                password: ''
            }
        }
    }, 
    methods: {
        register(){
            axios({
                url: `http://localhost:3000/users/register`,
                method: 'POST',
                data: {
                    name: this.registerForm.name,
                    email: this.registerForm.email,
                    password: this.registerForm.password
                }
            })
            .then()
            .catch((err)=> {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
