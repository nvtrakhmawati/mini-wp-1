<template>
    <div>
        <a ref="signinBtn" 
        class="g-signin2 ui fluid large black submit button">
        <i class="fa fa-google">
        </i> <p>Sign in with google</p></a>
    </div>
</template>

<script>
export default {
    name:'g-signin-button',
    mounted(){
        window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '28515749953-lpsctiktdeudjgpt9k0afp8n6rs0eetk.apps.googleusercontent.com'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.$emit('google', googleUser)
        }, error => console.log(error))
      })
    }
}
</script>

<style scoped>

</style>
