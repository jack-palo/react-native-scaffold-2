module.exports = {
  default: `--require-module @babel/register --format-options '{"snippetInterface": "synchronous"}' --format @cucumber/pretty-formatter`,
  require: ['./features/step_definitions/*.js'],
}
