# MVC; iOS, Xcode and Swift Demonstration

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

**MVC**



**Initialization**



**struct vs. class**



**static methods and properties**



**more about Optionals**



**Dictionary<KeyType,ValueType>**



**(time permitting) UIStackView and autolayout**




### ✅ Complete Programming Project 1.
[Programming Project 1: Concentration](https://github.com/chuxubank/Learning-iOS/blob/master/Developing-iOS-11-Apps-with-Swift/L2-MVC-iOS-Xcode-Swift-Demonstration/Programming-Project-1-Concentration.pdf)

## Friday Session 1: Debugging and Xcode Tips and Tricks

Jason Riggs talks about debugging and shares Xcode tips and tricks.

### ✅ Watch the first Friday Session video.
