PennController.ResetPrefix(null) // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// Start with welcome screen, then present test trials in a random order,
// and show the final screen after sending the results
Sequence( "welcome" , "practice" , randomize("test") , "send" , "final" )

Header( /* void */ )
    // This .log command will apply to all trials
    .log( "ID" , GetURLParameter("id") ) // Append the "ID" URL parameter to each result line

// Welcome screen and logging user's ID
newTrial( "welcome" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("Welcome!")
    ,
    newText("In this experiment you are asked to decide whether the letter strings (appearing at the center of the screen) form real English words.")
    ,
    newText("To do this, press F if what you see is a word, or J if it is not a word.")
    ,
    newText("You should do this as quickly and accurately as possible.")
    ,
    newText("When you are ready, press SPACE to do a practice run.")
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)

newTrial("practice" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("practice").color("blue").print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText.center().print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer.start().wait()
    ,
    // Mask, shown on screen for 500ms
    newText("mask","######"),
    newTimer("maskTimer", 500),                       
    getText("mask").remove()
    ,
    // Prime, shown on screen for 42ms
    newText("prime","flower"),
    newTimer("primeTimer", 42),
    getText("prime").remove()
    ,
    // Target, shown on screen until F or J is pressed
    newText("target","FLOWER")
    ,
    // Use a tooltip to give instructions
    newTooltip("guide", "Now press F if this is an English word, J otherwise")
        .position("bottom center")  // Display it below the element it attaches to
        .key("", "no click")        // Prevent from closing the tooltip (no key, no click)
        .print(getText("target"))   // Attach to the "target" Text element
    ,
    newKey("answerTarget", "FJ")
        .wait()                 // Only proceed after a keypress on F or J
        .test.pressed("F")      // Set the "guide" Tooltip element's feedback text accordingly
        .success( getTooltip("guide").text("<p>Yes, FLOWER <em>is</em> an English word</p>") )
        .failure( getTooltip("guide").text("<p>You should press F: FLOWER <em>is</em> an English word</p>") )
    ,
    getTooltip("guide")
        .label("Press SPACE to start")  // Add a label to the bottom-right corner
        .key(" ")                       // Pressing Space will close the tooltip
        .wait()                         // Proceed only when the tooltip is closed
    ,
    getText("target").remove()          // End of trial, remove "target"
)

// Executing experiment from list.csv table, where participants are divided into two groups (A vs B)
Template( "list.csv" , 
    row => newTrial( "test" ,   
        // Display all Text elements centered on the page, and log their display time code
        defaultText.center().print("center at 50vw","middle at 50vh").log()
        ,
        // Automatically start and wait for Timer elements when created, and log those events
        defaultTimer.log().start().wait()
        ,
        // Mask, shown on screen for 500ms
        newText("mask","######"),
        newTimer("maskTimer", 500),                       
        getText("mask").remove()
        ,
        // Prime, shown on screen for 42ms
        newText("prime",row.prime),
        newTimer("primeTimer", 42),
        getText("prime").remove()
        ,
        // Target, shown on screen until F or J is pressed
        newText("target",row.target)
        ,
        newKey("answerTarget", "FJ").log().wait()   // Proceed upon press on F or J (log it)
        ,
        getText("target").remove()
        // End of trial, move to next one
    )
    .log( "Group"     , row.group)      // Append group (A vs B) to each result line
    .log( "Condition" , row.condition)  // Append condition (tr. v op. v fi.) to each result line
    .log( "Expected"  , row.expected )  // Append expectped (f vs j) to each result line
    .log( "PrimeType", row.primetype ) // Append prime type (rel. vs unr.) to each result line
)

// Send the results
SendResults("send")

// A simple final screen
newTrial ( "final" ,
    newText("The experiment is over. Thank you for participating!")
        .print()
    ,
    newText("You can now close this page.")
        .print()
    ,
    // Stay on this page forever
    newButton().wait()
)