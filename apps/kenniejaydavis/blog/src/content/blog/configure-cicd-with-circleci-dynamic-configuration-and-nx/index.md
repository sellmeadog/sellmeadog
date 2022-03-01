---
title: Configure CI/CD with CircleCI Dynamic Configuration and Nx
date: 2022-02-25T12:00:00
description: Cunningham's Law states "the best way to get the right answer on the internet is not to ask a question; it's to post the wrong answer." I started this blog knowing I will be posting wrong answers in hopes that together we can find the right answers.
---

If you're in the process of researching how to configure CircleCI in a monorepo, you've no doubt seen examples using the `path filtering` orb.

The `path filtering` concept is simple: given a commit, identify where in the file system changes occurred and map those locations to workflows in a continuation pipeline. This is the example path filtering configuration in the orb documentation:

```yml
- path-filtering/filter:
    base-revision: main
    config-path: .circleci/continue-config.yml
    mapping: |
      src/.* build-code true
      doc/.* build-docs true
```

This essentially reads:

- If a file in the `src/` directory changes, trigger the `build-code` workflow
- If a file in the `doc/` directory changes, trigger `build-docs`
- Both workflows are defined in `.circleci/continue-config.yml`

The path filtering orb contains all of the logic to analyze the commit and determine where changes occurred.

## You Don't Need Path Filtering

There are two main reasons why `path filtering` is not ideal or even necessary in an Nx workspace:

1. Given how Nx encourages composing deployables in the `apps/` directory from multiple libraries defined in the `libs/` directory, the mapping configuration becomes unmanagable
2. Nx already knows what is `affected` in the workspace after each commit

## The Setup Workflow

Every CircleCI project requires a single `.circleci/config.yml` file at the root of the repository. This is no different in an Nx workspace:

```{diff}
+ .circleci/
+    config.yml
+    workflows.yml
apps/
libs/
nx.json
package.json
workspace.json
```

Because we will be using dynamic configuration, we also have `workflows.yml` stubbed out which will define the configuration workflows that will be executed after setup. More on that later.

### The Setup Workflow

Dynamic configuration splits pipeline executiong into two phases: setup and continuation.
