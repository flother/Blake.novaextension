class BlackProcess {
  constructor() {
    this.stdOutOutput = "";
    this.stdErrorOutput = "";
  }

  process() {
    let blackPath =
      nova.workspace.config.get("is.flother.Blake.blackExecutablePath") ??
      nova.config.get("is.flother.Blake.blackExecutablePath");
    const maxLineLength =
      nova.workspace.config.get("is.flother.Blake.maxLineLength") ??
      nova.config.get("is.flother.Blake.maxLineLength");
    let commandArguments = ["--quiet", "-"];
    if (maxLineLength) {
      commandArguments = ["--line-length", maxLineLength.toString(), ...commandArguments];
    }
    if (!blackPath) {
      blackPath = "/usr/bin/env";
      commandArguments = ["black", ...commandArguments];
    }
    return new Process(blackPath, {
      args: commandArguments,
      shell: true,
      stdio: "pipe",
    });
  }

  execute(content) {
    return new Promise((resolve, reject) => {
      this.stdOutOutput = "";
      this.stdErrorOutput = "";

      const process = this.process();
      if (!process) {
        return;
      }

      process.onStdout(this.handleOutput.bind(this));
      process.onStderr(this.handleError.bind(this));
      process.onDidExit(status => {
        if (status === 0) {
          resolve(this.stdOutOutput);
        } else {
          reject(this.stdErrorOutput);
        }
      });

      process.start();

      const writer = process.stdin.getWriter();
      writer.ready.then(() => {
        writer.write(content);
        writer.close();
      });
    });
  }

  handleError(error) {
    this.stdErrorOutput += error;
  }

  handleOutput(output) {
    this.stdOutOutput += output;
  }
}

module.exports = BlackProcess;
