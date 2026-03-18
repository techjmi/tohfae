# Session Management

## Overview

This module provides session ID management for tracking user browsing sessions.

## What is a Session ID?

A session ID is a unique identifier for a single browsing session. It is different from:

- **User ID** - Permanent identifier for logged-in users
- **Guest User ID** - Semi-permanent identifier for guest users (90 days, stored in cookies)
- **Session ID** - Temporary identifier for a single browsing session (expires when browser tab closes)

## Use Cases

- Track user journey within a single visit
- Analytics (pages viewed per session, time spent, etc.)
- Prevent duplicate activity tracking within the same session
- Session-based recommendations
- Identify unique sessions for conversion tracking

## Implementation

### Storage

Session IDs are stored in `sessionStorage` which:
- Persists across page navigations within the same tab
- Automatically expires when the browser tab/window is closed
- Is isolated per tab (each tab gets its own session ID)
- Cannot be accessed by other domains (secure)

### Format

```
session_<timestamp>_<random>
```

Example: `session_1710345678901_k3j5h2g9d`

## Usage

### Get Session ID

```javascript
import { getSessionId } from '@/shared/utils/session';

const sessionId = getSessionId();
```

The function will:
1. Check if a session ID exists in sessionStorage
2. If yes, return the existing session ID
3. If no, generate a new session ID and store it
4. Return the session ID

### Generate New Session ID

```javascript
import { generateSessionId } from '@/shared/utils/session';

const newSessionId = generateSessionId();
```

### Clear Session ID

```javascript
import { clearSessionId } from '@/shared/utils/session';

clearSessionId();
```

## Integration with Activity Tracking

The session ID is automatically included when tracking activities:

```javascript
import { ActivityService } from '@/services/activity/activity.service';

await ActivityService.trackActivity({
  productSlug: 'product-123',
});
```

The `ActivityService.trackActivity` method automatically:
1. Gets the current session ID using `getSessionId()`
2. Includes it in the API request
3. Backend stores it with the activity record

## Backend Handling

The backend:
- Accepts session ID as an optional parameter
- Generates a fallback session ID if not provided
- Stores the session ID with each activity record
- Uses it for session-based analytics and queries

## Session Lifecycle

1. **User opens website** - New session ID is generated
2. **User navigates pages** - Same session ID is used
3. **User closes tab** - Session ID is cleared (sessionStorage expires)
4. **User opens new tab** - New session ID is generated
5. **User refreshes page** - Same session ID is maintained

## Privacy and Security

- Session IDs are stored client-side only (sessionStorage)
- No personal information is included in the session ID
- Session IDs are not shared across domains
- Session IDs expire automatically when the browser tab closes
- Backend generates fallback IDs if frontend fails

## Comparison with Other Identifiers

| Identifier | Storage | Lifetime | Purpose |
|------------|---------|----------|---------|
| User ID | Database | Permanent | Identify logged-in users |
| Guest User ID | Cookie | 90 days | Identify guest users across sessions |
| Session ID | sessionStorage | Until tab closes | Track single browsing session |

## Best Practices

1. Always use `getSessionId()` instead of directly accessing sessionStorage
2. Session ID is automatically included in activity tracking
3. Do not store sensitive information in session IDs
4. Let the session ID expire naturally (don't manually clear unless needed)
5. Backend should always have a fallback for missing session IDs

