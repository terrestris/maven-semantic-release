# maven-semantic-release

This plugin only runs two maven commands and is heavily inspired by https://github.com/conveyal/maven-semantic-release.

It does not do any checks, but only tries to increase the version number via `mvn` and then deploy to the configured repository.

It needs a maven settings file which is by default `.m2/settings.xml` or can be configured via the option `mavenSettingsPath`.
