const BlackProcess = require("./BlackProcess");

class Formatter {

    constructor() {
        this.process = new BlackProcess();
    }

    format(editor) {
        if (editor.document.isEmpty) return;

        const textRange = new Range(0, editor.document.length);
        const content = editor.document.getTextInRange(textRange);
        this.process.onComplete((formattedContent) => {
            // If Black isn't installed, the existing code will be formatted as
            // a single space. If that's the case, we skip that step.
            if (formattedContent == content || formattedContent.trim() === "") return;
            editor.edit((edit) => {
               edit.replace(textRange, formattedContent);
            });
        });
        this.process.execute(content);
    }
}

module.exports = Formatter;