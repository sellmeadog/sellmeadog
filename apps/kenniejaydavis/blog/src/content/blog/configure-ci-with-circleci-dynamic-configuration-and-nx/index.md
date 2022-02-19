---
title: Configure CI with CircleCI Dynamic Configuration and Nx
date: 2022-02-10T12:00:00
description: Nx is a smart, fast and extensible build system with first class monorepo support making it trivial to determine what projects in the workspace need to be rebuilt and deployed. CircleCI is a powerful CI/CD tool and Dynamic Configuration is particularly useful for monorepos. This series of articles will explore techniques to use Nx to generate dynamic configuration for CircleCI.
---

If you've done any searching for help configuring CircleCI in a monorepo, you've no doubt come across the `circleci/path-filtering` orb. In fact, I think every example I have found relies on path filtering. And if you've searched for help configuring CircleCI specifically in an Nx workspace, you've probably already seen the example in the Nx documentation.

In regards to configuring a complete CircleCI pipeline in an Nx workspace, the Nx documentation is arguably incomplete. It even states _"every organization manages their CI/CD pipelines differently, so the examples don't cover org-specific aspects of CI/CD (e.g., deployment). They mainly focus on configuring Nx correctly."_

As for path filtering, you'll find no shortage of complete CI/CD pipeline examples, however, they're not a good fit for Nx. I won't go into detail as to why path filtering is problematic in an Nx workspace, I'll save that for a follow up article. Instead, I want to walk through how I derived an Nx specific solution from the `circleci/path-filtering` orb source in combination with the "correct CircleCI configuration" provided by Nrwl.

### What is Path Filtering?

Let's start with an example directly from the path filtering orb documentation:

```yml
orbs:
  path-filtering: circleci/path-filtering@0.1.1

jobs:
  - path-filtering/filter:
      base-revision: main
      config-path: .circleci/continue-config.yml
      mapping: |
        src/.* build-code true
        doc/.* build-docs true
```

The `path-filtering/filter` job analyzes each push to the repository to determine where changes occurred between the current commit and the `base-revision`. These file system locations are then dynamically mapped to workflows defined in a separate configuration file located at `config-path`.

Thus at runtime, changes to files in the `src/` directory will trigger a workflow named `build-code` while changes to files within the `docs/` directory will trigger `build-docs`. Both workflows are defined in `.circleci/continue-config.yml`.

### How it Works

Let's again start with a code snippet directly from the orb source documentation (edited for brevity):

```yml
orbs:
  continuation: circleci/continuation@0.2.0

jobs:
  filter:
    ...
    steps:
      ...
      - set-parameters:
          base-revision: << parameters.base-revision >>
          mapping: << parameters.mapping >>
      - continuation/continue:
          circleci_domain: << parameters.circleci_domain >>
          configuration_path: << parameters.config-path >>
          parameters: /tmp/pipeline-parameters.json
```

The `filter` job is composed of two main steps: `set-parameters` and `continuation/continue`.

The `set-parameters` step is where all of the hard work is done analyzing changes with the responsibility of generating a `/tmp/pipeline-parameters.json` file. This file defines a simple JSON object resembling the `mapping` configuration:

```
{ build-code: true, build-docs: false }
```

The `circleci/continuation` orb defines the `continue` step which handles triggering the workflows defined in `.circleci/continue-config.yml` that are conditionally run based on the generated parameters in `/tmp/pipeline-parameters.json`.

### Deriving a Solution for Nx

After understanding how the `circleci/path-filtering` orb works, I made two key observations:

1. Nx already excels at determining what is affected by each commit
2. The `circleci/continuation` orb can be used directly in any setup workflow

Using the path filtering orb as a reference, I came up with this set of steps to run in the setup workflow:

```yml {numberLines}
orbs:
  nx: nrwl/nx@1.1.3

commands:
  nx-continue:
    steps:
      - nx/set-shas
      - run:
          name: Run continuation-parameters generator
          command: npx nx workspace-generator continuation-parameters --base=$NX_BASE --head=$NX_HEAD
      - when:
          condition: $CIRCLE_PULL_REQUEST
          steps:
            - continuation/continue:
                configuration_path: .circleci/continue.config.yml
                parameters: tmp/continuation-parameters.json
      - unless:
          condition: $CIRCLE_PULL_REQUEST
          steps:
            - continuation/finish
```

Let's dissect the `nx-continue` steps:

```yml {numberLines}
orbs:
  nx: nrwl/nx@1.1.3

commands:
  nx-continue:
    steps:
      - nx/set-shas
```

This block adds the official Nx orb to the pipeline. On line 7, we run the `nx/set-shas` step which calculates the base and head commits to be used in the Nx `affected` commands. These values are stored in environment variables, `NX_BASE` and `NX_HEAD` respectively.

```yml {numberLines:8}
- run:
    name: Run continuation-parameters generator
    command: npx nx workspace-generator continuation-parameters --base=$NX_BASE --head=$NX_HEAD
```

This runs a custom workspace generator which mimics the `set-parameters` step in the path filtering orb. The generator runs `nx affected:apps --plain --base=$NX_BASE --head=$NX_HEAD` mapping the output to a `/tmp/continuation-parameters.json` file.

```yml {numberLines:11}
- when:
    condition: $CIRCLE_PULL_REQUEST
    steps:
      - continuation/continue:
          configuration_path: .circleci/continue.config.yml
          parameters: tmp/continuation-parameters.json
- unless:
    condition: $CIRCLE_PULL_REQUEST
    steps:
      - continuation/finish
```
