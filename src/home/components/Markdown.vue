<template>
<div>
    <p class="markdown" v-html="md" />
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
      } catch (err) {
        err;
      }
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
export default {
  props: ["value", "summary"],
  components: {},
  computed: {
    md() {
      try {
        const html = String(this.$props.value);
        return md.render(html);
      } catch (error) {
        return "";
      }
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markdown {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* text-indent: 2em; */
  /* padding-left: 80px; */

  margin: 0 auto;
  font-family: "ubuntu", "Tahoma", "Microsoft YaHei", arial, sans-serif;
  color: #444444;
  line-height: 1;
  /* margin: 0px 50px 50px 80px; */
  /* padding: 0px 50px 50px 80px; */
  /* background-color: #666; */
  word-wrap: break-word;
}
.markdown >>> .hljs {
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  /* max-width: 630px; */
  display: flex;
  flex-direction: column;
  /* max-width: 650px; */
}

/* .markdown >>> .post-img {
  max-width: 70% !important;
  height: auto;
  display: block;
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
} */
.markdown >>> img {
  max-width: 75%;
  height: auto;
  display: block;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
@media screen and (min-width: 1000px) {
  body {
    width: 842px;
    margin: 10px auto;
  }
}
.markdown >>> h1,
.markdown >>> h2,
.markdown >>> h3,
.markdown >>> h4 {
  color: #111111;
  font-weight: 400;
  margin-top: 1em;
}

.markdown >>> h1,
.markdown >>> h2,
.markdown >>> h3,
.markdown >>> h4,
.markdown >>> h5 {
  font-family: Georgia, Palatino, serif;
}
.markdown >>> h1,
.markdown >>> h2,
.markdown >>> h3,
.markdown >>> h4,
.markdown >>> h5,
.markdown >>> dl {
  margin-bottom: 16px;
  padding: 0;
}

.markdown >>> p {
  margin-top: 8px;
  margin-bottom: 3px;
}
.markdown >>> h1 {
  font-size: 48px;
  line-height: 54px;
}
.markdown >>> h2 {
  font-size: 36px;
  line-height: 42px;
}
.markdown >>> h1,
.markdown >>> h2 {
  border-bottom: 1px solid #efeaea;
  padding-bottom: 10px;
}
.markdown >>> h3 {
  font-size: 24px;
  line-height: 30px;
}
.markdown >>> h4 {
  font-size: 21px;
  line-height: 26px;
}
.markdown >>> h5 {
  font-size: 18px;
  line-height: 23px;
}
.markdown >>> a {
  color: #0099ff;
  margin: 0 2px;
  padding: 0;
  vertical-align: baseline;
  text-decoration: none;
}
.markdown >>> a:hover {
  text-decoration: none;
  color: #ff6600;
}
.markdown >>> a:visited {
  color: purple;
}
.markdown >>> ul,
.markdown >>> ol {
  padding: 0;
  padding-left: 18px;
  margin: 0;
}
.markdown >>> li {
  line-height: 24px;
}
.markdown >>> p,
.markdown >>> ul,
.markdown >>> ol {
  font-size: 16px;
  line-height: 24px;
}

.markdown >>> ol ol,
.markdown >>> ul ol {
  list-style-type: lower-roman;
}

.markdown >>> code,
.markdown >>> pre {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  background-color: #f7f7f7;
  color: inherit;
}

.markdown >>> code {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  margin: 0 2px;
}

.markdown >>> pre {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  line-height: 1.7em;
  overflow: auto;
  padding: 6px 10px;
  border-left: 5px solid #6ce26c;
}

.markdown >>> pre > code {
  font-family: Consolas, Monaco, Andale Mono, monospace;
  border: 0;
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: 1.6em;
  font-size: 0.95em;
  white-space: pre;
  background: 0 0;
}

.markdown >>> code {
  color: #666555;
}

.markdown >>> aside {
  display: block;
  float: right;
  width: 390px;
}
.markdown >>> blockquote {
  border-left: 0.5em solid #eee;
  padding: 0 0 0 2em;
  margin-left: 0;
}
.markdown >>> blockquote cite {
  font-size: 14px;
  line-height: 20px;
  color: #bfbfbf;
}
.markdown >>> blockquote cite:before {
  content: "\2014 \00A0";
}

.markdown >>> blockquote p {
  color: #666;
}
.markdown >>> hr {
  text-align: left;
  color: #999;
  height: 2px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

.markdown >>> dl {
  padding: 0;
}

.markdown >>> dl .markdown >>> dt {
  padding: 10px 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

.markdown >>> dl .markdown >>> dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

.markdown >>> dd {
  margin-left: 0;
}

.markdown >>> table {
  *border-collapse: collapse; /* IE7 and lower */
  border-spacing: 0;
  /* width: 100%; */
  width: auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.markdown >>> table {
  border: solid #ccc 1px;
}

.markdown >>> table thead {
  background: #f7f7f7;
}

.markdown >>> table thead tr:hover {
  background: #f7f7f7;
}
.markdown >>> table tr:hover {
  background: #fbf8e9;
  -o-transition: all 0.1s ease-in-out;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.markdown >>> table td,
.markdown >>> .table th {
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.markdown >>> table th {
  border-top: none;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-left: 1px solid #ccc;
}

.markdown >>> table td:first-child,
.markdown >>> table th:first-child {
  border-left: none;
}
</style>
