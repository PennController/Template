// Find a tutorial and the list of availalbe elements at: 
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'

Sequence( "consent", "audiocheck", "intro", "practice", randomize ("experiment"), SendResults(),"end" )

// fetching pictures and audio files

AddHost("https://files.lab.florianschwarz.net/ibexfiles/Pictures/");
AddHost("https://files.lab.florianschwarz.net/ibexfiles/PsEntEx1ReGBAl/Audio/");

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

// Checking if audio is working 

newTrial ( "audiocheck" ,
    defaultText
        .print()
    ,
    newText("<p><b>Please remember that this experiment requires that you have a working audio device. </b> You can test whether your system supports audio by playing the following file:")
        .center()
        .print()
    ,
    newAudio("kids_aquariumthemepark.wav")
        .center()
        .print()
    ,
    newText("<p>You may proceed if you have been able to play this file.")
        .center()
        .print()
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
)

// Instructions

newTrial( "intro" ,
    newHtml("intro", "intro.html")
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

// Practice


newTrial( "practice" ,
     newText("<p>Practice</p>")
        .center()
        .color("blue")
        .print()
    ,
    newCanvas("first", 380, 380).css("border", "solid 3px black"),
    newCanvas("second", 380, 380).css("border", "solid 3px black")
    ,
    defaultImage.size(226,83)
    ,
    newImage("calendar", "calendar3.png").print(  104,  6,getCanvas("first")),
    newImage("calendar2", "calendar3.png").print( 104, 96,getCanvas("first")),
    newImage("calendar3", "calendar3.png").print( 104,186,getCanvas("first")),
    newImage("calendar4", "calendar3.png").print( 104,276,getCanvas("first"))
    ,
    newImage("1calendar", "calendar3.png").print( 104,  6,getCanvas("second")),
    newImage("1calendar2", "calendar3.png").print(104, 96,getCanvas("second")),
    newImage("1calendar3", "calendar3.png").print(104,186,getCanvas("second")),
    newImage("1calendar4", "calendar3.png").print(104,276,getCanvas("second"))
    ,
    defaultImage.size(99,83)
    ,
    newImage("boy", "boy_Mark.png").print(       4,  3,getCanvas("first")),
    newImage("boy2", "boy_Michael.png").print(   4, 93,getCanvas("first")),
    newImage("girl", "girl_Jennifer.png").print( 4,183,getCanvas("first")),
    newImage("girl2", "girl_Kelly.png").print(   4,273,getCanvas("first"))
    ,
    newImage("1boy", "boy_Mark.png").print(      4,  3,getCanvas("second")),
    newImage("1boy2", "boy_Michael.png").print(  4, 93,getCanvas("second")),
    newImage("1girl", "girl_Jennifer.png").print(4,183,getCanvas("second")),
    newImage("1girl2", "girl_Kelly.png").print(  4,273,getCanvas("second"))
    ,
    defaultImage.size(65,65)
    ,
    newImage("park", "themepark.png").print( 112, 13,getCanvas("first")),
    newImage("park3", "themepark.png").print(185, 13,getCanvas("first")),
    newImage("park4", "themepark.png").print(112,193,getCanvas("first")),
    newImage("park5", "themepark.png").print(185,193,getCanvas("first")),
    newImage("aq", "aquarium.png").print(    112,103,getCanvas("first")),
    newImage("aq2", "aquarium.png").print(   185,103,getCanvas("first")),
    newImage("aq3", "aquarium.png").print(   112,283,getCanvas("first")),
    newImage("aq4", "aquarium.png").print(   185,283,getCanvas("first"))
    ,
    defaultCanvas.css('background','black')
    ,
    newCanvas("cv",65,65).print( 112, 13,getCanvas("second")),
    newCanvas("cv1",65,65).print(185, 13,getCanvas("second")),
    newCanvas("cv2",65,65).print(112,193,getCanvas("second")),
    newCanvas("cv3",65,65).print(185,193,getCanvas("second")),
    newCanvas("cv4",65,65).print(112,103,getCanvas("second")),
    newCanvas("cv5",65,65).print(185,103,getCanvas("second")),
    newCanvas("cv6",65,65).print(112,283,getCanvas("second")),
    newCanvas("cv7",65,65).print(185,283,getCanvas("second"))
    ,
    defaultCanvas.css('background','white')
    ,
    newCanvas("white",80,380).print( 254,0,getCanvas("first")),
    newCanvas("1white",80,380).print(254,0,getCanvas("second"))
    ,
    newCanvas("all",775,380)
        .center()
        .add(0,0,getCanvas("first"))
        .add(395,0,getCanvas("second"))
        .add( 220 , 400 , newText("F").bold() )
        .add( 600 , 400 , newText("J").bold() )
        .print()
    ,
    newAudio("audio1", "kids_aquariumthemepark.wav")
        .play()
        .wait()
    ,
    newImage("newaq", "aquarium.png").print(   260, 13,getCanvas("first")),
    newImage("newaq1", "aquarium.png").print(  260,103,getCanvas("first")),
    newImage("newpark", "themepark.png").print(260,193,getCanvas("first")),
    newImage("newaq2", "aquarium.png").print(  260,283,getCanvas("first"))
    ,
    defaultCanvas.css('background','black')
    ,
    newCanvas("1cv",65,65).print( 260, 13,getCanvas("second")),
    newCanvas("1cv1",65,65).print(260,103,getCanvas("second")),
    newCanvas("1cv2",65,65).print(260,193,getCanvas("second")),
    newCanvas("1cv3",65,65).print(260,283,getCanvas("second"))
    ,
    getCanvas("white").remove(),
    getCanvas("1white").remove()
    ,
    newAudio("audio2", "kid_Again_themepark_Jackson.wav")
        .play()
        .wait()
    ,
    newSelector()
        .add(getCanvas("first"),getCanvas("second"))
        .disableClicks()
        .keys("F", "J")
        .log()
        .wait()
        .test.selected(getCanvas("first"))
        .success(newText("<b>Good job! Press any key to continue.</b>").center().print())
        .failure(newText("<b>Good job! Press any key to continue.</b>").center().print())
    ,    
    getCanvas("all").remove()
    ,
    newKey(" ").wait()
)

// Experiment generated from csv file called data.csv
Template ("data.csv",
row => newTrial("experiment", 
    newCanvas("first", 380, 380).css("border", "solid 3px black"),
    newCanvas("second", 380, 380).css("border", "solid 3px black")
    ,
    defaultImage.size(226,83)
    ,
    newImage("calendar", row.calendar).print(  104,  6,getCanvas("first")),
    newImage("calendar2", row.calendar).print( 104, 96,getCanvas("first")),
    newImage("calendar3", row.calendar).print( 104,186,getCanvas("first")),
    newImage("calendar4", row.calendar).print( 104,276,getCanvas("first"))
    ,
    newImage("1calendar", row.calendar).print( 104,  6,getCanvas("second")),
    newImage("1calendar2", row.calendar).print(104, 96,getCanvas("second")),
    newImage("1calendar3", row.calendar).print(104,186,getCanvas("second")),
    newImage("1calendar4", row.calendar).print(104,276,getCanvas("second"))
    ,
    defaultImage.size(99,83)
    ,
    newImage("person1", row.person1).print(       4,  3,getCanvas("first")),
    newImage("person2",row.person2).print(   4, 93,getCanvas("first")),
    newImage("person3", row.person3).print( 4,183,getCanvas("first")),
    newImage("person4", row.person4).print(   4,273,getCanvas("first"))
    ,
    newImage("1person1", row.person1).print(      4,  3,getCanvas("second")),
    newImage("1person2", row.person2).print(  4, 93,getCanvas("second")),
    newImage("1person3", row.person3).print(4,183,getCanvas("second")),
    newImage("1person4", row.person4).print(  4,273,getCanvas("second"))
    ,
    defaultImage.size(65,65)
    ,
    newImage("destination1", row.destination1).print( 112, 13,getCanvas("first")),
    newImage("destination2", row.destination2).print(185, 13,getCanvas("first")),
    newImage("destination4", row.destination3).print(112,193,getCanvas("first")),
    newImage("destination5", row.destination4).print(185,193,getCanvas("first")),
    newImage("destination7", row.destination5).print(    112,103,getCanvas("first")),
    newImage("destination8", row.destination6).print(   185,103,getCanvas("first")),
    newImage("destination10", row.destination7).print(   112,283,getCanvas("first")),
    newImage("destination8", row.destination8).print(   185,283,getCanvas("first"))
    ,
    defaultCanvas.css('background','black')
    ,
    newCanvas("cv",65,65).print( 112, 13,getCanvas("second")),
    newCanvas("cv1",65,65).print(185, 13,getCanvas("second")),
    newCanvas("cv2",65,65).print(112,193,getCanvas("second")),
    newCanvas("cv3",65,65).print(185,193,getCanvas("second")),
    newCanvas("cv4",65,65).print(112,103,getCanvas("second")),
    newCanvas("cv5",65,65).print(185,103,getCanvas("second")),
    newCanvas("cv6",65,65).print(112,283,getCanvas("second")),
    newCanvas("cv7",65,65).print(185,283,getCanvas("second"))
    ,
    defaultCanvas.css('background','white')
    ,
    newCanvas("white",80,380).print( 254,0,getCanvas("first")),
    newCanvas("1white",80,380).print(254,0,getCanvas("second"))
    ,
    newCanvas("all",775,380)
        .center()
        .add(0,0,getCanvas("first"))
        .add(395,0,getCanvas("second"))
        .add( 220 , 400 , newText("F").bold() )
        .add( 600 , 400 , newText("J").bold() )
        .print()
    ,
    newAudio("audio1", row.audio1)
        .play()
        .wait()
    ,
    newImage("destination9", row.destination9).print(   260, 13,getCanvas("first")),
    newImage("destination10", row.destination10).print(  260,103,getCanvas("first")),
    newImage("destination11", row.destination11).print(260,193,getCanvas("first")),
    newImage("destination12", row.destination12).print(  260,283,getCanvas("first"))
    ,
    defaultCanvas.css('background','black')
    ,
    newCanvas("1cv",65,65).print( 260, 13,getCanvas("second")),
    newCanvas("1cv1",65,65).print(260,103,getCanvas("second")),
    newCanvas("1cv2",65,65).print(260,193,getCanvas("second")),
    newCanvas("1cv3",65,65).print(260,283,getCanvas("second"))
    ,
    getCanvas("white").remove(),
    getCanvas("1white").remove()
    ,
    newAudio("audio2", row.audio2)
        .play()
        .wait()
    ,
    newSelector()
        .add(getCanvas("first"),getCanvas("second"))
        .disableClicks()
        .keys("F", "J")
        .log()
        .wait()
    ,    
    getCanvas("all").remove()
)
  .log("Group", row.group)
  .log("Condition", row.condition))

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
