# CLAUDE.md - Claude Development Guidelines

## Project Information

This is the HeroUI Native component library for React Native. It provides a set of high-quality, accessible, and customizable UI components.

## Code Quality Commands

When you complete a coding task, please run the following commands to ensure code quality:

```bash
# Run linting
npm run lint

# Run TypeScript type checking
npm run typecheck
```

## Component Development Guidelines

When creating new components, follow these steps:

1. Read all implementation guides in `.workflows/add-component/`
2. Create proper file structure (index.ts, component.tsx, component.types.ts, component.styles.ts)
3. Use compound component pattern for flexibility
4. Implement proper animations with react-native-reanimated
5. Ensure accessibility compliance
6. Create comprehensive example screens

## Important Patterns

- Use `createContext` from `@/helpers/utils` for context creation
- Use `getChildElement` for optional compound components
- Use `tailwind-variants` for styling
- Always forward refs to underlying components
- Set proper display names for all components

## Testing

After implementing a component:
1. Run lint and typecheck commands
2. Test all variants in the example app
3. Verify animations run at 60fps
4. Check accessibility with screen readers