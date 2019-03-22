<template>
  <div class="wrap">
    <header>
        <span :class="active===index?'active':''" v-for="(item, index) in types" :key="index" @click="updataState({active:index})">{{item}}</span>
    </header>
    <sList :list="list"></sList>
  </div>
</template>

<script>
import {getLocation, getAuth} from '@/utils/index.js'
import sList from '../../components/slist.vue'
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  data () {
    return {
     types:['全部面试','未面试','已面试','已放弃']
    }
  },
  components: {
    sList
  },
  computed: {
    ...mapState({
      active: state=> state.sign.active,
      list: state=> state.sign.list
    })
  },

  methods: {
    ...mapMutations({
      updataState: 'sign/updataState'
    }),
    ...mapActions({
      getList: 'sign/getList'
    })
  },

  onShow() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
header{
  background: #F4F6F9;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
 
  display: flex;
  align-items: center;
  span{
    flex: 1;
    text-align: center;
  }
  span.active{
    border-bottom:5rpx solid skyblue; 
  }
}
</style>
