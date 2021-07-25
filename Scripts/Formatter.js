const BlackProcess = require("./BlackProcess");

class Formatter {
    constructor() {
        this.process = new BlackProcess();
    }

    notifyError(message) {
        let request = new NotificationRequest("blake-black-error");
        request.title = nova.localize("Black error");
        request.body = nova.localize(message);
        request.actions = [nova.localize("OK")];
        let promise = nova.notifications.add(request);
        promise.then(
            (reply) => {},
            (error) => {
                console.error(error);
            }
        );
    }

    format(editor) {
        if (editor.document.isEmpty) return;

        const textRange = new Range(0, editor.document.length);
        const content = editor.document.getTextInRange(textRange);
        return this.process
            .execute(content)
            .then((formattedContent) => {
                // If Black isn't installed, the existing code will be formatted as
                // a single space. If that's the case, we skip that step.
                const isChangedContent = formattedContent != content;
                const isNonEmptyContent = formattedContent.trim() !== "";
                if (isChangedContent && isNonEmptyContent) {
                    editor.edit((edit) => {
                        edit.replace(textRange, formattedContent);
                    });
                }
            })
            .catch(this.notifyError);
    }
}

module.exports = Formatter;
