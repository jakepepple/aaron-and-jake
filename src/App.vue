<template>
  <div id="app" >
    <div class="topnav" id="myTopnav">
      <router-link to="/home"  >Home</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/login">Login/signup</router-link>
      <router-link to="/browse">Browse</router-link>
       <router-link to="/create">Create</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import login from './components/login.vue';

export default {
  // components: {
  //   'login': login

  // },
  data() {
    return {
      styleObject: {
                'color': "yellow"
            }
    
    }
  },
  
}
</script>

<style>

.topnav {
    background-color: #333;
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
    background-color: #ddd;
    color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
    background-color: #4CAF50;
    color: white;
}
</style>