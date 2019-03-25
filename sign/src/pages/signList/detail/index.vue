<template>
    <div>detail</div>
</template>

<script>
export default {
  onLoad () {
    this.id = option.id
    this.view = option.view || false
  },
  onShareAppMessage () {
    return {
      title: 'this.info',
      path: '/pages/sign/detail?view=1$id='+this.id,
      imageUrl: 'url',
      success: res => {},
      fail: () => {},
      complete: () => {}
    }
  }
}
</script>

<style>

</style>
