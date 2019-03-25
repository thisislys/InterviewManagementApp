<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
      <p>{{item.company}}</p>
      <p>{{item.address.address}}</p>
      <p>{{item.start_time}}</p>
    </li>
  </ul>
</template>

<script>
const moment = require('moment')
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  // },
  // methods: {
  //   formatAddress(adress) {
  //     address = JSON.parse(address);
  //     return address.address
  //   },
  //   formatTime (start_time) {
  //     return moment(start_time*1000).format('YYYY-MM-DD HH:MM')
  //   }
  },
  methods: {
    goDetail () {
      wx.navigateTo({
        url: '../signList/detail/main?id='+1
      })
    }
  }
}
</script>

<style>
ul{
    width:100%;
}
</style>
