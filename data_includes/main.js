// Find a tutorial and the list of availalbe elements at:
// https://penncontroller.github.io/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'

Sequence( "consent", randomize("experiment"), SendResults() , "end" )

// Edit consent.html file to write the consent
newTrial ( "consent" ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.</p>")
        .center()
        .print()
        .wait()
)


// The core of the experiment, using data from a csv file we made previously
Template("data.csv",
row => newTrial("experiment",
    newImage("fixationscreen", row.fixation)
        .center()
        .print()
    ,
    newTimer("tothenext", 500)
    .start()
    .wait()
    ,
    getImage("fixationscreen")
        .remove()
    ,
    newImage("visualcue", row.cue)
        .center()
        .size(500,500)
        .print()
    ,
    newTimer("tothenext1", 700)
    .start()
    .wait()
    ,
    getImage("visualcue")
        .remove()
    ,
    newImage("blankscreen", row.blank)
        .center()
        .print()
    ,
    newTimer("tothenext2", 500)
    .start()
    .wait()
    ,
    getImage("blankscreen")
        .remove()
    ,
    newText("instruct","Tell us what you see on your screen")
        .print()
    ,
    newMediaRecorder("recorder")
    .log()
    .record()
    ,
    newImage("scene", row.scene)
        .center()
        .size(500,500)
        .print()
    ,
    newTimer("tothenext3", 6000)
        .callback( getMediaRecorder("recorder").stop() )
        .start()
        .wait()
    ,
    getText("instruct")
        .remove()
    ,
    getImage("scene")
        .remove()
    ,
    newButton("continue", "Click here to continue")
    .print()
    .wait()
  )
  .log( "visualcue" , row.cue )
  .log( "scene", row.scene)
)

// The end of the experiment
newTrial("end",
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This is a dummy link, it won't actually validate submissions; use the link provided by your pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Wait on this page forever
    newButton().wait()
)
.setOption("countsForProgressBar",false)
