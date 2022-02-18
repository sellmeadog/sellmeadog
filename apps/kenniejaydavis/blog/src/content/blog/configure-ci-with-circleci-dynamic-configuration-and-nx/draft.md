Nx is awesome and works great with monorepos. CircleCi is awesome and with dynamic configuration enabled also works great with monorepos. Configuring them to work together has no shortage of nuances which I want to discuss in this article.

I build and deploy this blog from an Nx workspace using CircleCI dynamic configuration and I will be walking through how it all works. The full repo is available to reference if you prefer to go straight to the code.

### Getting Started

My journey to configure an Nx workspace with CircleCI was long and wrought with trial and error. While I had years of experience with Nx, I had none with CircleCI and needless to say there was a lot ot learn.

Unfortunately, I cannot cover everything I learned along the way without this article becoming a book and so I am proceeding with the following assumptions:

- You already know and understand Nx and the monorepo paradigm and have an existing workspace
- You are familiar with CI/CD pipelines and possibly CircleCI; in fact, you might already be in the process of configuring CircleCI in your workspace and looking for additional resources.

### Understanding CircleCI

I am going to avoid doing a deep dive into CircleCI and instead try to give a quick overview of the basics from which to build upon:

- Every CircleCI project requires a single `.circleci/config.yml` file at the root of the repository
- This configuration file defines a pipeline made up of one ore more workflows each coordinating one or more jobs
- The entirety of the pipeline executes whenever a change is pushed to the repo
- Control flow options are limited, namely workflow triggers, conditional workflows, and the `when` step in jobs

By default, CircleCI assumes code repository includes a single autonomous project. This inherently scopes the control flow options summarized above to the context of a single project, i.e., schedule a nightly build, validate a pull request, build the main branch, deploy from a release branch, etc.

As soon as multiple autonomous projects are present in a repository, this paradigm breaks down quickly. While you can easily define a workflow per project in a monorepo workspace, executing those workflows only when necessary requires a paradigm shift.

### Dynamic Configuration

Dynamic configuration is the CircleCI feature that provides support for monorepos. As the name suggests, when enabled, dynamic configuration introduces the concept of a `setup workflow` that dynamically generates a configuration file at runtime defining additional workflows to be executed in the pipeline.

I want to pause here and quickly review the basics:

- A CircleCI project for a monorepo still requires a single `.circleci/config.yml` file at the root of the workspace
- This now represents the setup configuration and must include the `setup: true` keyword and define a single `setup workflow` responsible for generating additional configuration
- The `circleci/continuation` orb defines the `continue` job which will continue the pipeline execution with the dynamically generated config

#### Path Filtering

If you search for example CircleCI monorepo configurations, you will undoubtedly come across the `circleci/path-filtering` orb. The configuration looks like this:

```yml
jobs:
  - path-filtering/filter:
      base-revision: main
      config-path: .circleci/continue-config.yml
      mapping: |
        src/.* build-code true
        doc/.* build-docs true
```

The logic of the orb analyzes each push to the repo and determines if any files were changed in the `mapping` configuration. In the example above, if any file in `src` is modified, the pipeline parameter `build-code` is set to true. This process is performed for each item the in the `mapping` configuration until the full set of parameters has been generated.

Path filtering uses the `circleci/continuation` orb internally and continues the pipeline execution with the specified `config-path` passing the generated pipeline parameters.

I think it is important to point out that, at least in my experience, using path filtering in an Nx workspace is problematic. It would make sense if you could configure `mapping` for just the deployable `apps` in an Nx workspace. However, you also have to take into consideration all of the dependent `libs` and account for those in the path filtering
