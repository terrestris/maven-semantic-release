# maven-semantic-release

This is a simple plugin that allows users to increase versions in `pom.xml` and publish via maven, either with the `deploy` or the `jib:build` target. 

It has an option to increase the version after release to the next snapshot version

It only assures that the `mvn` command exists.

Was inspired by https://github.com/conveyal/maven-semantic-release. It differs in some ways. It …
* … allows different maven targets.
* … has an option to allow multimodule projects
* … can increase a snapshot version after a successful release
* … has fewer checks to verify th integrity of the setup (does not check `pom.xml`)

## Getting started

* `npm i -D semantic-release @terrestris/maven-semantic-release`
* Add `@terrestris/maven-semantic-release` as a plugin (https://semantic-release.gitbook.io/semantic-release/usage/plugins)
* Configure `settingsPath` or ensure that a maven settings file exists at the expected location
* Make sure that the `@semantic-release/git` plugin runs after this plugin and includes the `pom.xml` if you want to use it.

## Options

<!-- AUTO_GENERATED_OPTIONS -->
<a name="PluginConfig"></a>

## PluginConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [settingsPath] | <code>string</code> | <code>&quot;&#x27;.m2/settings.xml&#x27;&quot;</code> | Path to a maven settings file. |
| [processAllModules] | <code>boolean</code> | <code>false</code> | This sets the `processAllModules` option for the `versions:set` target. It is useful for multimodule projects. |
| [mavenTarget] | <code>&#x27;deploy&#x27;</code> | <code>&#x27;package jib:build&#x27;</code> | <code>&#x27;deploy jib:build&#x27;</code> | <code>&#x27;deploy&#x27;</code> | This determines which mvn targets are used to publish. |
| [clean] | <code>boolean</code> | <code>true</code> | Whether the `clean` target will be applied before publishing. |
| [updateSnapshotVersion] | <code>boolean</code> | <code>false</code> | Whether a new snapshot version should be set after releasing. |
| [snapshotCommitMessage] | <code>string</code> | <code>&quot;&#x27;chore: setting next snapshot version [skip ci]&#x27;&quot;</code> | The commit message used if a new snapshot version should be created. |
| [debug] | <code>boolean</code> | <code>false</code> | Sets the `-X` option for all maven calls. |
<!-- AUTO_GENERATED_OPTIONS -->
