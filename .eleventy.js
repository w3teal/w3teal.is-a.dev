const { minify } = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", async function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return await minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });
};
