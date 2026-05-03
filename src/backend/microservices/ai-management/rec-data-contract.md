# Data Contract for how to send data to this ai-management system

This is just a file so it's easier to visualize how to send information to this process

## Input Data schema (TS)

```typescript

export type AIRequest = {
  userId: string;
  conversationId: string;
  message: string;

  mode: "chat" | "analysis" | "recommendation";

  context?: {
    recentBrewLogs?: Array<{
      brewId: string;
      method: string;
      dose?: number;
      yield?: number;
      timeSec?: number;
      grind?: string;
      rating?: number;
    }>;

    userPreferences?: {
      preferredStrength?: string;
      milkPreference?: string;
    };
  };

  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;

  options?: {
    includeExplanation?: boolean;
    returnStructured?: boolean;
  };
};

```

### Input data example
```JSON
{
  "userId": "u_123",
  "conversationId": "c_456",

  "message": "My espresso tastes sour and weak",

  "mode": "analysis",

  "context": {
    "recentBrewLogs": [
      {
        "brewId": "b1",
        "method": "espresso",
        "dose": 18,
        "yield": 36,
        "timeSec": 22,
        "grind": "medium",
        "rating": 2
      }
    ],

    "userPreferences": {
      "preferredStrength": "strong",
      "milkPreference": "none"
    }
  },

  "history": [
    {
      "role": "user",
      "content": "My shots are inconsistent"
    },
    {
      "role": "assistant",
      "content": "Check grind distribution and puck prep"
    }
  ],

  "options": {
    "includeExplanation": true,
    "returnStructured": true
  }
}
```

## Output Data Schema (TS)

```typescript

export type AIResponse = {
  conversationId: string;

  response: {
    text: string;

    structured?: {
      diagnosis?: string;
      confidence?: number;
      factors?: string[];

      recommendations?: Array<{
        action: string;
        priority?: number;
        targetRangeSec?: string;
      }>;
    };
  };

  usage?: {
    model: string;
    latencyMs: number;
  };
};

```

### Output Data Example:

```JSON

{
  "conversationId": "c_456",

  "response": {
    "text": "Your espresso is likely under-extracted due to coarse grind and short contact time.",

    "structured": {
      "diagnosis": "under_extraction",
      "confidence": 0.82,

      "factors": [
        "grind too coarse",
        "short brew time (22s)"
      ],

      "recommendations": [
        {
          "action": "finer_grind",
          "priority": 1
        },
        {
          "action": "increase_time",
          "targetRangeSec": "25-30"
        }
      ]
    }
  },

  "usage": {
    "model": "gemini-1.5-flash",
    "latencyMs": 842
  }
}

```
