class Violation {
  constructor(line) {
    // Flake 8 codes that warrant `IssueSeverity.Error`, borrowed from
    // SublimeLinter-flake8.
    // https://github.com/SublimeLinter/SublimeLinter-flake8/blob/50d4792a3beb25ccad0d60c70f1b673a14556f79/linter.py#L24-L41
    this.errorCodes = [
      "F402",
      "F404",
      "F812",
      "F823",
      "F831",
      "F821",
      "F822",
      "E112",
      "E113",
      "E901",
      "E902",
      "E999",
    ];

    const lineData = this.parseLine(line);
    this.code = lineData.code;
    this.message = lineData.message;
    this.col = lineData.col;
    this.row = lineData.row;
  }

  parseLine(line) {
    // %(path)s:%(row)d:%(col)d: %(code)s %(text)s
    const data = line.trim().split(":", 4);
    const codeMessage = data[3].trim().split(/ (.+)/);
    return {
      code: codeMessage[0],
      message: data[3],
      col: parseInt(data[2], 10),
      row: parseInt(data[1], 10),
    };
  }

  get issue() {
    const issue = new Issue();

    issue.source = "flake8";
    issue.code = this.code;
    issue.message = this.message;

    if (this.errorCodes.includes(this.code)) {
      issue.severity = IssueSeverity.Error;
    } else {
      issue.severity = IssueSeverity.Warning;
    }

    issue.line = this.row;
    issue.column = this.col;
    return issue;
  }
}

module.exports = Violation;
