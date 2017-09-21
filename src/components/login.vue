<template>
    <div id="app">
        <p>Login Page</p>
        <form>
            <input type="text" v-model="loginData.email" placeholder="Email" required/>
            <input type="password" v-model="loginData.password" placeholder="Password" required/>
            <button @click.prevent="login">Login</button>
        </form>
        <router-link to="/signup">Create New Account</router-link>

    </div>
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
            this.$http.post('http://61e83bf3.ngrok.io/login', {
                email: this.loginData.email,
                password: this.loginData.password
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
.body {
    background: url(../assets/food-salad-restaurant-person.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>