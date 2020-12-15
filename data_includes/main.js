// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'

Sequence( "consent", "intro", "practice1", "practice2", "transition", randomize("experiment"), SendResults() , "end" )

// Showing consent, generated throughout html file that you can edit 
newTrial ( "consent" ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.</p>")
        .center()
        .print()
        .wait()
)

// Showing page with instructions, generated throughout html file that you can edit 
newTrial( "intro" ,
    newImage("animals.png")
        .size(350,200)
        .center()
        .print()
    ,
    newHtml("intro.html")
        .center()
        .print()
    ,
    newText("<p>When you understand these instructions, please click Continue.</p>")
        .center()
        .print()
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
)

//
// See practice.js for the practice items
//


// Transition to the experiment, where no feedback will be given
newTrial( "transition" ,
    newText("<p>Great! Now let's start the actual experiment.</p>")
        .center()
        .print()
    ,
    newButton("<p>Continue.</p>")
        .center()
        .print()
        .wait()
)


// All the images will be 450px*300px, 
// and Selector elements will have a 2px purple border
Header(
    defaultImage.size(450,300)
    ,
    defaultSelector.frame("solid 2px purple")
)

// The core of the experiment, using data from a csv file we made previously
Template("data.csv",
row => newTrial("experiment",
    newImage("contextPicture", row.ContextPicture)
        .center()
        .print()
    ,
    newAudio("contextAudio", row.ContextAudio)
        .play()
        .wait()
    ,
    getImage("contextPicture")
        .remove()
    ,
    newCanvas("container", 900, 340)
        .center()
        .add(  0 , 0 , newImage("visible", row.TargetPicture) )
        .add(450 , 0 , newImage("covered", "coveredpicture.png") )
        .add( "center at 225px" , 320 , newText("F").bold() )
        .add( "center at 675px" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("targetAudio", row.TargetAudio)
        .play()
    ,
    // Adding selector for choosing picture, with the keys F and J logging user's selection
    newSelector()
        .add( getImage("visible") , getImage("covered"))
        .disableClicks()
        .keys("F", "J")
        .log()
        .once()
        .wait()
    ,
    getAudio("targetAudio")
        .wait("first")
  )
  // Logging item, condition and response because the experiment is randomized
  .log( "condition" , row.condition )
  .log( "item"      , row.item )
  .log( "response"  , row.response )
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