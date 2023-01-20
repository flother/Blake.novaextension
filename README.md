Blake: a [Nova](https://nova.app/) extension for linting your Python source code with [Flake8](https://flake8.pycqa.org/), and formatting your code with [Black](https://black.readthedocs.io/).

Blake runs Flake8 when you save a Python file, and reports any warnings and errors in [Nova's issues sidebar](https://library.panic.com/nova/sidebar/). You can also choose to format your code with Black every time you save, or just using the _Editor_ ➞ _Format Source Code with Black_ menu item whenever you wish (shortcut: ⌘⇧B).

# Prerequisites

Before using Blake you need to install Flake8 and Black. The recommended method is to use [Homebrew](https://brew.sh) and [Pipx](https://pipxproject.github.io/pipx/).

1. [Install Homebrew](https://brew.sh)
2. [Install Pipx](https://pipxproject.github.io/pipx/installation/#install-pipx)
3. Install Flake8: `pipx install flake8`
4. Install Black: `pipx install black`

If everything goes to plan, the `flake8` and `black` CLIs will be available globally.

If you do use Pipx to install Flake8 you can later install your favourite [Flake8 plugins](https://github.com/DmytroLitvinov/awesome-flake8-extensions) by [injecting them into the virtual environment](https://pipxproject.github.io/pipx/examples/#pipx-inject-example). For example, to install the [flake8-docstrings](https://gitlab.com/pycqa/flake8-docstrings) plugin: `pipx inject flake8 flake8-docstrings`. The extra warnings and violations provided by the plugin will be immediately and automatically available to both Blake and the `flake8` CLI.

# Installation

You can install Blake from [Nova's online extension library](https://extensions.panic.com/extensions/is.flother/is.flother.Blake/), or you can install it from within Nova itself (select _Extension Library..._ from the _Extensions_ menu and search for "blake").

If you want to install a version for development, clone [the GitHub repo](https://github.com/flother/Blake.novaextension), open the code in Nova, and select _Activate Project as Extension_ from the _Extensions_ menu. Any changes you make to the code will be reflected in the extension for the duration of your Nova session.

# Preferences

By default Flake8 will be run using `/usr/bin/env flake8`, and Black using `/usr/bin/env black`. However, you can configure this per project (Select _Project Settings..._ from the _Project_ menu, and look for the Blake environment). There's also a per-project setting to format your source files every time you save (off by default).

You can [configure Flake8](https://flake8.pycqa.org/en/latest/user/configuration.html) and [set your Black preferences](https://black.readthedocs.io/en/stable/usage_and_configuration/the_basics.html#configuration-via-a-file) in the usual manner.
