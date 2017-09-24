<template>
    <b-jumbotron header="New Event">
      
<b-row>
    <b-col cols='6'>
        <b-form>
            <label>Event Name:</label>
            <b-form-input type="text" v-model="eventData.name" placeholder="Event Name"></b-form-input>
                <br/>
            <label>Event Data:</label>
            <b-form-input type="date" v-model="eventData.time" placeholder="Event Time"></b-form-input>
                <br/>
            <label>Event Time:</label>
            <b-form-input type="time" v-model="eventData.time" placeholder="Event Time"></b-form-input>
                <br/>
            <label>Event Location:</label>
            <b-form-input type="text" v-model="eventData.location" placeholder="Event location"></b-form-input>
                <br/>
            <label>Recipe lookup</label>
            <b-form-input type='text' v-model="food" placeholder="Recipe lookup"></b-form-input>
            <b-button @click.prevent="lookUp">Recipe lookUp</b-button>
            <b-button @click.prevent="create">Create Event</b-button>
        </b-form>
    </b-col>
    <b-col >
        <recipes v-if="populateList" v-bind:meals="meals" v-bind:populateList="populateList" v-on:hideList="hideList($event)"></recipes>
        <div v-if="showMeal">
         <p>Your meal: {{showSelection.label}}</p>
        <img v-bind:src="showSelection.image"/>
        </div>
    </b-col>
</b-row>
<!-- <b-row>
    <recipes v-if="populateList" v-bind:meals="meals" v-bind:populateList="populateList" v-on:hideList="hideList($event)"></recipes>
</b-row> -->
    </b-jumbotron>
</template>
<script>
// Imports
import recipes from './recipes.vue';
import chat from './chatBox.vue';
export default {
    components: {
        'recipes': recipes,
        chat: chat,
    },
    data() {
        return {
            showMeal: false,
            showSelection: '',
            food: '',
            populateList: false,
            meals: [],
            showModal: false,
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
            this.$http.post('/create', this.eventData, {
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
            this.showMeal = true;
            this.populateList = change[0];
            this.eventData.meal = change[1].uri.split('#')[1];
            this.food = change[1].label;
            this.showSelection = change[1];

        }
    }
}
</script>

<style >

</style>