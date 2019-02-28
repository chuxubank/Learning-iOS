# MVC; iOS, Xcode and Swift Demonstration

[[toc]]

## MVC
Paul Hegarty explains the Model-View-Controller (MVC) concept. He then continues the Concentration demo: demonstrating the application of MVC to the Concentration Game. 

Topics Include: MVC, controller, view, model, target, action, outlet, initialization, struct, class, static methods and properties, UIStackView

Note: English subtitles are available within the video: enable English CC subtitles.

### ✅ Watch the second lecture video.
[Lecture 2: MVC's](https://youtu.be/w7a79cx3UaY?list=PLPA-ayBrweUzGFmkT_W65z64MoGnKRZMq)

### ✅ Review Lecture 2 Slides.
[Lecture 2 Slides](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L2-MVC-iOS-Xcode-Swift-Demonstration/Lecture-2-Slides.pdf)

#### MVC
Object-Oriented Design Pattern

> It's essentially a way we're gonna divide up all the objects in our system into three camps.

- Module

  **What** your application is (but not **how** it is displayed)

- Controller

  **How** your Model is presented to the user (UI logic)

  Controllers interpret/format Model information for the View and vise versa.

- View

  Your Controller’s minions
  
  Generic usually UI elements like UI button the UI view controller even UI label

  ::: warning
  Views do not own the data they display.
  :::

Their relationship:

<mermaid/>

``` mermaid
graph LR
    M((Module))
    V((View))
    C((Controller))
    C --> M
    C -- outlet --> V
    V -. target <- action .-> C
    V -. delegate .-> C
    V -. date source .-> C
    M -.  Notification & KVO .-> C
```

::: tip
View -> Controller is blind & structured.

KVO: Key Value Observing
:::

Most apps have tons of screens which means mutiple MVCs, when one MVC wants to interact with another MVC(s), it always treats those other MVCs as part of its view.

#### Demo
Concentration continued ...

##### MVC

Whenever I build a new class I always want to think about what its public API is.
> I have to get the essentials of what is it that this thing does and how are people going to use it and that makes me think clearly as I go into fine design here.

::: tip
API: Application Programming Interface

A list of all the methods and instance variables in that class.

The public API is all the instance variables and methods that you're gonna allow other classes to call.
:::

##### Initialization

``` swift
// Concentration.swift
var cards = [Card]()

// ViewController.swift
var game = Concentration()  // free init
```

::: tip
Classes get a free init with no arguments as long as all of their VARs are initialized.
:::

``` swift
// Card.swift
init() {
    self.identifier = Card.getUniqueIdentifier()
}

// Concentration.swift
init(numberOfPairsOfCards: Int) {
    for _ in 1...numberOfPairsOfCards {
        let card = Card()
        cards += [card, card]
    }
// TODO: Shuffle the cards
}
```

In Swift you have to completely initialize something before you can use anything in it.

``` swift
// ViewController.swift
lazy var game = Concentration(numberOfPairsOfCards: (cardButtons.count + 1) / 2)
```

::: tip
`lazy`: to avoid this Catch-22 situation, if you make a `var` lazy that means it doesn't actually initialize until someone grabs it.

But can't use `didSet`(property observer).
:::

##### struct vs. class

Differences:
1. struct has no inheritance
2. structs are Value types and classes are Reference types
3. structs: The free initializes they get initializes all of their VARs even if they're already pre-initialized

::: tip
Value type: when you pass it as an argument put it in an array even assign it to another variable it gets **copied** (copy-on-write semantics).

Reference type: lives in the heap you got pointers to it when you pass it around you're not passing the thing around you're just passing pointers to it.
:::

##### static methods and properties

A static function is a function even though it's in the class, you can't send it to a instance.

You can call a static function in a static function(in same class) without using `ClassName.`

##### more about Optionals

Looking something up in the
dictionary returns an optional.

``` swift
if emoji[card.identifier] != nil {
    return emoji[card.identifier]!
} else {
    return "?"
}
// code above is exactly the same with:
return emoji[card.identifier] ?? "?"
```

##### Dictionary

``` swift
var ... = Dictionary<KeyType,ValueType>()

var ... = [KeyType:ValueType]()
```

Dictionary: a data structure where you can look something up and get a value for a certain thing.


##### convert types
you have to create a new thing and use the initializer of that new thing to create one
``` swift
let randomIndex = Int(arc4random_uniform(UInt32(emojiChoices.count - 1)))
```

##### (time permitting) UIStackView and autolayout




### ✅ Complete Programming Project 1.
[Programming Project 1: Concentration](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L2-MVC-iOS-Xcode-Swift-Demonstration/Programming-Project-1-Concentration.pdf)

## Friday Session 1: Debugging and Xcode Tips and Tricks

Jason Riggs talks about debugging and shares Xcode tips and tricks.

### ✅ Watch the first Friday Session video.
