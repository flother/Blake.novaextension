const Violation = require("./Violation");


class Flake8Process {

    constructor() {
        this.violations = [];
    }

    async process(commandArguments) {
        let flake8Path = nova.workspace.config.get("is.flother.Blake.flake8ExecutablePath");
        if (!flake8Path) {
            flake8Path = "/usr/bin/env";
            commandArguments = ["flake8", ...commandArguments];
        }
        return new Process(
            flake8Path,
            {
                args: commandArguments,
                shell: true,
                stdio: ["ignore", "pipe", "pipe"]
            }
        );
    }

    async execute(path) {
        this.violations = [];
        const defaultArguments = [
            path
        ];

        const process = await this.process(defaultArguments);
        if (!process) return;
        process.onStdout(this.handleOutput.bind(this));
        process.onStderr(this.handleError.bind(this));

        process.start();
    }

    handleError(error) {
        console.error(error);
    }

    handleOutput(output) {
        this.violations.push(new Violation(output));

        if (this._onCompleteCallback) {
            this._onCompleteCallback(this.violations);
        }
    }

    onComplete(callback) {
        this._onCompleteCallback = callback;
    }

}

module.exports = Flake8Process;