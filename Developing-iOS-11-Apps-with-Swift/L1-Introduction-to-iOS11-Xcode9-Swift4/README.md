# Introduction to iOS 11, Xcode 9 and Swift 4

[[toc]]

## Welcome to Developing iOS 11 Apps with Swift

Check out Apple's iOS Dev Center and learn more about Swift. Before you begin, you must know object-oriented programming and have prior programming experience. If you are new to object-oriented programming or are looking for a refresher course to brush up on your skills, [Programming Abstractions](https://itunes.apple.com/us/course/programming-abstractions/id495054099) and [Programming Paradigms](https://itunes.apple.com/us/course/programming-paradigms/id495054064) will help.

### ✅ Visit Apple's iOS Dev Center.

[Apple Developer](https://developer.apple.com/devcenter/ios)

### ✅ Learn more about the Swift programming language.

[Swift](https://developer.apple.com/swift)

## Introduction to iOS 11, Xcode 9 and Swift 4
Paul Hegarty provides an overview of the lecture series and introduces the different components in iOS. He concludes with a demo of Concentration Game.

Topics Include: iOS 11 Overview, Core OS, Core Services, Media, Cocoa Touch, Platform Components, Tools, Language(s), Frameworks, Design Strategy 

Note: English subtitles are available within the video: enable English CC subtitles.

### ✅ Watch the first lecture video.

[Lecture 1: Introduction to iOS 11, Xcode 9 and Swift 4](https://youtu.be/71pyOB4TPRE?list=PLPA-ayBrweUzGFmkT_W65z64MoGnKRZMq)

<video width="100%" controls preload>
    <source src="https://applehosted.podcasts.apple.com/stanford/media/1_Introduction_to_iOS_11_Xcode_9_and_Swift_4_311-6554896743492737986-01_9_25_17_1080p_CS193p_1080p_3mb_cc.m4v" />
</video>

### ✅ Review Lecture 1 Slides.

[Lecture 1 Slides](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L1-Introduction-to-iOS11-Xcode9-Swift4/Lecture-1-Slides.pdf)

#### What is this class all about?
- How to build cool apps
  - Easy to build even very complex applications.
  - Result lives in your pocket or backpack!
  - Very easy to distribute your application through the AppStore.
  - Vibrant development community.

- Real-life Object-Oriented Programming
  - The heart of Cocoa Touch is 100% object-oriented.
  - Application of MVC design model.
  - Many computer science concepts applied in a commercial development platform:  Databases, Graphics, Multimedia, Multithreading, Animation, Networking, and much, much more!
  - Numerous students have gone on to sell products on the AppStore.

#### Prerequisites
- Prior Coursework
  - Object-Oriented Programming experience mandatory.
  - CS106A&B (or X) <u>required</u> & CS107 or CS108 or CS110 also (at a minimum) <u>required</u>. (or equivalent for non-Stanford undergrads)

#### What’s in iOS?
> iOS is Unix.

| Layer         | Component                                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Core OS       | OSX Kernel, Mach 3.0, BSD, Sockets, Security, Power Management, Keychain Access, Certificates, File System, Bonjour            |
| Core Services | Collections, Address Book, Networking, File Access, SQLite, Core Location, NetServices, Threading, Preferences, URL Utilities  |
| Media         | Core Audio, OpenAL, Audio Mixing, Audio Recording, Video Playback,JPEG, PNG, TIFF, PDF, Quartz (2D), Core Animation, OpenGL ES |
| Cocoa Touch   | Multi-Touch, Core Motion, View Hierarchy, Localization, Controls, Alerts, Web View, Map Kit, Image Picker, Camera              |

#### Platform Components
- Tools
  - Xcode 9
  - Instruments

- Language(s)
  - Swift
  - Objective-C

- Framworks
  > Framworks are just collections of objects.
  - UIKit
  - Foundation

- Design Strategy
  - MVC (Have to use)

#### Demo
- Concentration Game
  
  All this stuff can be very abstract until you see it in action.

  We’ll start getting comfortable with Swift 4 and Xcode 9 by building something right away. Two part demo starting today, finishing on Wednesday.

- Today’s topics in the demo ...

##### Creating a Project in Xcode 9, including building a UI and running in the iOS Simulator

::: tip
Use <kbd>Shift-Command-L</kbd> to open `Object Library` in Xcode 10.
:::

##### Subclassing in Swift, including how to specify instance variables and methods

`UIViewController` knows everything about controlling a UI.

Put all our instance variables and methods inside those curly braces.

##### Connecting UI elements to invoke *methods* in our Swift code (actions) [29:54](https://youtu.be/71pyOB4TPRE?list=PLPA-ayBrweUzGFmkT_W65z64MoGnKRZMq&t=1794)

Two things about Swift that are different from other languages:
1. Every argument has a name that you actually include when you call the method.
   - Each parameter would have a name in front of it.
2. Every argument has two names.
   - External name (caller use)
   - Internal name (inside)

Pick good names: [API Design Guidelines - Naming](https://swift.org/documentation/api-design-guidelines/#naming)

::: tip
The No.1 requirement: **Read like English**
:::

##### print (outputting to the console using `\()` notation)

``` swift
print("filpCard(withEmoji: \(emoji))")
```

##### Connecting *properties* (instance variables) from our Swift code to the UI (outlets)

::: warning
All properties have to be initialized.
  - Initializer
  - `= 0`
``` swift
var flipCount: INT = 0
```
:::

::: tip
Swift is an extremely strongly typed language, and has strong type inference.
``` swift
var flipCount = 0
```
:::

##### Accessing iOS documentation from our code

Hold <kbd>Option</kbd> and click the code.

##### Automatically doing something every time a property’s value changes

Property observer: to keep the UI with in sync with the instance variables of our class
``` swift {2,3,4}
var flipCount = 0 {
    didSet {
        flipCountLabel.text = "Flips: \(flipCount)"
    }
}
```

##### Array

<kbd>Control</kbd> & drag & choose `Outlet Collection`
``` swift
@IBOutlet var cardButtons: [UIButton]!
```
##### Constant
``` swift
let cardNumber = cardButtons.index(of: sender)
```
> let card number equal card buttons' index of the sender

::: tip
`let`: Constant
`var`: Variable
:::

##### Optionals

`Optional` `?` is a type that has two and only two states **set** and **not set**.

For each case of an `Enumeration` you can have *associated data*.

If an optional is not set: `nil`

To get the associated value:
- Use `!`

``` swift
let cardNumber = cardButtons.index(of: sender)!
```

Assume this optional is set and grab the associated value.

::: danger
fatal error: unexpectedly found nil while unwrapping an Optional value
:::

> Don't be afraid of crashes. -- crashing your program can be really good because it makes you find problems

- Use `if`

``` swift
if let cardNumber = cardButtons.index(of: sender) {
    ...
} else {
    print("choosen card was not in cardButtons")
}
```

### ✅ Complete the first reading.

[Reading 1: Intro to Swift](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L1-Introduction-to-iOS11-Xcode9-Swift4/Reading-1-Intro-to-Swift.pdf)