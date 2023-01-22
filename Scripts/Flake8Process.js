const Violation = require("./Violation");

class Flake8Process {
  constructor() {
    this.violations = [];
    this.stdErrorOutput = "";
  }

  async process(commandArguments) {
    let flake8Path = nova.workspace.config.get("is.flother.Blake.flake8ExecutablePath");
    const maxLineLength = nova.workspace.config.get("is.flother.Blake.maxLineLength");
    let args = commandArguments;
    if (maxLineLength) {
      args = ["--max-line-length", maxLineLength.toString(), ...args];
    }
    if (!flake8Path) {
      flake8Path = "/usr/bin/env";
      args = ["flake8", ...args];
    }
    return new Process(flake8Path, {
      args,
      cwd: nova.workspace.path,
      shell: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
  }

  async execute(path) {
    this.violations = [];
    this.stdErrorOutput = "";
    const defaultArguments = [path];

    const process = await this.process(defaultArguments);
    if (!process) {
      return;
    }
    process.onStdout(this.handleOutput.bind(this));
    process.onStderr(this.handleError.bind(this));
    process.onDidExit(this.didExit.bind(this));

    process.start();
  }

  handleError(error) {
    this.stdErrorOutput += error;
  }

  handleOutput(output) {
    this.violations.push(new Violation(output));
  }

  didExit() {
    if (this.stdErrorOutput) {
      const request = new NotificationRequest("blake-flake8-error");
      request.title = nova.localize("Flake8 error");
      request.body = nova.localize(this.stdErrorOutput);
      request.actions = [nova.localize("OK")];
      const promise = nova.notifications.add(request);
      promise.then(
        () => { },
        error => {
          // eslint-disable-next-line no-console -- Last ditch attempt to put the error somewhere.
          console.error(error);
        }
      );
    }
    this.onCompleteCallback(this.violations);
  }

  onComplete(callback) {
    this.onCompleteCallback = callback;
  }
}

module.exports = Flake8Process;
