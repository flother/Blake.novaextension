const Linter = require("./Linter");
const Formatter = require("./Formatter");

exports.activate = () => {
  const linter = new Linter();
  const formatter = new Formatter();

  nova.workspace.onDidAddTextEditor(editor => {
    const { document } = editor;

    if (document.syntax !== "python") {
      return;
    }

    linter.lintDocument(document);

    editor.onDidSave(() => linter.lintDocument(document));
    document.onDidChangeSyntax(linter.lintDocument);
    editor.onWillSave(ed => {
      const formatOnSave =
        nova.workspace.config.get("is.flother.Blake.formatOnSave") ||
        nova.config.get("is.flother.Blake.formatOnSave");
      if (formatOnSave) {
        return formatter.format(ed);
      }
      return null;
    });

    editor.onDidDestroy(destroyedEditor => {
      const anotherEditor = nova.workspace.textEditors.find(
        ed => ed.document.path === destroyedEditor.document.path
      );
      if (!anotherEditor) {
        linter.removeIssues(destroyedEditor.document.uri);
      }
    });
  });

  nova.commands.register("formatSourceCodeWithBlack", editor => formatter.format(editor));
};
