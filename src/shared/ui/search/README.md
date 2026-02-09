# Search Component

Reusable search input with debouncing, clear button, and loading state.

## Features

- Debounced search (300ms default)
- Clear button (X icon) when has value
- Loading spinner support
- Keyboard shortcuts (Escape to clear)
- Controlled/Uncontrolled modes
- Accepts all Input component props
- Custom styling support

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Uncontrolled default value |
| `onChange` | `function` | - | Change handler `(e) => void` |
| `onSearch` | `function` | - | Debounced callback `(value) => void` |
| `onClear` | `function` | - | Clear callback `() => void` |
| `debounceTime` | `number` | `300` | Debounce delay (ms) |
| `showClearButton` | `boolean` | `true` | Show clear button |
| `loading` | `boolean` | `false` | Show loading spinner |
| `type` | `string` | `'search'` | Input type |
| `placeholder` | `string` | `'Search products...'` | Placeholder |
| `size` | `string` | `'md'` | `sm`, `md`, `lg`, `xl` |
| `radius` | `string` | `'md'` | `none`, `sm`, `md`, `lg`, `full` |
| `variant` | `string` | `'outline'` | `solid`, `outline`, `ghost`, `underline` |
| `prefixIcon` | `string` | `'search'` | Icon before input |
| `className` | `string` | `''` | Additional CSS classes |
| `...props` | `any` | - | All Input props |

## Examples

### Basic Controlled

```jsx
import { Search } from '@/shared/ui/search/Search';

const [searchTerm, setSearchTerm] = useState('');

<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onSearch={(value) => console.log('Search:', value)}
/>
```

### With useSearch Hook

```jsx
import { useSearch } from '@/shared/hooks/state/useSearch';

const products = [...];
const { searchTerm, setSearchTerm, searchData } = useSearch(products, {
    searchField: ['basic.name', 'basic.description']
});

<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>

{searchData.map(product => (
    <ProductCard key={product.id} product={product} />
))}
```

### Header Search

```jsx
<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onSearch={(value) => {
        if (value) router.push(`/search?q=${value}`);
    }}
    size="md"
    radius="full"
    className="w-full max-w-md"
/>
```

### Product Filter

```jsx
<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    size="sm"
    placeholder="Filter products..."
/>
```

### With Loading

```jsx
const [loading, setLoading] = useState(false);

<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onSearch={async (value) => {
        setLoading(true);
        await fetchResults(value);
        setLoading(false);
    }}
    loading={loading}
/>
```

### Custom Styled

```jsx
<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    size="lg"
    radius="full"
    variant="solid"
    className="shadow-lg border-2"
/>
```

### With Clear Callback

```jsx
<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onClear={() => {
        console.log('Search cleared');
    }}
/>
```

### Uncontrolled

```jsx
<Search
    defaultValue="initial search"
    onSearch={(value) => console.log('Search:', value)}
/>
```

### With Dropdown Results

```jsx
import { Dropdown } from '@/shared/ui/dropdown/Dropdown';

const [searchTerm, setSearchTerm] = useState('');
const [results, setResults] = useState([]);
const [isOpen, setIsOpen] = useState(false);

<div className="relative">
    <Search
        value={searchTerm}
        onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
        }}
        onSearch={async (value) => {
            const data = await fetchResults(value);
            setResults(data);
        }}
    />

    {isOpen && results.length > 0 && (
        <Dropdown
            items={results}
            onItemClick={(item) => {
                router.push(`/products/${item.slug}`);
                setIsOpen(false);
            }}
            renderItem={(item) => (
                <div className="flex items-center gap-2">
                    <img src={item.image} className="w-8 h-8" />
                    <span>{item.name}</span>
                </div>
            )}
        />
    )}
</div>
```

### Order Search

```jsx
const orders = [...];
const { searchTerm, setSearchTerm, searchData } = useSearch(orders, {
    searchField: ['id', 'status', 'product.name']
});

<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search orders..."
    size="sm"
/>
```

### Address Search

```jsx
const addresses = [...];
const { searchTerm, setSearchTerm, searchData } = useSearch(addresses, {
    searchField: ['street', 'city', 'zipCode']
});

<Search
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search addresses..."
/>
```

## Keyboard Shortcuts

- **Escape** - Clear search

## Notes

- Debouncing reduces API calls
- Clear button shows only when has value
- Loading spinner overrides clear button
- Works with all Input component features
- Prefix/suffix icons handled by Input component

