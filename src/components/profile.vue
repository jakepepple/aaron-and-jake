<template>
    <div id="Profile">
        <h3>Profile page</h3>
        <div>
            <p>
                <b>Name:</b>{{this.data.profileName}}</p>
            <p>
                <b>City:</b>{{this.data.profileCity}}</p>
            <p>
                <b>Email:</b>{{this.data.profileEmail}}</p>
            <p>
                <b>Host Rating:</b>{{this.data.profileHR}}</p>
            <p>
                <b>Contributor Rating:</b>{{this.data.profileCR}}</p>
            <h4>Events:</h4>
            <eventdiv v-if="showEvent" v-bind:event="event"></eventdiv>
            <button v-if="showEvent" v-on:click='showEvent = !showEvent'> Close Event</button>
            <ul v-if="!showEvent">

                <li v-for="event in this.data.events" v-bind:key="event.id" v-on:click="sEvent(event)">
                    {{event.Name}}
                </li>

            </ul>
        </div>

    </div>
</template>

<script>
// Imports
import eventdiv from './event.vue'
export default {
    components: {
        eventdiv: eventdiv,
    },
    data() {
        return {
            event: '',
            showEvent: false,
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
                this.data.profileName = response.body.Name;
                this.data.profileCity = response.body.City;
                this.data.profileEmail = response.body.Email;
                this.data.profileHR = response.body.hostRating;
                this.data.profileCR = response.body.contributorRating;
            });
        this.$http.get('/userevents')
            .then(function(response) {
                this.data.events = response.body;
            })
    },
    methods: {
        sEvent(clickedEvent) {
            this.event = clickedEvent
            this.showEvent = !this.showEvent;
        }

    }
}
</script>

<style scoped>

</style>