async function promptConstructor(request) {
    console.log("Constructing Gemini prompt from request:", request);

    // assemble past message context
    let contentsArr = []
    if (request.context.pastConversations != undefined && request.context.pastConversations.recentMessages != undefined) {
        contentsArr = request.context.pastConversations.recentMessages
    }

    // assemble current message context
    contentsArr.push({
        role: "user",
        parts:
            [
                {
                    text:
                        `
                        [USER_PROFILE]
                        ${request.context.user ? JSON.stringify(request.context.user) : ''}
                        ...

                        [BREW_HISTORY]
                        ${request.context.latestBrewLogs ? JSON.stringify(request.context.latestBrewLogs) : ''}
                        ...

                        [CONVERSATION_SUMMARY]
                        ${request.context.pastConversations && request.context.pastConversations.conversationSummary ? JSON.stringify(request.context.pastConversations.conversationSummary) : ''}
                        ...

                        [CURRENT_USER_MESSAGE]
                        ${request.message}
                        ...
                        `
                }
            ]
    })

    // For demonstration, just return a dummy Gemini prompt
    return contentsArr
}

export { promptConstructor };