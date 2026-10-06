---

title: 'Semi-automated work with AI orchestration'
date: '2026-10-05'
description: 'Settings and prompts for running a planning, implementation, and verification loop with Codex CLI inside Claude Code cloud sessions'
image: 'Claude_spark.svg'
images:
  - src: 'Claude_spark.svg'
    alt: 'Claude'
  - src: 'OpenAI_blossom.svg'
    alt: 'OpenAI'

---

Logos by <a href="https://www.anthropic.com/news" target="_blank" rel="noreferrer">Claude (Anthropic)</a> / <a href="https://openai.com/brand/" target="_blank" rel="noreferrer">OpenAI</a>

These are setup notes for semi-automated work in a GitHub repository, with Claude Code as the orchestrator and Codex CLI handling implementation. The final choice was to install Codex in a Claude Code cloud environment and run this planning, implementation, and verification loop:

**Plan (Claude) → Implement (Codex) → Verify (Claude) → Repeat**

Claude or ChatGPT can explain how to set this up if you describe what you want to do, but a few setup steps were not obvious, so I have documented them here.

The steps below assume that a GitHub repository and an `LLM` working branch already exist.

## 1. Connect Claude Code to GitHub

Connect your GitHub account to Claude Code and grant the Claude GitHub App access to the repository. On Team or Enterprise, first have an organization Owner enable the GitHub connector under **Organization settings → Connectors** ([connection guide](https://code.claude.com/docs/en/web-quickstart)).

Select the repository when creating the session. The cloud proxy handles GitHub authentication, so there is no need to pass a GitHub token manually into the session ([GitHub authentication](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options)).

Use GitHub rulesets or branch protection to block direct pushes to `main` and deletion of that branch.

## 2. Configure the cloud environment

Under **Code → Cloud** in the Claude desktop app, or at [claude.ai/code](https://claude.ai/code), open **cloud environment menu → Edit → Network access** in the session title bar. Select `Custom` and add these two hosts to **Allowed domains**, one per line. Keep **Also include default list of common package managers** enabled ([network settings](https://code.claude.com/docs/en/cloud-environments#network-access)).

```text
auth.openai.com
chatgpt.com
```

Set the environment variable and setup script on the same screen.

- **Environment variables**: `BASH_MAX_TIMEOUT_MS`=`1800000`
- **Setup script**: use the script below to install Codex CLI and the other required packages.

```shell
#!/bin/bash
npm install -g @openai/codex || true
pip install --break-system-packages -q numpy scipy matplotlib pandas mpmath || true
pip install nbformat nbclient nbconvert ipykernel
```

The last line installs the Jupyter-related packages. If the current session still cannot connect after saving the settings, start a new session with the updated environment.

## 3. Authenticate and check the session

Create a session with the configured cloud environment and repository, selecting `LLM` as the starting branch. Choose **Auto** permission mode if available, otherwise **Accept edits**. Cloud sessions create a separate session branch, so ask Claude to verify that the working tree is clean and switch to `LLM` before editing ([starting a session](https://code.claude.com/docs/en/web-quickstart#start-a-task)).

Codex signs in with a **ChatGPT account** and uses that account's usage allowance and credits.

Save the following as `run_codex.sh` at the repository root to remove API-key environment variables and enforce `forced_login_method="chatgpt"`. Commit and push this script on the `LLM` branch. Use it for the authentication and execution commands below.

```shell:run_codex.sh
#!/bin/sh
unset OPENAI_API_KEY CODEX_API_KEY
exec codex -c 'forced_login_method="chatgpt"' "$@"
```

Use device code authentication in the cloud. Enable it in your ChatGPT security settings (or have a workspace admin enable it in workspace permissions). After saving the network settings, have Claude run the following inside the session ([authentication documentation](https://developers.openai.com/codex/auth/#login-on-headless-devices)).

```shell
sh run_codex.sh login --device-auth
```

Have Claude provide the displayed URL and one-time code. Open the URL in your own browser, sign in with the ChatGPT account you want to use, and enter the code to approve the login. Once authentication is complete, have Claude run:

```shell
sh run_codex.sh login status
sh run_codex.sh exec --sandbox read-only "Reply with exactly CODEX_OK"
```

Check that `codex login status` reports ChatGPT authentication and that Codex replies with `CODEX_OK`. Install the project's dependencies and run the existing tests before making changes. For the research repository used here, the command is:

```shell
(cd src && python3 -m unittest discover -s . -p 'test_*.py')
```

Also run the following at the repository root to fix the push destination and install a hook. Repeat this setup in a new session.

```shell
git config remote.origin.push refs/heads/LLM:refs/heads/LLM
cat > .git/hooks/pre-push <<'EOF'
#!/bin/sh
while read local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" != "refs/heads/LLM" ]; then
    echo "pre-push: only LLM is allowed" >&2
    exit 1
  fi
done
exit 0
EOF
chmod +x .git/hooks/pre-push
```

## 4. Start the loop with Claude

Once setup is complete, send the following prompt, adapting the test command and output directories to your project. Monitor the first few iterations.

```text
You are the orchestrator of this cloud session.
Delegate implementation to Codex CLI in the same environment and repeat:
plan → implement → independently verify → give feedback.

Rules:
- Work only on LLM. Push only with git push origin LLM.
- Do not modify main, force-push, delete branches, run reset --hard, or run git clean.
- Run Codex with --sandbox workspace-write; do not disable its sandbox.
- Invoke Codex through run_codex.sh and keep ChatGPT authentication enabled.
- Keep secrets out of prompt files, logs, and commits.

At startup:
1. Confirm the branch is LLM and the working tree is clean, then run
   git pull --ff-only and sh run_codex.sh login status.
   Stop if the branch or authentication method is wrong, or a command fails.
2. Read TASK.md and PROGRESS.md in orchestration/ if they exist, and resume.
   Otherwise, ask me for the goal, acceptance criteria, and files you must not edit.
   Record them in TASK.md and obtain agreement before starting.
3. Add the working branch, editing restrictions, and test command to the root AGENTS.md.
   Tests: (cd src && python3 -m unittest discover -s . -p 'test_*.py').
   Save CSV files in plot/data and figures in figure. Preserve existing rules.
4. Create orchestration/prompts/ and orchestration/logs/.
   Add orchestration/logs/ to .gitignore.
   Track TASK.md, PROGRESS.md, prompts/, and AGENTS.md in Git.
   Commit and push the initial task instructions and progress file before iterating.

For each iteration:
1. Read TASK.md and PROGRESS.md. Choose one task expected to take under 30 minutes.
2. Write its objective, editing scope, acceptance criteria, and test commands
   in orchestration/prompts/iter_NNN.md. Tell Codex to implement and test, but not commit or push.
3. Run the following from the repository root, replacing NNN with the iteration number:

   sh run_codex.sh exec --sandbox workspace-write \
     -C "$(git rev-parse --show-toplevel)" \
     -o orchestration/logs/iter_NNN_last.md \
     - < orchestration/prompts/iter_NNN.md \
     > orchestration/logs/iter_NNN.log 2>&1

   Run long tasks in the background and check their logs and exit status.
   Wait for Codex to finish before proceeding. Do not run concurrent implementations
   in this clone.
4. Review the diff yourself and check the tests and acceptance criteria.
   If they fail, give specific feedback, with at most three repair attempts per task.
   If unresolved, preserve the changes with git stash push -u -m "iter NNN failed".
5. Update PROGRESS.md with the iteration number, work done, checks, and next step.
   Commit passing changes together with the progress record, then git push origin LLM.
   Record failed tasks too, and commit and push that progress record.
6. Give me a one- or two-line update, then continue.

Stop when the acceptance criteria are met, after three iterations without progress,
on usage limit errors (including weekly limits), authentication errors, persistent
communication errors, or a change of direction that needs human judgment.
Do not switch to API-key authentication to continue. Record the reason in PROGRESS.md.
```

The connection is a call to [`codex exec`](https://developers.openai.com/codex/noninteractive/) through `run_codex.sh`. `-` reads the prompt from standard input, `-C` selects the working directory, and `-o` saves the final response ([CLI reference](https://developers.openai.com/codex/cli/reference/)).

Follow progress through the `LLM` commit history and `orchestration/PROGRESS.md`. To stop, ask Claude to finish the current iteration and pause. In a new session, have Claude read `orchestration/TASK.md` and `orchestration/PROGRESS.md` to resume.
