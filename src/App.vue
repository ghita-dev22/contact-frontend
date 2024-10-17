<template>
  <div>
    <HeaderNav title="GS" />
  </div>
  <router-view></router-view>
</template>
<script>
import HeaderNav from "@/components/HeaderNav";
export default {
  name: "App",
  components: {
    HeaderNav,
  },
};
</script>

<style></style>
