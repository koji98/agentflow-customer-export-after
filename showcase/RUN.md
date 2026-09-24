# Run the workflow

[Back to the app guide](../README.md) · [See how the workflow works](AUTHORING.md)

Start in a fresh copy of the **[before repo](https://github.com/koji98/agentflow-customer-export-before)**. Follow its app setup first. The command below will edit the app in that folder.

You need internet access and a Codex account that can run models. A live run uses your account's available usage. Reading the saved results does not.

## 1. Install Agentflow

Keep Node 24 active with `nvm use`. Run this from the before app's folder:

```sh
git clone https://github.com/koji98/agentflow.git ../agentflow-showcase-runtime
git -C ../agentflow-showcase-runtime checkout --detach bf7399955a45ea9e8fe0959c64be7a06649d997f
(
  cd ../agentflow-showcase-runtime
  npm ci
  npm run build
  npm run setup:link
)
agentflow --help
```

This puts Agentflow in a folder next to the app. The long ID selects the same Agentflow code used for the saved run.

The commands inside parentheses run in that other folder. When they finish, you are back in the app's folder.

Keep the Agentflow folder. The `agentflow` command points to it. If that folder name is already in use, choose a new name and use it in all three places above.

## 2. Install and sign in to Codex

This setup guide was tested with Codex CLI **0.144.5**:

```sh
npm install --global @openai/codex@0.144.5
codex --version
codex login
codex login status
```

Follow the browser sign-in steps. If you are already signed in, `codex login status` lets you check that. This setup does not need an API key or an `.env` file. You should not need `sudo` when using nvm.

For more help, see the [official Codex CLI guide](https://learn.chatgpt.com/docs/codex/cli) and [sign-in guide](https://learn.chatgpt.com/docs/auth).

### Which model runs?

The graph uses `"model": "auto"`. That tells Agentflow to let Codex CLI choose its default model.

The saved run used **Codex CLI 0.142.2**, **GPT-5.5**, and **medium** reasoning. The install steps above use the version tested for this public setup guide. A new run may choose a different model and produce a different result.

See [the saved model log](https://github.com/koji98/agentflow-customer-export-after/blob/main/results/run/nodes/002-generate-and-validate-98e034e54484/executions/i001-a001-exec-49f15c8227d21dd8/human-debug/harness/stderr.log#L4) for the recorded choice.

## 3. Check the tools and the plan

From the before app's folder, run these one at a time:

```sh
npm run doctor:workflow
npm run workflow:validate
```

The first command checks the tools and your saved login. It does not start an AI run. A saved login alone cannot prove that your account has usage left.

The second checks the workflow file. It should pass. This Agentflow version also prints ten warnings about how it passes files between steps. Those warnings appeared in our checked setup too. If you see an error that blocks the run, fix it before you continue.

## 4. Start the run

```sh
npm run workflow:run
```

This reads [agentflow.graph.json](../agentflow.graph.json), asks Codex to change the app, runs the tests, and asks two AI judges to review the work.

The saved run took **13 minutes and 13 seconds**, including time to write the final report. Your run may take longer. Keep the [saved results](https://github.com/koji98/agentflow-customer-export-after/blob/main/results/README.md) open if you are showing this live.

## 5. Read the result

The terminal prints the folder where Agentflow saved the run. It is usually under `.task-runtime/runs/` in the app's folder.

Open `delivery/01-review-brief.md` in that run folder. It gives you the result and links to the checks. If you set `AGENTFLOW_RUNS_ROOT` yourself, look in that location instead.

Then run:

```sh
npm test
npm run check:acceptance
git diff -- src public test
```

Both check commands should pass after a successful run. The last command shows what changed in the app.

To start over, clone the before repo into a **new folder**. This keeps your last run safe and gives Agentflow the broken starting app again.

## Help with the AI tools

| What you see | What to do |
| --- | --- |
| `agentflow: command not found` | Run `nvm use`. Then run `npm run setup:link` inside the Agentflow folder you built. |
| `codex: command not found` | Run `nvm use`, then repeat the Codex install above. Each Node version has its own global tools. |
| A Codex sign-in error | Run `codex login`, finish signing in, then run `npm run doctor:workflow` again from the app's folder. |
| A model or usage error | Check the message from Codex. Your account must have access to that model and enough usage left. |
| Security or install-script warnings while building Agentflow | The saved Agentflow version has warnings in its build tools. Its install and build passed our setup checks. Keep its lockfile as supplied if you want to use the same version. |

For Node, Python, or local server errors, see [setup help](SETUP.md).
