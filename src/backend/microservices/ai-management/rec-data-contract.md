# Data Contract for how to send data to this ai-management system

This is just a file so it's easier to visualize how to send information to this process

## Input Data schema (TS)

### Input data example
```JSON
{
    "mode": "coaching",
    "message": "My espresso tastes sour and weak. I don't really understand why. I thought I did everything in the process correctly.",

    "context": {
        "user": 
        {
            "firstName": "Duncan",
            "lastName": "Everson",

            "defaultGrinder": 
            {
                "grinderName": "Baratza Encore",
                "minSettingFine": 1,
                "maxSettingCoarse": 40
            }
        },

        "latestBrewLogs": 
        [
            {
                "grinder": {
                    "grinderName": "Baratza Encore",
                    "minSettingFine": 1,
                    "maxSettingCoarse": 40
                },

                "brewMethod": {
                    "methodName": "espresso",
                    "defaultRatio": "1:2",
                    "description": "High pressure extraction producing concentrated coffee"
                },

                "coffeeName": "Ethiopian Yirgacheffe",
                "roastLevel": 1,
                "targetRatio": "1:2",

                "doseGrams": 18,
                "targetWaterGrams": 36,
                "actualWaterGrams": 34,

                "grindSize": 15,
                "brewTimeSeconds": 22.4,
                "waterTemp": 92.5,

                "resultRating": 2,
                "notes": "Sour and thin body, finishes too quickly",

                "createdOn": "2026-05-02T10:15:00Z"
            },
            {
                "grinder": {
                    "grinderName": "Baratza Encore",
                    "minSettingFine": 1,
                    "maxSettingCoarse": 40
                },

                "brewMethod": {
                    "methodName": "espresso",
                    "defaultRatio": "1:2",
                    "description": "High pressure extraction producing concentrated coffee"
                },

                "coffeeName": "Colombian Huila",
                "roastLevel": 2,
                "targetRatio": "1:2",

                "doseGrams": 18,
                "targetWaterGrams": 36,
                "actualWaterGrams": 37,

                "grindSize": 14,
                "brewTimeSeconds": 26.1,
                "waterTemp": 93.0,

                "resultRating": 3,
                "notes": "Better balance, slight acidity remains but more body",

                "createdOn": "2026-05-02T10:25:00Z"
            },
            {
                "grinder": {
                    "grinderName": "Baratza Encore",
                    "minSettingFine": 1,
                    "maxSettingCoarse": 40
                },

                "brewMethod": {
                    "methodName": "espresso",
                    "defaultRatio": "1:2",
                    "description": "High pressure extraction producing concentrated coffee"
                },

                "coffeeName": "Guatemalan Antigua",
                "roastLevel": 3,
                "targetRatio": "1:2",

                "doseGrams": 18,
                "targetWaterGrams": 36,
                "actualWaterGrams": 35,

                "grindSize": 13,
                "brewTimeSeconds": 28.0,
                "waterTemp": 92.8,

                "resultRating": 4,
                "notes": "Well balanced shot, mild chocolate notes, good sweetness",

                "createdOn": "2026-05-02T10:35:00Z"
            }
        ],

        "pastConversations": 
        {
            "conversationSummary": 
            {
                "title": "Espresso troubleshooting",
                "summary": "User has completed six espresso brewing attempts while trying to fix consistently sour and weak shots. Initial brews used a Baratza Encore grinder set around medium-coarse (18–22), resulting in under-extracted espresso with short brew times (18–22 seconds) and low intensity ratings (1–2/5). User progressively reduced grind size and increased brew time across attempts.Later trials showed improvement when grind was adjusted to medium-fine (12–16 range), with brew times increasing to ~25–28 seconds and extraction yield becoming closer to target ratios (~1:2). Flavor improved slightly but still described as “thin” and occasionally “sour,” suggesting under-extraction persists. Dose has remained stable at ~18g throughout, while water temperature has stayed between 91–93°C. No major changes in coffee type (mostly light roast Ethiopian beans). User notes indicate frustration with inconsistent puck resistance and occasional channeling. Current hypothesis: grind is still slightly too coarse for the current beans and grinder calibration, or distribution/tamping inconsistency may be contributing to uneven extraction."
            },

            "recentMessages": 
            [
                {
                    "role": "user",
                    "content": "My espresso shots are coming out sour and finishing too quickly"
                },
                {
                    "role": "model",
                    "content": "That’s a classic under-extraction issue. Try grinding finer and aim for a longer extraction time around 25–30 seconds."
                },
                {
                    "role": "user",
                    "content": "I made it finer but it still tastes sour and a bit thin"
                },
                {
                    "role": "model",
                    "content": "You’re moving in the right direction. Check puck prep and tamp consistency, uneven flow can still cause under-extraction."
                },
                {
                    "role": "user",
                    "content": "I think my shots are more consistent now but the flavor is still weak"
                },
                {
                    "role": "model",
                    "content": "If consistency improved, you may need to adjust dose or reduce yield slightly to increase concentration."
                },
                {
                    "role": "user",
                    "content": "I increased the dose from 18g to 19g but didn’t notice much change"
                },
                {
                    "role": "model",
                    "content": "A 1g increase is subtle. You may also need to adjust grind finer or extend brew time to see a noticeable difference."
                },
                {
                    "role": "user",
                    "content": "Now the shots are slower but sometimes taste slightly bitter"
                },
                {
                    "role": "model",
                    "content": "You’re approaching over-extraction territory. Dial back slightly coarser or reduce brew time by a few seconds."
                },
                {
                    "role": "user",
                    "content": "Overall it’s better but still inconsistent between shots"
                },
                {
                    "role": "model",
                    "content": "Inconsistency usually points to distribution or tamping issues. Focus on leveling the puck and applying even pressure."
                }
            ]
        }
    },

  "options": {
    "includeExplanation": true,
    "maxRecommendations": 3
  }
}
```