# maven-semantic-release

This is a simple plugin that allows users to increase versions in `pom.xml` and publish via maven, either with the `deploy` or the `jib:build` target. 

It has an option to increase the version after release to the next snapshot version

It only assures that the `mvn` command exists.

Was inspired by https://github.com/conveyal/maven-semantic-release.

## Getting started

* Install `semantic-release` and add `@terrestris/maven-semantic-release` as a plugin (https://semantic-release.gitbook.io/semantic-release/usage/plugins)
* Configure `mavenSettingsPath` or ensure that a maven settings file exists at the expected location
* Make sure that the `@semantic-release/git` plugin runs after this plugin and includes the `pom.xml` if you want to use it.

## Options

* `settingsPath`: path to a maven settings file (default: `'.m2/settings.xml'`)
* `deployMethod`: either `'deploy'` or `'jib'`. This determines which mvn targets are used to deploy. `deploy` uses the `deploy` target and `jib` uses `package jib:build` (default: `'deploy'`)
* `updateSnapshotVersion`: either `true` or `false`. Whether a new snapshot version should be set after releasing. (default: `false`)
* `snapshotCommitMessage`: the commit message used if a new snapshot version should be created (default: `'chore: setting next snapshot version [skip ci]'`)
