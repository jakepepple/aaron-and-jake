<template>
    <div id="Sign Up">
        <p>Sign Up Page</p>
        <form>
            <input type="text" v-model="signUpForm.email"  placeholder="E-mail Address" required/>
            <input type="text" v-model="signUpForm.name"  placeholder="Username" required/>
            <input type="password" v-model="signUpForm.password"  placeholder="Password" required/>
            <input type="text" v-model="signUpForm.city"  placeholder="Current City" required/>
            <button @click.prevent="signUp">Sign Up</button>
        </form>

    </div>
</template>

<script>
// Imports

export default {
    data() {
        return {
            signUpForm: {
                name: '',
                password: '',
                city: '',
                email: ''

            },


        }
    },
    methods: {
        signUp() {
            this.$http.post('/signup', {
                name: this.signUpForm.name,
                password: this.signUpForm.password,
                city: this.signUpForm.city,
                email: this.signUpForm.email
            }).then(function(data, status, request) {
                console.log(data);
                console.log(status);
                console.log(request);
                 this.signUpForm.name = ''
                this.signUpForm.password = ''
                this.signUpForm.city = ''
                this.signUpForm.email = ''
            })


        }

    }

}
</script>


<style scoped>
.body {
    background: url(../assets/Walkthrough_03@3x.png);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>