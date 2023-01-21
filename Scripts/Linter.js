const Flake8Process = require("./Flake8Process");

class Linter {
  constructor() {
    this.issues = new IssueCollection();
    this.process = new Flake8Process();
  }

  async lintDocument(document) {
    this.process.onComplete(violations => {
      this.issues.set(
        document.uri,
        violations.map(violation => violation.issue)
      );
    });
    this.process.execute(document.path);
  }

  removeIssues(uri) {
    this.issues.remove(uri);
  }
}

module.exports = Linter;
