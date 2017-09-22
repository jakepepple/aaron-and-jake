<template>
    <div id="Event">
         <div id="app">
  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <!-- use the modal component, pass in the prop -->
  <chat v-if="showModal" @close="showModal = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">custom header</h3>
  </chat>
</div>
        <p>Host: {{event.Host}}</p>
        <p>Party Name: {{event.name}}</p>
        <p>Reciepe: {{event.RecipeID}}</p>
        <p>Lat: {{event.LocationLat}}</p>
        <p>Lng: {{event.LocationLng}}</p>
        <p>Time: {{event.Time}}</p>

       
    </div>
</template>

<script>
// Imports
import chat from './chatBox.vue';
export default {
     components: {
        chat: chat,
    },
    props: ['event'],
    data () {
        return {
            showModal: false,
            data: {
                name: 'test Page'
            }
            
            
        }
    },
    
}
</script>

<style scoped>

</style>