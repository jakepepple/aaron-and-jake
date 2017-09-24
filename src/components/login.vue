<template>
    
        <b-jumbotron header="Login Page">
        <form>
            <input type="text" v-model="loginData.email" placeholder="Email" required/>
            <input type="password" v-model="loginData.password" placeholder="Password" required/>
            <button @click.prevent="login">Login</button>
        </form>
        <router-link to="/signup">Create New Account</router-link>

    </b-jumbotron>
</template>

<script>
// Imports

export default {
    data() {
        return {
            styleObject: {
                'color': "Green"
            },
            loginData: {
                email: '',
                password: '',
            },
        }

    },
    methods: {
        login: function() {
            this.$http.post('/login', {
                email: this.loginData.email,
                password: this.loginData.password
            }, {
                withCredentials: true,
            }).then(function(data, status, response) {
                console.log(response)
                console.log(data)
                this.loginData.email = ''
                this.loginData.password = ''
            })
        },
    
    }

}
</script>

<style scoped>

</style>