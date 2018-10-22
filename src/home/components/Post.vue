<template>
  <div class="root">
      <div class="header">
        <div class="title">{{post.title}}</div>
        <i class="el-icon-date date">
          <div class='tool-text' style="margin-left:7px;">{{gmtDateFormatter(post.add_time)}}</div>
        </i>
      </div>
      <div class="markdown" v-html="markDownToHtml(post.content)">
      </div>
  </div>
</template>

<script>
import hljs from "highlight.js"; // https://highlightjs.org/
import "highlight.js/styles/monokai.css";
import mili from "markdown-it-linkify-images";

// Actual default values
const md = require("markdown-it")({
  html: true,
  prefix: "code-",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});
md.use(mili, {
  target: "_blank",
  linkClass: "post-link",
  imgClass: "post-img",
  pClass: "post-p"
});

import moment from "moment";
export default {
  data() {
    return {
      post: {}
    };
  },
  created() {
    this.load();
  },
  methods: {
    gmtDateFormatter(time) {
      return moment(time).format("YYYY/MM/DD");
    },
    markDownToHtml(txt) {
      return md.render(txt);
    },
    load() {
      this.$http("/api/article/get", {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (!res.error) {
          this.post = res;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 80px; */
  background-color: aliceblue;
  padding: 10px;
}
.title {
  font-size: 32px;
  line-height: 32px;
  /* padding: 10px; */
}
.date {
  font-size: 11px;
  color: #999;
  display: flex;
  flex-direction: row;
  margin: 10px;
}
.markdown {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* text-indent: 2em; */
  padding-left: 100px;
}
.markdown >>> .post-img {
  max-width: 70% !important;
  height: auto;
  display: block;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.markdown >>> .hljs {
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.markdown >>> p {
  padding: 0;
  margin: 0;
}
.markdown >>> p code {
  background-color: rgba(0, 0, 0, 0.06);
  padding: 0 2px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 2px 2px;
}
.markdown >>> a {
  color: #0366d6;
}
</style>

<style>
</style>
