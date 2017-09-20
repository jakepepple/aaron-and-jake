<template>
    <div id='recipes'>
        <ul>
            <li v-for="meal in meals">
                <img v-bind:src="meal.recipe.image"><br/> {{meal.recipe.label}}
                <br/>
                <ul>
                    <li v-for="Ingredient in meal.recipe.ingredientLines">
                        {{Ingredient}}
                    </li>
                </ul>
                {{meal.recipe.shareAs}}<br/>

            </li>
        </ul>
    </div>
</template>

<script>
// Imports
export default {
    props: ['meals'],
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style >

</style>