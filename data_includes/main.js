// Find a tutorial and the list of availalbe elements at:
// https://penncontroller.github.io/
PennController.ResetPrefix(null) // Shorten command names (keep this line here)

//Initiate Recorder
InitiateRecorder("https://dummy.url/").label("consent")

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random https://farm.pcibex.net/r/Dfqkjy/experiment.html?test=trueorder, then send the results and finally show the trial labeled 'end'

Sequence( "consent", randomize("experiment"), SendResults() , "end" )

// Edit consent.html file to write the consent
newTrial ( "consent" ,
    newHtml("consent", "consent.html")
        .css("text-align", "center")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.</p>")
        .css("text-align", "center")
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
        .center()
        .print()
    ,
    newMediaRecorder("consent")
    .log()
    .record()
    ,
    newImage("scene", row.scene)
        .center()
        .size(500,500)
        .print()
    ,
    newTimer("tothenext3", 6000)
        .callback( getMediaRecorder("consent").stop() )
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
    .center()
    .print()
    .wait()
  )
  .log( "visualcue" , row.cue )
  .log( "scene", row.scene)
)

// The end of the experiment
newTrial("end",
    newText("Thank you for your participation!")
