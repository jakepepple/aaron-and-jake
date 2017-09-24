<template>
    <div id='recipes'>
        <ul>
            <li v-for="meal in meals" v-bind:key="meal.id" v-bind:data="meal.recipe.uri">
                <a v-bind:href="meal.recipe.shareAs" target="_blank">
                    <img v-bind:src="meal.recipe.image">
                </a><br/> 
                {{meal.recipe.label}}<br/>
                <ul>
                    <li v-for="Ingredient in meal.recipe.ingredientLines" v-bind:key="Ingredient.id">
                        {{Ingredient}}
                    </li>
                </ul>
                <b-btn v-on:click="mealSelected(meal.recipe)" >This is the meal for me</b-btn>
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
            // this.mealId = id.split('#')[1]
            // console.log(this.mealId)
            this.$emit('hideList', [false, id])
            

        }

    }
}
</script>

<style >

</style>