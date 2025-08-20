# Mini Ticketing App - Submission Answers

## 1. Component Structure
I structured the components in a modular way to separate concerns and improve reusability. The main layout includes `Header`, `Sidebar`, and `TicketList` components. Each ticket is rendered using a `TicketCard` component, keeping the UI logic isolated. Search functionality is implemented in a separate `SearchBar` component to ensure that filtering logic is independent. This structure allows easy maintenance and scalability, as adding new features like ticket details or filters requires minimal changes to existing components. Additionally, keeping components small and focused improves readability and testability.

## 2. State Management
State is primarily stored in local component state using React’s `useState` hook, and shared global state is managed using Context API where necessary. For example, ticket data fetched from the backend is stored in a top-level component and passed down via props, while search input is managed locally in the `SearchBar`. This approach balances simplicity with flexibility: most state is local to avoid unnecessary re-renders, while shared state ensures consistency across components that need access to the same data.

## 3. Performance Considerations
If the app scaled to 1,000+ tickets, I would implement virtualization using libraries like `react-window` to render only visible items. Memoization with `React.memo` and `useCallback` would reduce unnecessary re-renders. Pagination or infinite scrolling could reduce initial load time. For search, I might debounce input to avoid excessive filtering calculations. Additionally, caching API responses and optimizing the data structure for faster lookup would improve responsiveness while keeping the app performant on large datasets.

## 4. Search Behavior
Currently, search filters tickets by title or description. To improve UX, I would add features like partial matches, fuzzy search, and highlighting of matched text. Adding a debounce for input changes would prevent lag on large datasets. Filters could also be combined with sorting options, such as by date or priority. Providing instant feedback and clear “no results” messages would make the search more intuitive. Overall, enhancing both functionality and visual feedback would improve usability.

## 5. What did you Google or use GPT for?
I used Google and GPT to clarify React patterns and best practices, such as handling state updates efficiently and resolving merge conflicts during Git operations. GPT was particularly useful for drafting structured explanations for component design, state management, and performance optimization. I also consulted documentation and online resources to confirm syntax for hooks like `useState`, `useEffect`, and Context API usage. This combination of tools helped me implement features correctly and write concise, clear answers for the submission.
