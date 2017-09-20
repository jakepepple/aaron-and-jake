<template>
    <div id='recipes'>
        <ul>
            <li v-for="meal in meals" v-bind:data="meal.recipe.uri">
                <a v-bind:href="meal.recipe.shareAs" target="_blank">
                    <img v-bind:src="meal.recipe.image">
                </a><br/> 
                {{meal.recipe.label}}<br/>
                <ul>
                    <li v-for="Ingredient in meal.recipe.ingredientLines">
                        {{Ingredient}}
                    </li>
                </ul>
                <button v-on:click="mealSelected(meal.recipe.uri)" >This is the meal for me</button>
            </li>
        </ul>
    </div>
</template>

<script>
// Imports
export default {
    props: ['meals', 'populateList'],
    data() {
        return {
            mealId: ''

        }
    },
    methods: {
        mealSelected(id){
            this.mealId = 'http://www.edamam.com/ontologies/edamam.owl%23' + id.split('#')[1]
            console.log(this.mealId)
            this.$emit('hideList', [false, this.mealId])
            

        }

    }
}
</script>

<style >

</style>