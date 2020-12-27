PennController.ResetPrefix(null) // Shorten command names ((keep this))

// Resources are hosted as ZIP files on a distant server
PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/OnlyCleftsVW/Pictures.zip")
PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/OnlyCleftsVW/AudioContext.zip")
PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/OnlyCleftsVW/AudioTest.zip")

// PHP script that receives, stores (and will also output) the eye-tracking data
EyeTrackerURL("https://files.lab.florianschwarz.net/ibexfiles/RecordingsFromIbex/EyeTracker.php")
InitiateRecorder("http://myserver/saveRecordings.php")


// Welcome page: we do a first calibration here---meanwhile, the resources are preloading
newTrial(
    newText(`<p>This experiment needs to access your webcam to follow your eye movements.</p>
            <p>We will only collect data on where on this page your eyes are looking during the experiment.</p>`
            )
            .center()
            .print()
    ,
    newButton("I understand. Start the experiment")
        .center()
        .print()
        .wait(newEyeTracker("tracker").test.ready())
        .remove()
    ,
    fullscreen()
    ,
    newVar("useTracker", true).global()
    ,
    // Setting up eyetracker
    getEyeTracker("tracker")
    .calibrate(50,3)
    .test.score(50)
    .failure( getVar("useTracker").set(false))
    ,
    newText(`<p>You will see the same button at the middle of the screen before each trial.</p>
            <p>Click and fix it for 3 seconds to check that the tracker is still well calibrated.</p>
            <p>If it is, the trial will start after 3 seconds. Otherwise, you will go through calibration again.</p>`)
        .center()
        .print()
    ,
    newButton("Go to the first trial").center().print().wait()
)

// Wait if the resources have not finished preloading by the time the tracker is calibrated
CheckPreloaded()

// Only run 24 first trials defined in the table (it's a long experiment....)
Template( GetTable("clefts.csv").filter(r=>Number(r.item)<25) , row =>
    newTrial(
        // If eyetracker works, starting it, otherwise starting media record
        getVar("useTracker").test.is(true)
        .success(newEyeTracker("tracker").calibrate)
        .failure(newMediaRecorder("video").log().record())
        ,
        newTimer(250).start().wait()
        ,
        defaultImage.size("20vh", "20vh"),
        // We print the four images at the four corners
        newCanvas("topFemaleIA", "40vw", "40vh")  // The Canvas are bigger than the images they contain
            .add( "center at 25%" , "middle at 50%" , newImage(row.pic1_top_female) )
            .add( "center at 75%" , "middle at 50%" , newImage("backTF", "back.png") )
            .print( "center at 25vw" , "middle at 25vh" )
        ,
        newCanvas("bottomFemaleIA", "40vw", "40vh")
            .add( "center at 25%" , "middle at 50%" , newImage(row.pic2_bottom_female) )
            .add( "center at 75%" , "middle at 50%" , newImage("backBF", "back.png") )
            .print( "center at 25vw" , "middle at 75vh" )
        ,
        newCanvas("topMaleIA", "40vw", "40vh")
            .add( "center at 25%" , "middle at 50%" , newImage(row.pic3_top_male) )
            .add( "center at 75%" , "middle at 50%" , newImage("backTM", "back.png") )
            .print( "center at 75vw" , "middle at 25vh" )
        ,
        newCanvas("bottomMaleIA", "40vw", "40vh")
            .add( "center at 25%" , "middle at 50%" , newImage(row.pic4_bottom_male) )
            .add( "center at 75%" , "middle at 50%" , newImage("backBM", "back.png") )
            .print( "center at 75vw" , "middle at 75vh" )
        ,
        newAudio(row.context_soundfile).play().wait()
        ,
        getImage("backTF").remove(),getImage("backBF").remove(),getImage("backTM").remove(),getImage("backBM").remove()
        ,
        newImage(row.pic1_suit).print( "center at 75%" , "middle at 50%" , getCanvas("topFemaleIA") ),
        newImage(row.pic2_suit).print( "center at 75%" , "middle at 50%" , getCanvas("bottomFemaleIA") ),
        newImage(row.pic3_suit).print( "center at 75%" , "middle at 50%" , getCanvas("topMaleIA") ),
        newImage(row.pic4_suit).print( "center at 75%" , "middle at 50%" , getCanvas("bottomMaleIA") )
        ,
        getVar("useTracker").test.is(true)
        .success(getEyeTracker("tracker")
            // We track the Canvas: making them bigger allows us to capture look-estimates slightly off the images themselves
            .add( getCanvas("topFemaleIA") , getCanvas("bottomFemaleIA") , getCanvas("topMaleIA") , getCanvas("bottomMaleIA") )
            .start()
            .log()  )
        ,
        newTimer(500).start().wait()
        ,
        newAudio("test", row.test_soundfile).log().play()
        ,
        newSelector("answer")
            .add( getCanvas("topFemaleIA") , getCanvas("bottomFemaleIA") , getCanvas("topMaleIA") , getCanvas("bottomMaleIA") )
            .once()
            .log()
            .wait()
        ,
        // Stop now to prevent collecting unnecessary data
        getVar("useTracker").test.is(true)
        .success(getEyeTracker("tracker").stop())
        .failure(getMediaRecorder("video").stop())
        ,
        getAudio("test").wait("first")
        ,
        newTimer(250).start().wait()
    )
)

SendResults()

newTrial(
    exitFullscreen()
    ,
    newText("The is the end of the experiment, you can now close this window. Thank you!").center().print()
    ,
    newButton("waitforever").wait() // Not printed: wait on this page forever
)
.setOption("countsForProgressBar",false)