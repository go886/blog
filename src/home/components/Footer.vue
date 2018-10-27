<template>
  <div class="root">
      Copyright © 2018. All Rights Reserved.
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin-left: 100px;
  margin-right: 100px; */
  min-width: 40%;
  border-top: 1px solid #efeaea;
  color: #333;
}
</style>
