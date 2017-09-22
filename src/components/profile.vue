<template>
    <div id="Profile">
        <h3>Profile page</h3>
        <div>
            <p><b>Name:</b>{{this.data.profileName}}</p>  
            <p><b>City:</b>{{this.data.profileCity}}</p>
            <p><b>Email:</b>{{this.data.profileEmail}}</p>
            <p><b>Host Rating:</b>{{this.data.profileHR}}</p>
            <p><b>Contributor Rating:</b>{{this.data.profileCR}}</p>
            <h4>Events:</h4>
            <ul>
                
    <li v-for="event in this.data.events" v-bind:key="event.id">
        {{event.Name}}
    </li>

            </ul>
        </div>
        
    </div>
</template>

<script>
// Imports
export default {
    data () {
        return {
            data: {
                profileName: '',
                profileCity: '',
                profileEmail: '',
                profileHR: '',
                profileCR: '',
                events: [],
            }
            
            
        }
    },
    mounted: function() {
        this.$http.get('/profile')
            .then(function(response) {
                console.log(response);
                this.data.profileName = response.body.Name;
                this.data.profileCity = response.body.City;
                this.data.profileEmail = response.body.Email;
                this.data.profileHR = response.body.hostRating;
                this.data.profileCR = response.body.contributorRating;
            });
        this.$http.get('/userevents')
        .then(function(response) {
            console.log(response.body);
            this.data.events = response.body;
        })
    },
    methods: {
        
    }
}
</script>

<style scoped>

</style>