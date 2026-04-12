const { execSync } = require('child_process');

describe('Code Formatting and Linting', () => {
  test('Code should be formatted with Prettier', () => {
    try {
      // --check tells Prettier to return an error if files aren't formatted
      execSync('npx prettier --check .');
    } catch (error) {
      throw new Error(
        "Files are not formatted correctly. Run 'npx prettier --write .' to fix."
      );
    }
  });

  // Note: If you have Python files in this repo, you can add Ruff here:
  /*
  test("Python code should pass Ruff check", () => {
    try {
      execSync("ruff check .");
    } catch (error) {
      throw new Error("Ruff linting failed.");
    }
  });
  */
});
