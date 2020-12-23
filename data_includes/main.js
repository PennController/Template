PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// First show instructions, then experiment trials, send results and show end screen
Sequence("instructions", "experiment", SendResults(), "end")

// This is run at the beginning of each trial
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global()    
)
.log( "id" , getVar("ID") ) // Add the ID to all trials' results lines

// Instructions
newTrial("instructions",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newText("Welcome!")
    ,
    newText("In this task, you will have to read few sentences.")
    ,
    newText("Are you ready?")
    ,
    newText("Please type in your ID below and then click on the Start button to start the experiment.")
    ,
    newTextInput("inputID", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        .print()
    ,
    newButton("Start")
        .center()
        .print()
        // Only validate a click on Start when inputID has been filled
        .wait( getTextInput("inputID").testNot.text("") )
    ,
    // Store the text from inputID into the Var element
    getVar("ID").set( getTextInput("inputID") )
)

// First experiment trial
newTrial( "experiment",
    newText("instructions", "Click on the button below to start reading. Click spacebar to proceed to the next word.")
        .print()
    ,
    newButton("Start reading")
        .print()
        .wait()
        .remove()
    ,
    getText("instructions")
        .remove()
    ,
    // We use the native-Ibex "DashedSentence" controller
    // Documentation at:   https://github.com/addrummond/ibex/blob/master/docs/manual.md#dashedsentence
    newController("DashedSentence", {s : "You have just begun reading the sentence you have just finished reading."})
        .print()
        .log()      // Make sure to log the participant's progress
        .wait()
        .remove()
    ,
    newButton("Next sentence please!")
        .print()
        .wait()
)

// Second, more concise experiment trial
newTrial( "experiment",
    newController("DashedSentence", {s : "Time flies like an arrow, but fruit flies like a banana."})
        .print()
        .log()
        .wait()
        .remove()
    ,
    newButton("I'm done")
        .print()
        .wait()
)

// Final screen
newTrial("end",
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false)