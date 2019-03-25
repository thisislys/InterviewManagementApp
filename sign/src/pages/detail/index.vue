<template>
  <div class="wrap">我是详情</div>
</template>

<script>
import { getLocation, getAuth } from "@/utils/index.js";
import sList from "../../components/slist.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    sList
  },
  computed: {
    // ...mapState({
    //   active: state => state.sign.active,
    //   list: state => state.sign.list,
    //   page: state => state.sign.list,
    //   hasMore: state => state.sign.hasMore
    // })
  },

  methods: {
    // ...mapMutations({
    //   updataState: "sign/updataState"
    // }),
    // ...mapActions({
    //   getList: "sign/getList"
    // }),
    // tabChange(index) {
    //   this.updataState({ active: index, page: 1 });
    //   this.getList();
    // }
  },
  onLoad(options) {
    console.log(options.id,'............');
  },
  onShow() {
    // this.getList();
  },
  onReachBottom() {
    // if (this.hasMore) {
    //   this.updataState({ page: this.page + 1 });
    //   this.getList();
    // }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
}
</style>
