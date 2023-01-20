const Violation = require("./Violation");

class Flake8Process {
  constructor() {
    this.violations = [];
    this.stdErrorOutput = "";
  }

  async process(commandArguments) {
    let flake8Path = nova.workspace.config.get("is.flother.Blake.flake8ExecutablePath");
    if (!flake8Path) {
      flake8Path = "/usr/bin/env";
      commandArguments = ["flake8", ...commandArguments];
    }
    return new Process(flake8Path, {
      args: commandArguments,
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

  didExit(exitStatus) {
    if (this.stdErrorOutput) {
      let request = new NotificationRequest("blake-flake8-error");
      request.title = nova.localize("Flake8 error");
      request.body = nova.localize(this.stdErrorOutput);
      request.actions = [nova.localize("OK")];
      let promise = nova.notifications.add(request);
      promise.then(
        (reply) => {},
        (error) => {
          console.error(error);
        },
      );
    }
    this._onCompleteCallback(this.violations);
  }

  onComplete(callback) {
    this._onCompleteCallback = callback;
  }
}

module.exports = Flake8Process;
