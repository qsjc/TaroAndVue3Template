module.exports = {
  extends: "plugin:vue/vue3-recommended",
  rules: {
    "vue/component-definition-name-casing": [ "error", "PascalCase" ],
    "vue/multi-word-component-names": [ "error", {
        ignores: [ "Index" ]
      }
    ],
    "vue/max-attributes-per-line": [ "error", {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    "quotes": [ 2, "double" ],
    "object-curly-spacing": [ "error", "always" ],
    "array-bracket-spacing": [ "error", "always" ],
    "semi": [ "error", "never" ]
  }
}
