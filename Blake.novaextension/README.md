Blake: a [Nova](https://nova.app/) extension for linting your Python source code with [Flake8](https://flake8.pycqa.org/).

Blake runs Flake8 when you save a Python file, and reports any warnings and errors in [Nova's issues sidebar](https://library.panic.com/nova/sidebar/).

# Prerequisites

Before using Blake you need to install Flake8. The recommended method is to use [Homebrew](https://brew.sh) and [Pipx](https://pipxproject.github.io/pipx/).

1. [Install Homebrew](https://brew.sh)
2. [Install Pipx](https://pipxproject.github.io/pipx/installation/#install-pipx)
3. Install Flake8: `pipx install flake8`

If everything goes to plan, the `flake8` CLI will be available globally.

# Preferences

By default, Flake8 will be run using `/usr/bin/env flake8`. However, you can configure this per project (Select _Project Settings..._ from the _Project_ menu, and look for the Blake environment).

You can [configure Flake8](https://flake8.pycqa.org/en/latest/user/configuration.html) in the usual manner.
