// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'

Sequence( "consent", "intro", "practice1", "practice2", "transition", randomize("experiments"), SendResults() , "end" )

// Showing consent, generated throughout html file that you can edit 

newTrial ( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.")
        .center()
        .print()
        .wait()
)

// Showing page with instructions, generated throughout html file that you can edit 

newTrial( "intro" ,
    newImage("animals.png")
        .center()
        .size(450,300)
        .print()
    ,
    newHtml("intro_page", "intro.html")
        .center()
        .print()
    ,
    newText("<p>When you understand these instructions, please click Continue.")
        .center()
        .print()
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
)

// Showing practice page, where user will be notified if he did the task correctly
// This serves to ensure that user understands what is he instructed to do 

newTrial( "practice1" ,
     newImage("image1", "ctl_train_t_1_con.png")
        .center()
        .size(450,300)
    ,
    newCanvas("first", 1400, 200)
        .center()
        .add(450 , 0 , getImage("image1") )
        .print()
    ,
    
// Showing explanations using tooltips

    newTooltip("This picture shows what happened during the morning race. PRESS SPACE.")
    .key(32)
    .position("top left")
    .frame()
    .print(getImage("image1") )
    .css( "transform" , "translate(100%, calc(100% + 320px))" )
    .wait()
    ,
    newTooltip("This animal fell over. He didn't finish the race! PRESS SPACE.")
    .key(32)
    .position("top left")
    .frame()
    .print(getImage("image1") )
    .css( "transform" , "translate(calc(100% + 75px), calc(100% + 140px))" )
    .wait()
    ,
    newTooltip("This is the finish line. The animals past this line finished the race! PRESS SPACE.")
    .key(32)
    .position("top left")
    .frame()
    .print(getImage("image1") )
    .css( "transform" , "translate(calc(100% + 160px), calc(100% + 230px))" )
    .wait()
    ,
    newTooltip("These animals stayed at home. They didn't take part in the race! PRESS SPACE.")
    .key(32)
    .position("top left")
    .frame()
    .print(getImage("image1") )
    .css( "transform" , "translate(calc(100% + 380px), calc(100% + 220px))" )
    .wait()
    ,
    
// Putting audio of the experiment

    newAudio("audio1", "ctl_train_t_1_con.mp3")
    .play()
    ,
    getAudio("audio1")
    .wait()
    ,
    getCanvas("first")
    .remove()
    ,
    newImage("image2", "coveredpicture.png")
        .size(450,300)
    ,
    newCanvas("second", 1400, 200)
        .center()
        .add(250  , 0 , getImage("image1") )
        .add(700 , 0 , getImage("image2") )
        .add( "center at 475" , 320 , newText("F").bold() )
        .add( "center at 925" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("audio2", "ctl_train_t_1_tar.mp3")
    .play()
    ,
    getAudio("audio2")
    .wait()
    ,
    newTooltip("Now simply press F if you think what you heard was describing the situation in the visible picture. Press SPACE to continue. ")
    .key(32)
    .position("bottom center")
    .frame()
    .print(getImage("image1"))
    .wait()
    ,
    newTooltip("or J if you think it was describing the situation hidden behind the black layer. Press SPACE to continue. ")
    .key(32)
    .position("bottom center")
    .frame()
    .print(getImage("image2"))
    .wait()
    ,
    
// Adding selector for choosing picture

    newSelector()
    .add( getImage("image1") , getImage("image2"))
    .disableClicks()
    .keys("F", "J")
    .log()
    .wait()
    .test.selected(getImage("image1"))
    .success(newText("Right! The sentence described the VISIBLE picture; there was no cat in the race. Press any key to continue.").italic().print())
    .failure(newText("Wrong! The sentence described the VISIBLE picture; there was no cat in the race. Press any key to continue.").color("red").print())
    ,
    getCanvas("second").remove()
    ,
    newKey(" ").wait()
)

// Showing practice page, where user will be notified if he did the task correctly
// This serves to ensure that user understands what is he instructed to do, but with less instructions than practice 1 

newTrial( "practice2" ,
     newImage("image1", "ctl_train_f_1_con.png")
        .center()
        .size(450,300)
    ,
    newCanvas("first", 1400, 200)
        .center()
        .add(450 , 0 , getImage("image1") )
        .print()
    ,
    newAudio("audio1", "ctl_train_f_1_con.mp3")
    .play()
    ,
    getAudio("audio1")
    .wait()
    ,
    getCanvas("first")
    .remove()
    ,
    newImage("image2", "coveredpicture.png")
        .size(450,300)
    ,
    newCanvas("second", 1400, 200)
        .center()
        .add(250  , 0 , getImage("image1") )
        .add(700 , 0 , getImage("image2") )
        .add( "center at 475" , 320 , newText("F").bold() )
        .add( "center at 925" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("audio2", "ctl_train_f_1_tar.mp3")
    .play()
    ,
    getAudio("audio2")
    .wait()
    ,
    newSelector()
    .add( getImage("image1") , getImage("image2"))
    .disableClicks()
    .keys("F", "J")
    .log()
    .wait()
    .test.selected(getImage("image1"))
    .success(newText("Wrong! The sentence described the COVERED picture; there was one donkey in the race in the visible picture. Press any key to continue.").color("red").print())
    .failure(newText("Right! The sentence described the COVERED picture; there was one donkey in the race in the visible picture. Press any key to continue.").italic().print())
    ,
    getCanvas("second").remove()
    ,
    newKey(" ").wait()
)

// Transition to the experiment, where no feedback will be given

newTrial( "transition" ,
    newText("<p>Great! Now let's start the actual experiment.")
        .center()
        .print()
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
)


// Starting the experiment, by using data from csv file we made previously, and template we used for practices

Template ("data.csv",
row => newTrial("experiments",
    newImage("image1", row.firstimage)
        .center()
        .size(450,300)
    ,
    newCanvas("first", 1400, 200)
        .center()
        .add(450 , 0 , getImage("image1") )
        .print()
    ,
    newAudio("audio1", row.firstaudio)
    .play()
    ,
    getAudio("audio1")
    .wait()
    ,
    getCanvas("first")
    .remove()
    ,
    newImage("image2", row.secondimage)
        .size(450,300)
    ,
    newCanvas("second", 1400, 200)
        .center()
        .add(250  , 0 , getImage("image1") )
        .add(700 , 0 , getImage("image2") )
        .add( "center at 475" , 320 , newText("F").bold() )
        .add( "center at 925" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("audio2", row.secondaudio)
    .play()
    ,
    getAudio("audio2")
    .wait()
    ,
    
// Adding selector for choosing picture, with the keys F and J logging user's selection

    newSelector()
    .add( getImage("image1") , getImage("image2"))
    .disableClicks()
    .keys("F", "J")
    .log()
    .wait()
  )
  // Logging which images were shown because the experiemnt is randomized
  .log( "FirstImage"     , row.firstimage    )
  .log( "SecondImage"   , row.secondimage  ))
  

// The end of the experiment
newTrial("end",
    newText("Thank you for your participation!")
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