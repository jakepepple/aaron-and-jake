<template>
    <div id="app">
         <form>
            <label>Recipe lookup</label>
            <input type='text' v-model="food" placeholder="meal lookup">
            <button @click.prevent="lookUp">lookUp</button>
        </form>
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
         <div v-if="list">
            <img v-bind:src="this.recipes[0].recipe.image">
            <p>Dish: {{this.recipes[0].recipe.label}}</p>
            <p>Ingredients: {{this.recipes[0].recipe.ingredientLines}}</p>
            <ul>
                <li v-for="it in this.recipes[0].recipe.ingredientLines">{{it}}</li>
            </ul>
           <p> <a v-bind:href="this.recipes[0].recipe.shareAs">click me</a> </p>
        </div>
    </div>
</template>

<script>
// Imports
export default {
    data() {
        return {
            food: '',
            list: false,
            recipe: '',
            recipes: '',
            eventData:{
                name: '',
                time: '',
                location: '',
                meals: ''
            }
        }    
    },
    methods: {
        create: function() {
            this.$http.post('http://jsonplaceholder.typicode.com/posts', {
                name: this.eventData.name,
                time: this.eventData.time,
                location: this.eventData.location,
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
                    params:{
                        q: this.food
                    },
                    headers: {
                        app_id: 'e4a1bc0f',
                        app_key: '19aa09f1b7b01b5afa733a72bdef0873',
                    }
                }
                ).then(function(response) {
                    this.list = true;
                this.recipes = response.body.hits
            })

        }
    }
}
</script>

<style >

</style>