# App

1. [Structure](#structure)
2. [What are actions?](#what-are-actions)
3. [What are stores?](#what-are-stores)

## Structure

```
├── actions        # Flux Architecture Actions
├── components     # React components
├── index.js       # Main application configuration
├── router.jsx     # Routing (using ReactRouter)
└── stores         # Flux Architecture Stores
```

## What are actions?

Actions are simple functions that prepare information before it is
sent to data storage for processing. Information on actions can be
found in the
[actions documentation within Microcosm](https://github.com/vigetlabs/microcosm/blob/master/docs/api/actions.md)

## What are stores?

Within the context of Microcosm,
[Stores dictate how information should be saved within an app](https://github.com/vigetlabs/microcosm/blob/master/docs/api/store.md). When
an action is dispatched, Stores can listen for that action and modify
state. This will trigger a re-render of the user interface.
