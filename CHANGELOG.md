## Version 0.6.0

**Released 20th January 2023**

- Refactor for asynchronous saving (see [#4](https://github.com/flother/Blake.novaextension/pull/4))
- Add per-project setting for setting maximum line length

## Version 0.5.1

**Released 1st June 2021**

- Bug fix: improve detection of Flake8 config (commit [`f1404e9c`](https://github.com/flother/Blake.novaextension/commit/f1404e9c718c89d761b8b3843a3c60cf73f41035) and [PR #2](https://github.com/flother/Blake.novaextension/pull/2))

## Version 0.5.0

**Released 8th February 2021**

- Bug fix: fail gracefully when the Black or Flake8 Python libraries aren't available ([`f35f2d27`](https://github.com/flother/Blake.novaextension/commit/f35f2d278c162fc89b0483f63dc2e5c8c6f334cb))
- Improvement: document "Format Source Code with Black" menu item ([`7053ac08`](https://github.com/flother/Blake.novaextension/commit/7053ac0893895f563eaa319c0b069d0a33b23434))

## Version 0.4.2

**Released 27th September 2020**

- Add the extension to the formatters category
- Clarify docs on using Flake8 plugins

## Version 0.4.1

**Released 26th September 2020**

- Update installation instructions

## Version 0.4.0

**Released 26th September 2020**

- Remove trailing comma in extension manifest
- Add instructions for installing from GitHub
- Update GitHub URLs in extension manifest
- Fix minor grammar error in extension description
- Move extension code up to top level of repo

## Version 0.3.0

**Released 22nd September 2020**

- Add support for using [Black](https://black.readthedocs.io/) to format Python code
- Log Flake8 stderr output as single console string
- Move `.gitignore` to the root of the repo

## Version 0.2.0

**Released 21st September 2020**

- Explain in README how to use Flake8 plugins if you install it via Pipx
- Fix bug where the last issue wasn't removed from the list after it was fixed
- Remove unused code that streams from stdin

## Version 0.1.0

**Released 20th September 2020**

Initial public release.
