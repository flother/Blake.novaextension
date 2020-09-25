Blake: a [Nova](https://nova.app/) extension for linting your Python source code with [Flake8](https://flake8.pycqa.org/), and formatting your code with [Black](https://black.readthedocs.io/).

Blake runs Flake8 when you save a Python file, and reports any warnings and errors in [Nova's issues sidebar](https://library.panic.com/nova/sidebar/). You can also choose to format your code with Black every time you save, or just using ⌘⇧B whenever you wish.

# Prerequisites

Before using Blake you need to install Flake8 and Black. The recommended method is to use [Homebrew](https://brew.sh) and [Pipx](https://pipxproject.github.io/pipx/).

1. [Install Homebrew](https://brew.sh)
2. [Install Pipx](https://pipxproject.github.io/pipx/installation/#install-pipx)
3. Install Flake8: `pipx install flake8`
4. Install Black: `pipx install black`

If everything goes to plan, the `flake8` and `black` CLIs will be available globally.

If you do use Pipx to install Flake8 you can later install your favourite [Flake8 plugins](https://github.com/DmytroLitvinov/awesome-flake8-extensions) by [injecting them into the virtual environment](https://pipxproject.github.io/pipx/examples/#pipx-inject-example). For example, to install the [flake8-docstrings](https://gitlab.com/pycqa/flake8-docstrings) plugin: `pipx inject flake8 flake8-docstrings`. This is then automatically available when you run the `flake8` CLI.

# Installation

Installation will eventually be available through [Nova's extension library](https://extensions.panic.com), but currently there's a bug on Panic's server that's stopping it being released. Until it's fixed, you can clone this repo and then, in Finder, double-click on the repo folder. Nova will then open and ask you if you want to install the extension.

# Preferences

By default Flake8 will be run using `/usr/bin/env flake8`, and Black using `/usr/bin/env black`. However, you can configure this per project (Select _Project Settings..._ from the _Project_ menu, and look for the Blake environment). There's also a per-project setting to format your source files every time you save (off by default).

You can [configure Flake8](https://flake8.pycqa.org/en/latest/user/configuration.html) and [set your Black preferences](https://black.readthedocs.io/en/stable/pyproject_toml.html) in the usual manner.
