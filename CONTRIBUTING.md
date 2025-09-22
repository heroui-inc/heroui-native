# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Before You Start

### Important Guidelines

HeroUI Native follows a **strict design system** based on our Figma designs and roadmap. To ensure consistency and quality:

**No Unauthorized Changes**: Do NOT:

- Add new variants to existing components without discussion
- Change component designs or visual appearance
- Modify existing component behavior or API
- Add features that aren't in our design specifications

### How to Propose Changes

If you want to suggest significant changes or new features:

1. **GitHub Discussions** (Preferred): Start a discussion in [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions)
   - Use for: Feature proposals, API changes, new component ideas
   - Include: Use cases, examples, and rationale

2. **Community Channels**: Join our [Discord](https://discord.gg/9b6yyZKmH4) for informal discussions

3. **GitHub Issues**: Use for reporting bugs or problems with existing functionality

### What We're Looking For

The best contributions are:

- **Bug fixes** for existing issues
- **Documentation improvements**
- **Test coverage improvements**
- **Performance optimizations** (without changing behavior)
- **Accessibility improvements**

## Development workflow

This project is a monorepo managed using [Yarn workspaces](https://yarnpkg.com/features/workspaces). It contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> Since the project relies on Yarn workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development.

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
yarn example start
```

To run the example app on Android:

```sh
yarn example android
```

To run the example app on iOS:

```sh
yarn example ios
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "HerouiNativeExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

To run the example app on Web:

```sh
yarn example web
```

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typecheck
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [bumpp](https://github.com/antfu/bumpp) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn`: setup project by installing dependencies.
- `yarn typecheck`: type-check files with TypeScript.
- `yarn lint`: lint files with ESLint.
- `yarn test`: run unit tests with Jest.
- `yarn example start`: start the Metro server for the example app.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.

## Component Engineering Design System

When adding new components to HeroUI Native, follow our standardized component engineering process to ensure consistency and quality across the library.

### Component Structure

All components must follow these architectural patterns:

1. **Compound Component Pattern**: Components should use compound composition with a Root component and optional sub-components
2. **File Organization**: Each component requires specific files in a strict order
3. **Styling**: Use NativeWind v4 with tailwind-variants for all styling
4. **Animations**: Use react-native-reanimated for animations when needed
5. **API Compatibility**: Component structure and API must align with the latest HeroUI web version where possible

### Required Files for New Components

When creating a new component, you must create these files in the following order:

#### 1. `[component].types.ts`

- Define all TypeScript interfaces and types
- Include comprehensive JSDoc comments for all props
- Export all public types

#### 2. `[component].constants.ts`

- Use SCREAMING_SNAKE_CASE for constant names
- Include animation constants if applicable
- Define display names for debugging

#### 3. `[component].styles.ts`

- Use tailwind-variants for variant definitions
- Define all style variants (size, color, etc.)
- Use StyleSheet only for native-specific properties

#### 4. `[component].utils.ts` (if needed)

- Include calculation functions
- Add formatting utilities
- Create validation helpers

#### 5. `[component].tsx`

- Implement the main component logic
- Use compound component pattern
- Include proper ref forwarding
- Add context provider if needed

#### 6. `index.ts`

- Export all public APIs
- Ensure tree-shaking optimization

### Component Implementation Checklist

Before submitting a component:

- [ ] All types defined with JSDoc documentation
- [ ] Constants properly extracted and named
- [ ] Styles use tailwind-variants pattern
- [ ] Component follows compound pattern
- [ ] Proper ref forwarding implemented
- [ ] Context pattern used when needed
- [ ] Component exported from `src/index.ts`
- [ ] Example screen created in `example/src/screens/`
- [ ] Navigation link added alphabetically in example app
- [ ] All variants and features working correctly
- [ ] TypeScript checks pass (`yarn typecheck`)
- [ ] Linting passes (`yarn lint`)

### Example Implementation

For detailed implementation guidance and templates, refer to the `.workflows/add-component/` directory which contains:

- Complete implementation templates
- Quality standard documentation
- Example patterns and best practices

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

#### Before Opening a PR

1. **Ensure alignment**: Your PR should:
   - Fix an existing issue OR
   - Implement a feature from our roadmap OR
   - Have been discussed and approved in GitHub Discussions

2. **Do NOT open PRs for**:
   - New component variants not in our design system
   - Visual/design changes without prior approval
   - Breaking API changes without discussion
   - Features not aligned with our roadmap

#### PR Requirements

When you're sending a pull request:

- Prefer small pull requests focused on one change
- Verify that linters and tests are passing
- Review the documentation to make sure it looks good
- Follow the pull request template when opening a pull request
- Include issue number or discussion link in PR description
- For pull requests that change the API or implementation, you MUST discuss with maintainers first in GitHub Discussions

#### PR Review Process

PRs that don't follow these guidelines may be closed without review. We appreciate your understanding as we maintain consistency and quality in the library.
