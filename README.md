# maven-semantic-release

This is a simple plugin that allows users to increase versions in `pom.xml` and publish via maven, either with the `deploy` or the `jib:build` target. 

It has an option to increase the version after release to the next snapshot version

It only assures that the `mvn` command exists.

Was inspired by https://github.com/conveyal/maven-semantic-release.

## Getting started

* `npm i -D semantic-release @terrestris/maven-semantic-release`
* Add `@terrestris/maven-semantic-release` as a plugin (https://semantic-release.gitbook.io/semantic-release/usage/plugins)
* Configure `settingsPath` or ensure that a maven settings file exists at the expected location
* Make sure that the `@semantic-release/git` plugin runs after this plugin and includes the `pom.xml` if you want to use it.

## [Options](OPTIONS.md)
