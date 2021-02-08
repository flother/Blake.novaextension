class BlackProcess {

    constructor() {
        this.stdOutOutput = "";
        this.stdErrorOutput = "";
    }

    async process() {
        let blackPath = nova.workspace.config.get("is.flother.Blake.blackExecutablePath");
        let commandArguments = ["--quiet", "-"];
        if (!blackPath) {
            blackPath = "/usr/bin/env";
            commandArguments = ["black", ...commandArguments];
        }
        return new Process(
            blackPath,
            {
                args: commandArguments,
                shell: true,
                stdio: "pipe"
            }
        );
    }

    async execute(content) {
        this.stdOutOutput = "";
        this.stdErrorOutput = "";

        const process = await this.process();
        if (!process) return;

        process.onStdout(this.handleOutput.bind(this));
        process.onStderr(this.handleError.bind(this));
        process.onDidExit(this.didExit.bind(this));

        process.start();

        const writer = process.stdin.getWriter();
        writer.ready.then(() => {
            writer.write(content);
            writer.close();
        });
    }

    handleError(error) {
        this.stdErrorOutput += error;
    }

    handleOutput(output) {
        this.stdOutOutput += output;
    }

    didExit(exitStatus) {
        if (this.stdErrorOutput) {
            if (this.stdErrorOutput) {
                let request = new NotificationRequest("blake-black-error");
                request.title = nova.localize("Black error");
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
        }
        this._onCompleteCallback(this.stdOutOutput);
    }

    onComplete(callback) {
        this._onCompleteCallback = callback;
    }

}

module.exports = BlackProcess;