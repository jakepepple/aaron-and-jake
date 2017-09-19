<template>
    <div id="Create">
        <form>
            <label>Create Event</label><br/>
            <label>Event Name:</label>
            <input type="text" v-model="eventData.name" placeholder="Event Name"><br/>
            <label>Event Time:</label>
            <input type="text" v-model="eventData.time" placeholder="Event Time"><br/>
            <label>Event Location:</label>
            <input type="text" v-model="eventData.location" placeholder="Event Location"><br/>
            <label>Event Meal:</label>
            <input type="text" v-model="eventData.meal" placeholder="Event Meal"><br/>
            <button @click.prevent="create">Create Event</button>
            

        </form>

    </div>
</template>

<script>
// Imports
export default {
    data() {
        return {
            eventData:{
                name: '',
                time: '',
                location: '',
                meal: ''
            }
        }    
    },
    methods: {
        create: function() {
            this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                name: this.eventData.name,
                time: this.eventData.time,
                location: this.eventData.location,
                meal: this.eventData.meal
            }).then(function(response) {
                console.log(response.body)
                console.log(response.status)
                console.log(response)
            })
        },
    }
}
</script>

<style >

</style>