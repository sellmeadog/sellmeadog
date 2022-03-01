Adding CircleCI to an Nx workspace is not as straightforward as [the examples](https://nx.dev/ci/monorepo-ci-circle-ci) make it seem. I discovered this while configuring my first ever CircleCI pipeline in a non trivial workspace. I needed to efficiently build and deploy Angular front-ends and .NET backend microservices from a single Nx monorepo.

I started with this sample configuration found in the Nx documentation but quickly found it to be incomplete; there's even this friendly note in the [Nx Cloud docs](https://nx.app/docs/configuring-ci?__hstc=221401095.4b44870ec4a577029c49e44b73bd3bee.1634688000058.1634688000059.1634688000060.1&__hssc=221401095.1.1634688000061&__hsfp=1055199525) that explains why:

> Every organization manages their CI/CD pipelines differently, so [these] examples don't cover org-specific aspects of CI/CD (e.g., deployment). They mainly focus on configuring Nx correctly.

While understanding how to configure Nx correctly in a CircleCI pipeline is important, the nuances of configuring end-to-end CI/CD pipelines for each deployable in the workspace is still arguably undocumented and that's what I want to dig into in this article.

## Getting Started

As you may have already gleaned, when I started my CircleCI and Nx journey, I had plenty of experience with Nx but zero with CircleCI. As a result, I had a lot to learn about CircleCI before I had enough understanding to start writing a pipeline let alone configure Nx to orchestrate CircleCI dynamic configuration.

Unfortunately, there's only so much I can cover in this article without it becoming a book. As much as I'd love to dig into the details of Nx, CircleCI and dynamic configuration, all complex topics in and of themselves and cannot be covered in a single post. As such, I am making the following assumptions:

- You already have an workspace you're configuring CircleCI in
- While you might be new to CircleCI, but have already done the work to create a CircleCI account and setup a project for your monorepo
- You've been researching how to configure CircleCI in an Nx workspace and that's how you found this article

With that said, I build and deploy this blog from an Nx workspace using CircleCI and dynamic configuration and the full repo is available here for reference. Feel free to follow along as I continue to iterate and improve my pipelines which I'll be writing about in future articles.

## Inspiration

While there's not a lot of documentation covering configuring CircleCI in an Nx workspace, there's plenty written about configuring CircleCI in a monorepo. If you've done any research on this topic already, you've no doubt already found examples using path filtering.

While path filtering works for what I'll call "naive monorepos", it's not all that useful in an Nx workspace; why is a topic for a follow up post. Building on top of path filtering is this example repo which intelligently merges application specific CircleCI configurations at runtime based on what changed in a given Git commit.

## The Setup Workflow

Every CircleCI project requires a single `.circleci/config.yml` at the root of the repository. This is true in a monorepo, aka your Nx workspace, and when using dynamic configuration, this root configuration defines the setup workflow.

After creating this initial configuration file, your workspace should look like this:

```{diff}
+ .circleci/
+   config.yml
apps/
libs/
...
package.json
nx.json
workspace.json
```
