<template>
    <div id="app">
        <form>
            
        </form>
        <form>
            <label>Create Event</label><br/>
            <label>Event Name:</label>
            <input type="text" v-model="eventData.name" placeholder="Event Name"><br/>
            <label>Event Time:</label>
            <input type="text" v-model="eventData.time" placeholder="Event Time"><br/>
            <label>Event Location:</label>
            <input type="text" v-model="eventData.location" placeholder="Event Location"><br/>
            <label>Recipe lookup</label>
            <input type='text' v-model="food" placeholder="meal lookup">
            <button @click.prevent="lookUp">lookUp</button><br/>
            <button @click.prevent="create">Create Event</button>
        </form>

        <recipes v-if="populateList" v-bind:meals="meals" v-bind:populateList="populateList" v-on:hideList="hideList($event)"></recipes>
    </div>
</template>
<label>Create Event</label><br/>
<script>
// Imports
import recipes from './recipes.vue';
export default {
    components: {
        'recipes': recipes
    },
    data() {
        return {
            food: '',
            populateList: false,
            meals: [],
            eventData: {
                name: '',
                time: '',
                location: '',
                meal: ''
            }
        }
    },
    methods: {
        create: function() {
            this.$http.post('/create', {
                name: this.eventData.name,
                time: this.eventData.time,
                location: this.eventData.location,
                meal: this.eventData.meal
            }, {
                withCredentials: true,
            }).then(function(response) {
                this.array = response.body
                this.list = true
                console.log(response.status)
                console.log(response)
            })
        },
        lookUp: function() {
            this.$http.get('https://api.edamam.com/search',
                {
                    params: {
                        q: this.food
                    },
                    headers: {
                        app_id: 'e4a1bc0f',
                        app_key: '19aa09f1b7b01b5afa733a72bdef0873',
                    }
                }
            ).then(function(response) {
                this.populateList = true;
                this.meals = response.body.hits
            })

        },
        hideList(change) {
            this.populateList = change[0];
            this.eventData.meal = change[1]; 
        }
    }
}
</script>

<style >

</style>