// This is the Stroop Test template

// Remove command prefix
PennController.ResetPrefix(null)

// Turn off debugger
// DebugOff()

// Initialize sequence/order in which methods will be executed, where we send results after the task is done before the end
Sequence("instructions", "instructions2", SendResults(), "end")

// Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "<p> In this task, you will have to read few sentences. </p>")
    ,
    newText("instructions-4", "<p>Are you ready?</p>")
    ,
    newText("<p>Please type in your ID below and then click on the Start button to start the experiment.</p>")
    ,
    newText("emptyrow","<p></p>")
    ,
    newTextInput("ID", "")
        .center()
        .print()
    ,
    newText("emptyrow","<p></p>")
    ,
    newButton("Start")
        .center()
        .print()
        .wait( getTextInput("ID").testNot.text("") )
    ,
    newText("emptyrow","<p></p>")
    ,
    newVar("ID","")
        .global()
        .set( getTextInput("ID") )
)

// Sentences to be read to the user, by pressing the button 'Next Sentence' user passes to the next sentence. Feel free to add your own sentences.

newTrial( "instructions2",
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
  newController("DashedSentence", {s : "You have just begun reading the sentence you have just finished reading."})
    .print()
    .log()
    .wait()
    .remove()
  ,
  newButton("Next sentence please!")
    .print()
    .wait()
)

newTrial( "instructions2",
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



newTrial("end",
    newText("Thank you for your participation!")https://github.com/PennController/Template/security
        .center()
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar",false)
