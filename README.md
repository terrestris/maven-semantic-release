# maven-semantic-release

This plugin only runs two maven commands and is heavily inspired by https://github.com/conveyal/maven-semantic-release.

It does not do any checks, but only tries to increase the version number via `mvn` and then deploy to the configured repository.

## Getting started

* Install `semantic-release` and add `maven-semantic-release` as a plugin (https://semantic-release.gitbook.io/semantic-release/usage/plugins)
* Configure `mavenSettingsPath` or ensure that a maven settings file exists in the expected path
* Make sure that the `@semantic-release/git` plugin runs after this plugin and includes the `pom.xml` if you want to use it.

## Options

* `settingsPath`: path to a maven settings file (default: `'.m2/settings.xml'`)
* `deployMethod`: either `'deploy'` or `'jib'`. This determines which mvn targets are used to deploy. `deploy` uses the `deploy` target and `jib` uses `package jib:build` (default: `'deploy'`)
* `updateSnapshotVersion`: either `true` or `false`. Whether a new snapshot version should be set after releasing. (default: `false`)
