const Linter = require("./Linter");
const Formatter = require("./Formatter");

exports.activate = function () {
    const linter = new Linter();
    const formatter = new Formatter();

    nova.workspace.onDidAddTextEditor((editor) => {
        const document = editor.document;

        if (document.syntax != "python") return;

        linter.lintDocument(document);

        editor.onDidSave((editor) => linter.lintDocument(document));
        document.onDidChangeSyntax((document) => linter.lintDocument(document));
        editor.onWillSave((editor) => {
            const formatOnSave = nova.workspace.config.get("is.flother.Blake.formatOnSave");
            if (formatOnSave) return formatter.format(editor);
        });

        editor.onDidDestroy((destroyedEditor) => {
            let anotherEditor = nova.workspace.textEditors.find((editor) => {
                return editor.document.path === destroyedEditor.document.path;
            });
            if (!anotherEditor) {
                linter.removeIssues(destroyedEditor.document.uri);
            }
        });
    });

    nova.commands.register("formatSourceCodeWithBlack", (editor) => formatter.format(editor));
};
