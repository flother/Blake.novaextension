const Violation = require("./Violation");


class Flake8Process {

    constructor() {
        this.violations = [];
    }

    async process(commandArguments) {
        let flake8Path = nova.workspace.config.get("flother.Blake.flake8ExecutablePath");
        if (!flake8Path) {
            flake8Path = "/usr/bin/env";
            commandArguments = ["flake8", ...commandArguments];
        }
        return new Process(
            flake8Path,
            {
                args: commandArguments,
                cwd: nova.workspace.path,
                env: {},
                shell: true,
                stdio: "pipe"
            }
        );
    }

    async execute(content, path) {
        this.violations = [];
        const defaultArguments = [
            path
        ];

        const process = await this.process(defaultArguments);
        if (!process) return;

        process.onStdout(this.handleOutput.bind(this));
        process.onStderr(this.handleError.bind(this));

        process.start();

        const writer = process.stdin.getWriter();
        writer.ready.then(() => {
            writer.write(content);
            writer.close();
        });
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