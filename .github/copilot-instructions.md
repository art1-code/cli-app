### Quick context

This is a small Node.js command-line Task Tracker. The single entry point is `app.js` which wires Commander-based commands to helper functions in `functions/`. Persistent data is stored in `tasks.json` (a JSON array). The project is minimal and contains a few known inconsistencies/bugs — see "Watchouts" below.

### Key files

- `app.js` — CLI entry (uses Commander). Declares commands: `add`, `update`, `delete` and calls functions from `functions/`.
- `functions/*.js` — business logic: `add.js`, `update.js`, `delete.js`, `changeStatus.js`, `reader.js`. These accept a `list` (array) and usually mutate & return it.
- `status.js` — status constants: PENDENTE => "todo", EM_ANDAMENTO => "in-progress", CONCLUIDO => "done".
- `tasks.json` — the tasks store (an array). `reader.js` reads this file synchronously.
- `package.json` — lists dependencies: `commander` is used; note `fs` is listed as a dependency but Node core provides `fs` and that dependency is unnecessary.

### Big-picture architecture & data flow

1. app.js loads/declares a path to `tasks.json` and calls `reader(path)` to get the in-memory `list`.
2. CLI commands pass that `list` to functions in `functions/` which mutate and return the updated list.
3. Currently there is no function that writes back to `tasks.json` — persistence is missing. Any change made by the helpers is only in memory unless you explicitly write the file.

### Running and quick examples

Run commands with Node from project root. Examples:

node app.js add "Buy milk"
node app.js update 1 "New description"
node app.js delete 2

Note: `package.json` sets `bin` to `./app.js` so the CLI can be installed globally with `npm link` for a system command, but the simplest flow is `node app.js ...`.

### Project-specific conventions and patterns

- Functions take `list` (array) as the first argument and return the updated list. Many helpers mutate the passed array in-place and then return it.
- Timestamps use `Date.now()` and tasks use numeric `id` values computed as `lastElement.id + 1`.
- Status values are centralized in `status.js`. Use those constants when reading/modifying statuses.

### Watchouts / Local issues to address before edits

- app.js mixes `require(...)` (CommonJS) and `import` (ESM) syntax. The `functions/*.js` files use `module.exports`. Expect runtime errors depending on Node configuration. Prefer converting `app.js` to CommonJS (`const { Command } = require('commander')`) or migrate the whole repo to ESM.
- `app.js` calls `reader(path)` but currently passes the parsed JSON object (require('./tasks.json')) instead of a file path string; `reader.js` expects a file path and calls `fs.readFileSync(path, 'utf-8')`. Fix the argument so `reader` receives a path string (e.g. `path.join(__dirname, 'tasks.json')`) or change `reader` to accept an object.
- Iteration bugs: many loops use `for (let i = 0; i <= newList.length; i++)` which will go out of bounds. Use `< newList.length`.
- `changeStatus.js` contains an assignment bug: `(newList[i].id).status = status;` — this treats `id` as the object. Should be `newList[i].status = status`.
- There is no persistence: after operations you must write the updated list back to `tasks.json` using `fs.writeFileSync()` (or implement an async variant). Tests and commands assume persistence, so add a `save(list, path)` helper if changing behavior.

### When you edit the code

- Keep changes small and focused. Example-first PRs work best: e.g., "Fix reader argument and persist updates".
- Add a short runnable verification: e.g., a tiny script or npm script that runs `node app.js add "test"` and asserts `tasks.json` changed.
- Update `package.json` only if needed (remove the `fs` dependency, or add a `start` script). Document any change in the PR description.

If anything above is unclear or you'd like me to prioritize fixing one of the watchouts (mixing module systems, persistence, or logic bugs), tell me which and I will open a patch/PR with tests and a verification script.
