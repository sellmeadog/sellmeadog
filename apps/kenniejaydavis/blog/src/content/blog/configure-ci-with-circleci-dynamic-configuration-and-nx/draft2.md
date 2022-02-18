If you've done any searching for help configuring CircleCI in a monorepo, you've no doubt come across the `circleci/path-filtering` orb. In fact, I think every example I have found relies on path filtering.

I won't go into detail about why path filtering is problematic in an Nx workspace, I'll save that for a follow up article. Instead, I want to dig into how after understanding how the path filtering orb works I was able to create a solution specific to Nx.

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

The `path-filtering/filter` job analyzes each push to the repository to determine where changes occurred between the current commit and `base-revision`. These file system locations are then dynamically mapped to workflows defined in a separate configuration file located at `config-path`.

Thus at runtime, changes to files in the `src/` directory will trigger a workflow named `build-code` and changes to files within the `docs/` directory will trigger `build-docs`. Both workflows are defined in `.circleci/continue-config.yml`.

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

After understanding how `circleci/path-filtering` works, I made two observations:

1. Nx already excels at determining what changed after each commit
2. The `circleci/continuation` orb can be used directly in any setup workflow
