async function promptConstructor(request) {
    console.log("Constructing Gemini prompt from request:", request);

    // assemble past message context
    let contentsArr = []
    if (request.context.pastConversations != undefined && request.context.pastConversations.recentMessages != undefined) {
        contentsArr = request.context.pastConversations.recentMessages
    }

    let userTextObj = {}
    userTextObj.USER_PROFILE = request.context.user ?? null
    userTextObj.BREW_HISTORY = request.context.latestBrewLogs ?? null
    userTextObj.CONVERSATION_SUMMARY = request.context?.pastConversations?.conversationSummary ?? null;
    userTextObj.CURRENT_USER_MESSAGE = request.message ?? null

    // assemble current message context
    contentsArr.push({
        role: "user",
        parts:
            [
                {
                    text: JSON.stringify(userTextObj)
                }
            ]
    })

    console.log(contentsArr)

    // For demonstration, just return a dummy Gemini prompt
    return contentsArr
}

export { promptConstructor };